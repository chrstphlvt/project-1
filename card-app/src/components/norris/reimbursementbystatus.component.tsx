import React from 'react'
import Reimbursement from '../../models/reimbursement';
import { environment } from '../../environment';
import { Button } from 'reactstrap';

interface IState {
    reimbursements: Reimbursement[]
    status: any
}

export default class ReimbursementByStatusComponent extends React.Component<{}, IState> {
    constructor(props: any) {
        super(props);
        const status = localStorage.getItem('status');
        const statusId = status && JSON.parse(status).id;
        this.state = {
            reimbursements: [], //return array of reimbursement
            status: statusId
        };
    }

    
    search = async (event:any) => {
        event.preventDefault();
        const resp = await fetch(environment.context + `/reimbursements/status/${this.state.status}`, {
            credentials: 'include'
        });
        const reimbursementsFromServer = await resp.json();
        this.setState({
            ...this.state,
            reimbursements: reimbursementsFromServer
        });
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            ...this.state,
            status: event.target.value
        })
    }

    render() {
        const reimbursements = this.state.reimbursements;
        return (
            <div id="reimbursement-table-container"><h4>Find Reimbursement By Status Id</h4> 

                <input type="number" value={this.state.status} onChange={this.handleChange} />
                <Button onClick={this.search}>Search</Button>

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
