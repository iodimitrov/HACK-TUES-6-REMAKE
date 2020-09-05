export const config = {
    api: {
        externalResolver: true,
    },
};

export default (req, res) => {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const {
        query: { token },
    } = req;
    fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`
    )
        .then((response) => {
            response.json().then((json) => {
                return res.json(json);
            });
        })
        .catch((error) => {
            return res.json(
                error.code || 500,
                error.message || 'Internal Server Error'
            );
        });
};
