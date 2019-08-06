import React, { Component } from 'react'
import Reimbursement from '../../models/reimbursement';
import { environment } from '../../environment';
import { userInfo } from 'os';
//import { ButtonDropdown } from 'reactstrap';

interface IState {
    reimbursements: Reimbursement[]
}


export default class ReimbursementComponent extends Component<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            reimbursements: [] //return array of reimbursement
        };
    }

    async componentDidMount() {
        const user = localStorage.getItem('user');
        const currentUser = user && JSON.parse(user)
        const resp = await fetch(environment.context + '/reimbursements/author/' + currentUser.id, {
            credentials: 'include'
        });
        const reimbursementsFromServer = await resp.json();
        this.setState({
            ...this.state,
            reimbursements: reimbursementsFromServer
        });
        console.log(reimbursementsFromServer);
    }

    render() {
        const reimbursements = this.state.reimbursements;
        return (
            <div id="reimbursement-table-container">
                
                <table className="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Author</th>
                            <th scope="col">amount</th>
                            <th scope="col">Date Submitted</th>
                            <th scope="col">Date resolved</th>
                            <th scope="col">Resolver</th>
                            <th scope="col">Status</th>
                            <th scope="col">Type </th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reimbursements.map(reimbursement =>
                                <tr key={'reimbursementId-'+reimbursement.reimbursementId}>
                                    <td>{reimbursement.reimbursementId}</td>
                                    <td>{reimbursement.author.username}</td>
                                    <td>{reimbursement.amount}</td>
                                    <td>{new Date(reimbursement.dateSubmitted).toDateString()}</td>
                                    <td>{reimbursement.dateResolved&&new Date(reimbursement.dateResolved).toDateString()}</td>
                                    <td>{reimbursement.resolver && reimbursement.resolver.username}</td>
                                    <td>{reimbursement.status.status}</td>
                                    <td>{reimbursement.type.type}</td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}
