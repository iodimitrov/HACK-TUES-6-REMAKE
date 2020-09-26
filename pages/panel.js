import dynamic from 'next/dynamic';
import Router from 'next/router';
import cookies from 'next-cookies';

const PanelWithNoSSR = dynamic(() => import('components/Panel'), {
    ssr: false,
});

const Panel = () => <PanelWithNoSSR />;

Panel.getInitialProps = async (ctx) => {
    const allCookies = cookies(ctx);
    if (!allCookies.auth || allCookies.auth.email !== 'admin@hacktues.com') {
        if (typeof window === 'undefined') {
            ctx.res.writeHead(302, { Location: '/' });
            ctx.res.end();
        } else {
            Router.push('/');
        }
    }
    return {};
};

export default Panel;
