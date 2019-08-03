import { connectionPool } from '../util/connection.util';
import { PoolClient } from 'pg';
import { convertSqlUser } from '../util/user.converter';
import User from '../models/user';


export async function findUsers(): Promise<User[]> { // promise to return array
    let client: PoolClient; // the max 5 from the user connection utility
    try {
        client = await connectionPool.connect(); // beginning the connection
        // removes from the stack until the connection is made then it contnues the funct
        const queryString = `
        SELECT * FROM ers_user JOIN user_role USING (role_id)
        `;
        const result = await client.query(queryString);
        return result.rows.map(convertSqlUser); // run converter on result and return array of converted user on postman
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    return undefined;
}

export async function findById(id: number): Promise<User> { // promise to return single user
    let client: PoolClient; // the max 5 from the user connection utility
    try {
        client = await connectionPool.connect(); // beginning the connection
        // removes from the stack until the connection is made then it contnues the funct
        const queryString = `
        SELECT * FROM ers_user JOIN user_role USING (role_id)
        WHERE user_id = $1
        `;
        const result = await client.query(queryString, [id]);
        const query = result.rows[0]; // single user to be converted on postman
        return convertSqlUser(query); // return results converted
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    return undefined;
}

export async function findByUsernameAndPassword(username: string, password: string): Promise<User> { // promise to return single user
    let client: PoolClient; // the max 5 from the user connection utility
    try {
        client = await connectionPool.connect(); // beginning the connection
        // removes from the stack until the connection is made then it contnues the funct
        const queryString = `
        SELECT * FROM ers_user LEFT JOIN user_role USING (role_id)
        WHERE username = $1 AND pass = $2
        `;
        const result = await client.query(queryString, [username, password]);
        console.log(result)
        const query = result.rows[0]; // single user to be converted on postman
        return convertSqlUser(query); // return results converted
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    return undefined;
}

export async function updateUser(user: User): Promise<User> {
    console.log(user);
    const oldUser = await findById(user.id);
    if (!oldUser) {
        return undefined;
    }
    user = { // holding old user info and replacing with new user info
        ...oldUser,
        ...user // all the new updated info of the user
    };
    console.log(user);
    let client: PoolClient;
    try {
        client = await connectionPool.connect(); // basically .then is everything after this
        const queryString = `
            UPDATE ers_user SET username = $1, pass = $2, first_name = $3, last_name = $4, email = $5, role_id = $6
            WHERE user_id = $7`;
        const params = [user.username, user.password, user.firstName, user.lastName, user.email, user.role.roleId, user.id];
        await client.query(queryString, params);
        return convertSqlUser(user); // returns JS notation instead of SQL notation
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    console.log('found all');
    return undefined;
}
