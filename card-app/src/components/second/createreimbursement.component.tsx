import React from 'react';
import Reimbursement from '../../models/reimbursement';
import { environment } from '../../environment';
import { Input } from 'reactstrap';

interface IState {
    dropdownOpen: boolean
    amount: any
    description: any
    type: any
}

export default class CreateReimbursementComponent extends React.Component<{}, IState> {

    constructor(props: any) {
        super(props);
        const user = localStorage.getItem('reimbursement');
        const currentUser = user && JSON.parse(user)
        this.state = {
            dropdownOpen: false,
            amount: '',
            description: '',
            type: '',
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            ...this.state,
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    getType =(event: React.ChangeEvent<HTMLInputElement>) =>{
        this.setState({
            ...this.state,
            type: event.target.value
        })
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        })
    }

    submit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const user = localStorage.getItem('user');
        const currentUser = user && JSON.parse(user)
        let submitReim = {
            amount: +this.state.amount,
            description: this.state.description,
            type: {
                typeId: +this.state.type
            },
            author: {
                id: currentUser.id
            }
        }
        try {
            const resp = await fetch(environment.context + `/reimbursements`, {
                credentials: 'include',
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(submitReim)
            });

            const reimbursementFromServer = await resp.json();
            console.log(reimbursementFromServer);
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        return (

            <div className="user-table-container">
                <form onSubmit={this.submit}>

                    <div className="form-group">
                        <label>Amount</label>
                        <input type="text" name="amount" className="form-control" onChange={this.handleChange} value={this.state.amount} aria-describedby="emailHelp" placeholder="Enter amount" />

                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <input type="text" name="description" className="form-control" onChange={this.handleChange} value={this.state.description} aria-describedby="emailHelp" placeholder="Enter description" />

                    </div>
                    <div className="form-group">
                        <label>Type</label>
                        <Input type="select" onChange={this.getType}>
                            <option value="1">Lodging</option>
                            <option value="2">Traveling</option>
                            <option value="3">Food</option>
                            <option value="4">Other</option>
                        </Input>

                    </div>


                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}