// user router

import express from 'express';
import * as userDao from '../daos/user.dao';
import { authMiddleware } from '../middleware/auth.middleware';


// the user router represents a subset of the application
// for all enpoints starting with /users
export const usersRouter = express.Router();

/**
 * /users
 * find  user
 */
usersRouter.get('', [authMiddleware('admin', 'finance-manager'),
    async (req, res) => {
        const users = await userDao.findUsers(); // returning promise
        res.json(users);
        // res.send('Found all user');  // respond to server method
    }]);

/**
 * /users/:id
 * find  user by id
 */
usersRouter.get('/:id', [authMiddleware('admin', 'finance-manager', 'employee'), async (req, res) => {
    const id = req.params.id;  // makes id a variable and getting it from the url
    const user = await userDao.findById(id); // calling the find by id function in userDao
    if (user && req.session.user.id === user.id || req.session.user.role.roleId === 1 || req.session.user.role.roleId === 2) {
        res.json(user); // send info to postman in json form
    } else {
        res.json('You are not authorized to see info');
    }
    // res.send(`Found user by id: ${id}`);  // respond to server method
}]);

/**
 * /users
 * updates user
 * USER, ADMIN
 */
usersRouter.patch('', [authMiddleware('admin', 'finance-manager', 'employee'), async (req, res) => { // Promise call
    const result = req.body;
    const user = await userDao.updateUser(result);  // calling the update User function in userDao
    // checks to see if user, id, roleid(1 or 2) is the user with the role or id
    if (user && req.session.user.id === user.id || req.session.user.role.roleId === 1) {
        res.json(user); // send info to postman in json form
    } else {
        res.json('You are not authorized to see info');
    } // send info to postman in json form
    // res.send('update was done for the user is done');
}]);





