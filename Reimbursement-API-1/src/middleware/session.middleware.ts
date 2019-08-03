import session from 'express-session';

const sessionConfiguration = {
    secret: 'chris',
    cookie: { secure: false },
};

export const sessionMiddleware = session(sessionConfiguration);