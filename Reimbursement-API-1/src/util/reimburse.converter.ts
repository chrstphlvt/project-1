
import Reimbursement from '../models/reimbursement';
import User from '../models/user';
import ReimbursementType from '../models/reimbursementType';
import ReimbursementStatus from '../models/reimbursementStatus';
import Role from '../models/role';


export function reimburseConverter(row) {
    return new Reimbursement(row.reimbursement_id,
        new User(row.author_user_id, row.author_username, '', row.author_first_name, row.author_last_name, row.author_email, new Role(row.author_role_id, row.author_role_type)),
        row.amount, row.date_sumitted, row.date_resolved, row.description,
        new User(row.resolver_user_id, row.resolver_username, '', row.resolver_first_name, row.resolver_last_name, row.resolver_email, new Role(row.resolver_role_id, row.resolver_role_type)),
        new ReimbursementStatus(row.status_id, row.status_name),
        new ReimbursementType(row.type_id, row.type_name)
    );
}