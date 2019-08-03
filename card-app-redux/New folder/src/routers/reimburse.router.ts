
import express from 'express';
import * as reimburseDao from '../daos/reimburse.dao';
import { authMiddleware } from '../middleware/auth.middleware';
// import { userInfo } from 'os';

export const reimburseRouter = express.Router();

/**
 * reimbursements/status/:statusId
 * find reimburse by id
 * FIN-MAN ADMIN
 */
reimburseRouter.get('/status/:statusId', [authMiddleware('admin', 'finance-manager'), async (req, res) => {
    const id = req.params.statusId; // gets status id and stores in id
    const result = await reimburseDao.findReimburseByStatusId(id);
    if (req.session.reimbursement && req.session.reimbursement.reimbursementStatus.statusId === id || req.session.user.role.roleId === 1 || req.session.user.role.roleId === 2 ) {
        res.json(result);
    } else {
        res.json('You are not authorized to see info');
    }
    // res.send(`finding reimbursement by id: ${id}`);
}]);

/**
 * reimbursements/author/:userId
 * find reimbursement author id
 * AUTHOR, ADMIN,FIN-MAN
 */
reimburseRouter.get('/author/:userId', [authMiddleware('admin', 'finance-manager'), async (req, res) => {
    const id = req.params.userId; // gets author id and stores in id
    const result = await reimburseDao.findByUserId(id);
    if (req.session.reimbursement && req.session.reimbursement.author === id || req.session.user.role.roleId === 1 || req.session.user.role.roleId === 2 ) {
        res.json(result);
    } else {
        res.json('You are not authorized to see info');
    } // send info to postman in json form
}]);

/**
 * reimbursements
 * submitting reimbursement
 * ANY PERSRON
 */
reimburseRouter.post('', [authMiddleware('admin', 'finance-manger', 'employee'), async (req, res) => {
    const result = await reimburseDao.submitReimburse(req.body);
    res.json(result);
    // res.send(`submitting reimbursement`);
}]);

/**
 * reimbursements
 * Updating reimbursement
 */
reimburseRouter.patch('', [authMiddleware('admin', 'finance-manger'), async (req, res) => {
    const result = await reimburseDao.updateReimburse(req.body);
    res.json(result);
    // res.send(`updating reimbursement`);
}]);

