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
    if (!req.body || !req.body.userId) {
        return res.status(400).send({ message: 'Bad Request' });
    }

    const { userId } = req.body;

    try {
        const userDoc = await admin.firestore().doc(`users/${userId}`).get();
        const leaderDoc = await admin
            .firestore()
            .doc(`users/${allCookies.auth.id}`)
            .get();
        if (leaderDoc.data().isLeader) {
            if (userDoc.data().team.id === leaderDoc.data().team.id) {
                await admin
                    .firestore()
                    .doc(`users/${userId}`)
                    .update({ isLeader: true, updatedAt: new Date().toJSON() });
                await admin
                    .firestore()
                    .doc(`users/${allCookies.auth.id}`)
                    .update({
                        isLeader: false,
                        updatedAt: new Date().toJSON(),
                    });
                return res.status(200).send({ message: 'OK' });
            }
        } else {
            return res.status(400).send({
                message: "You don't have permission to do this action",
            });
        }
    } catch (e) {
        return res.status(500).send(e);
    }
};
