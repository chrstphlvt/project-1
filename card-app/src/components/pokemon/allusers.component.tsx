import React from 'react'
import { environment } from '../../environment';
import User from '../../models/user';

interface IState {
    users: User[]
}

export default class FindAllUsersComponent extends React.Component<{}, IState> {
    
    constructor(props: any) {
        super(props);
        this.state = {
            users: [] // the curent user
        };
    }

    async componentDidMount() {
        try {
            const resp = await fetch(environment.context +`/users`, {
                credentials: 'include'
            });

            const usersFromServer = await resp.json();
            this.setState({
                ...this.state,
                users: usersFromServer
            });
            console.log(usersFromServer);
        } catch (err) {
            console.log(err)
        }
    }

    // handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     this.setState({
    //         ...this.state,
    //         user: {
    //             ...this.state.user,
    //             [event.target.name]: event.target.value
    //         }
    //     })
    // }




    render() {
        const users = this.state.users;
        return (
            <div id="users-table-container"><h4>Find All Users</h4>
                
                <table className="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope="col">UserId</th>
                            <th scope="col">Username</th>
                            <th scope="col">Password</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Email</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(user =>
                                <tr key={'userId-'+user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.password}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}