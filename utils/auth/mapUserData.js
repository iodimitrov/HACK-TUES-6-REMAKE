export const mapUserData = (user) => {
    const { uid, email, xa, emailVerified } = user;
    return {
        id: uid,
        email,
        token: xa,
        emailVerified,
    };
};
