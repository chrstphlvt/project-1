import Role from './role';

export default class User {
    constructor(
        public id = 0,
        public username = '',
        public password = '',
        public firstName = '',
        public lastName = '',
        public email = '',
        //public phone = '',
        public role = new Role() // user has a foreign key of role
    ) {}
}