import React, { Component } from 'react'
import Reimbursement from '../../models/reimbursement';
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
        const resp = await fetch('http://localhost:8012/reimbursements/status/1', {
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
                                    <td>{reimbursement.author}</td>
                                    <td>{reimbursement.amount}</td>
                                    <td>{reimbursement.dateSubmitted}</td>
                                    <td>{reimbursement.dateResolved}</td>
                                    <td>{reimbursement.resolver && reimbursement.resolver.username}</td>
                                    <td>{reimbursement.status}</td>
                                    <td>{reimbursement.type}</td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}
