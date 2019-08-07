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
        this.state = {
            reimbursements: [], //return array of reimbursement
            status: ''
        };
        this.getStatus = this.getStatus.bind(this);
        this.search();
    }

    getStatus = (event: React.ChangeEvent<HTMLInputElement>, reimbursementId:any) => {
        this.setState({
            ...this.state,
            status: event.target.value
        })
        
        setTimeout(()=>{this.submit(reimbursementId)},1000);
    }

    submit = async (reimbursementId:any) => {
        const user = localStorage.getItem('user');
        const currentUser = user && JSON.parse(user)

        let submitReim = {
            reimbursementId: reimbursementId,
            status:{
                statusId: +this.state.status
            },
            resolver: {
                id: currentUser.id 
            },
            dateResolved: new Date()
        }
        console.log(submitReim);
        try {
            const resp = await fetch(environment.context + `/reimbursements`, {
                credentials: 'include',
                method: 'PATCH',
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
        this.search();
    }

    search = async () => {
        const resp = await fetch(environment.context + `/reimbursements/status/1`, {
            credentials: 'include'
        });
        const reimbursementsFromServer = await resp.json();
        this.setState({
            ...this.state,
            reimbursements: reimbursementsFromServer
        });
    }


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
                                    {<td><Input type="select" onChange={e=>this.getStatus(e, reimbursement.reimbursementId)}>
                                        <option hidden={this.state.status} value=''>Select</option>
                                        <option value="2">Approval</option>
                                        <option value="3">Deny</option>
                                    </Input></td>}
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}