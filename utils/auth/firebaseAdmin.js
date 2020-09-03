import * as admin from 'firebase-admin';
import initAdmin from './initAdmin';

initAdmin();

export const verifyIdToken = (token) => {
    return admin
        .auth()
        .verifyIdToken(token)
        .catch((error) => {
            throw error;
        });
};
