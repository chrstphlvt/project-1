// login under user router

import express from 'express';
import * as UserDao from '../daos/user.dao';

export const authRouter = express.Router();

/**
 *  login in user
 *  /login
 */
authRouter.post('/login', async (req, res) => {
    const { username, password } = req.body; // deconstructor
    console.log(req.body);
    const user = await UserDao.findByUsernameAndPassword(username, password);
    if (user) {
        req.session.user = user;
        res.json(user);
    } else {
        req.session.destroy(() => { });
        res.status(400);
        res.send('Invalid Credentials');
    }
});


authRouter.get('/check-session', (req, res) => {
    res.json(req.session);
});