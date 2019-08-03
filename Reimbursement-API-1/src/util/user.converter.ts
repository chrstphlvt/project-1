import User from '../models/user';
import Role from '../models/role';

export default function convertSqlUser(row: any): User {
    return new User(row.user_id, row.username, '', row.first_name, row.last_name, row.email, new Role(row.role_id, row.role_type));
}