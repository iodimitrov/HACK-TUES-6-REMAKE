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
    const doc = await admin
        .firestore()
        .doc(`users/${allCookies.auth.id}`)
        .get();
    if (doc.data().votedFor) {
        await admin
            .firestore()
            .doc(`teams/${doc.data().votedFor.id}`)
            .update({ votes: admin.firestore.FieldValue.increment(-1) });
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
