import initAdmin from 'utils/auth/initAdmin';
import * as admin from 'firebase-admin';
import cookies from 'next-cookies';

initAdmin();

export const config = {
    api: {
        externalResolver: true,
    },
};

export default async (req, res) => {
    const allCookies = cookies({ req });
    if (!allCookies.auth) {
        return res.status(400).send({ message: 'No user logged' });
    }
    if (!req.query || !req.query.userId) {
        return res.status(400).send({ message: 'Bad Request' });
    }

    const { userId } = req.query;

    try {
        const userRecord = await admin.auth().getUser(userId);
        return res.status(200).send({ email: userRecord.email });
    } catch (e) {
        return res.status(500).send(e);
    }
};
