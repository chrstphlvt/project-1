import React from 'react'
import { environment } from '../../environment';
import User from '../../models/user copy';
import Role from '../../models/role';

interface IState {
    user: User
}


export default class FindUserByUserIdComponent extends React.Component<{}, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            user: new User(0, '', '', '', '', '', new Role(0, ''))
        }
    }

    async componentDidMount() {
        try {
            const resp = await fetch(environment.context + `/users/${this.state.user && this.state.user.id}`, {
                credentials: 'include'
            });

            const usersFromServer = await resp.json();
            this.setState({
                ...this.state,
                user: usersFromServer
            });
            console.log(usersFromServer);
        } catch (err) {
            console.log(err)
        }
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                [event.target.name]: event.target.value
            }
        })
    }

    submit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.setState ( {
            user: new User(0, '', '', '', '', '', new Role(0, ''))
        })
        try {
            const resp = await fetch(environment.context + `/users/${this.state.user && this.state.user.id}`, {
                credentials: 'include'
            });

            const usersFromServer = await resp.json();
            this.setState({
                user: usersFromServer
            })
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        const user = this.state.user;
        return (
            // form with search button
            <form onSubmit={this.submit}>
                <div className="form-group"><h4>Find By User Id</h4>
                    {/* <label >User Id</label> */}
                    <input type="userid" name="id" className="form-control" value={this.state.user.id} onChange={this.handleChange} placeholder="Enter User ID#" />
                    <button type="submit" className="btn btn-primary">Search</button>
                </div>
                <table className="table">
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

                            <tr>
                                <td>{user.username&&user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.password}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </form>


        )

    }
}