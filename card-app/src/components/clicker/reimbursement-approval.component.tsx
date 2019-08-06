import React from 'react'
import Reimbursement from '../../models/reimbursement';
import { environment } from '../../environment';
import { Button, Input } from 'reactstrap';

interface IState {
    reimbursements: Reimbursement[]
    status: any
}

export default class ReimbursementApproveByStatusComponent extends React.Component<{}, IState> {

    constructor(props: any) {
        super(props);
        const status = localStorage.getItem('status');
        const statusId = status && JSON.parse(status).id;
        this.state = {
            reimbursements: [], //return array of reimbursement
            status: statusId
        };
    }

    getStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            ...this.state,
            status: event.target.value
        })
    }

    search = async (event: any) => {
        event.preventDefault();
        const resp = await fetch(environment.context + `/reimbursements/status/1`, {
            credentials: 'include'
        });
        const reimbursementsFromServer = await resp.json();
        this.setState({
            ...this.state,
            reimbursements: reimbursementsFromServer
        });
    }

    // handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     this.setState({
    //         ...this.state,
    //         status: event.target.value
    //     })
    // }

    render() {
        const reimbursements = this.state.reimbursements;
        return (
            <div id="reimbursement-table-container">Processing Reimbursement By Status Id:

                <table className="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope="col">Reimbursement Id</th>
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
                                <tr key={'reimbursementId-' + reimbursement.reimbursementId}>
                                    <td>{reimbursement.reimbursementId}</td>
                                    <td>{reimbursement.author.username}</td>
                                    <td>{reimbursement.amount}</td>
                                    <td>{new Date(reimbursement.dateSubmitted).toDateString()}</td>
                                    <td>{reimbursement.dateResolved && new Date(reimbursement.dateResolved).toDateString()}</td>
                                    <td>{reimbursement.resolver && reimbursement.resolver.username}</td>
                                    <td>{reimbursement.status.status}</td>
                                    <td>{reimbursement.type.type}</td>
                                    {<Input type="select" onChange={this.getStatus}>
                                        <option value="1">Approval</option>
                                        <option value="2">Deny</option>
                                    </Input>}
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}