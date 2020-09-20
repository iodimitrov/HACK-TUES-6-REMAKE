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

    try {
        const leaderDoc = await admin
            .firestore()
            .doc(`users/${allCookies.auth.id}`)
            .get();
        if (leaderDoc.data().isLeader) {
            const teamDoc = await leaderDoc.data().team.get();
            const team = { ...teamDoc.data(), id: teamDoc.id };
            await team.projectUsers.forEach(async (user) => {
                await user.update({
                    isLeader: false,
                    updatedAt: new Date().toJSON(),
                    team: null,
                });
            });
            let votingUsers = await admin
                .firestore()
                .collection('users')
                .where(
                    'votedFor',
                    '==',
                    admin.firestore().doc(`teams/${team.id}`)
                )
                .get();
            votingUsers = votingUsers.docs.map((doc) => doc.id);
            votingUsers.forEach(async (id) => {
                await admin
                    .firestore()
                    .doc(`users/${id}`)
                    .update({ votedFor: null });
            });
            await admin.firestore().doc(`teams/${team.id}`).delete();
            return res.status(200).send({ message: 'OK' });
        } else {
            return res.status(400).send({
                message: "You don't have permission to do this action",
            });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).send(e);
    }
};
