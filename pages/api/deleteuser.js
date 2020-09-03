import initAdmin from 'utils/auth/initAdmin';
import * as admin from 'firebase-admin';
import cookies from 'next-cookies';

initAdmin();

export const config = {
    api: {
        externalResolver: true,
    },
};

export default (req, res) => {
    const allCookies = cookies({ req });
    if (!allCookies.auth) {
        return res.status(400).send({ message: 'No user logged' });
    }
    admin
        .auth()
        .deleteUser(allCookies.auth.id)
        .then((userRecord) => {
            return res.status(200).send({ message: 'OK' });
        })
        .catch((error) => {
            return res.status(500).send(error);
        });
};
