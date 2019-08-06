import React from 'react';
import { environment } from '../../environment';

interface IState {
    user: any
}


export default class UserUpdateComponent extends React.Component<{}, IState> {
    
    constructor(props: any) {
        super(props);
        const user = localStorage.getItem('user');
        const currentUser = user && JSON.parse(user)
        this.state = {
            user: currentUser //return array of reimbursement
        };
    }

    async componentDidMount() {
        try {
            const resp = await fetch(environment.context +`/users/${this.state.user.userId}`, {
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
        let updateUser = {
            ...this.state.user
        }
        try {
            const resp = await fetch(environment.context +`/users`, {
                credentials: 'include',
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(updateUser)
            });

            const usersFromServer = await resp.json();
            console.log(usersFromServer);
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        const user = this.state.user;
        return (

            <div className="user-table-container"><h4> Update User Information </h4>
                <form onSubmit={this.submit}>

                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" name="username" className="form-control" onChange={this.handleChange} value={this.state.user && this.state.user.username} aria-describedby="emailHelp" placeholder="Enter username" />

                    </div>
                    <div className="form-group">
                        <label>First Name</label>
                        <input type="text" name="firstName" className="form-control" onChange={this.handleChange} value={this.state.user && this.state.user.firstName} aria-describedby="emailHelp" placeholder="Enter firstname" />

                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input type="text" name="lastName" className="form-control" onChange={this.handleChange} value={this.state.user && this.state.user.lastName} aria-describedby="emailHelp" placeholder="Enter lastname" />

                    </div>
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" name="email" className="form-control" onChange={this.handleChange} value={this.state.user && this.state.user.email} aria-describedby="emailHelp" placeholder="Enter email" />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}
