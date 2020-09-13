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

    if (userId === allCookies.auth.id) {
        try {
            const userDoc = await admin
                .firestore()
                .doc(`users/${userId}`)
                .get();
            const teamDoc = await userDoc.data().team.get();
            const team = { ...teamDoc.data(), id: teamDoc.id };
            await admin
                .firestore()
                .doc(`users/${userId}`)
                .update({ team: null, updatedAt: new Date().toJSON() });
            const users = team.projectUsers.filter(
                (user) => user.id !== userId
            );
            await admin
                .firestore()
                .doc(`teams/${team.id}`)
                .update({
                    projectUsers: users,
                    verified: users.length > 2,
                    updatedAt: new Date().toJSON(),
                });
            return res.status(200).send({ message: 'OK' });
        } catch (e) {
            return res.status(500).send(e);
        }
    } else {
        try {
            const userDoc = await admin
                .firestore()
                .doc(`users/${userId}`)
                .get();
            const leaderDoc = await admin
                .firestore()
                .doc(`users/${allCookies.auth.id}`)
                .get();
            if (leaderDoc.data().isLeader) {
                if (userDoc.data().team.id === leaderDoc.data().team.id) {
                    const teamDoc = await userDoc.data().team.get();
                    const team = { ...teamDoc.data(), id: teamDoc.id };
                    await admin
                        .firestore()
                        .doc(`users/${userId}`)
                        .update({ team: null, updatedAt: new Date().toJSON() });
                    const users = team.projectUsers.filter(
                        (user) => user.id !== userId
                    );
                    await admin
                        .firestore()
                        .doc(`teams/${team.id}`)
                        .update({
                            projectUsers: users,
                            verified: users.length > 2,
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
    }
};
