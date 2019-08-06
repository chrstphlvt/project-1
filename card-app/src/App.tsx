import React from 'react';
import './App.scss';
import UserUpdateComponent from './components/first/first.component';
import CreateReimbursementComponent from './components/second/createreimbursement.component';
import Third from './components/third/third.component';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NotFound from './components/not-found/not-found.component';
import { NavComponent } from './components/app-nav/app-nav.component';
import { Home } from './components/home/home.component';
import ReimbursementApproveByStatusComponent from './components/clicker/reimbursement-approval.component';
import { TicTacToe } from './components/tic-tac/tic-tac.component';
import  ReimbursementByStatusComponent  from './components/norris/reimbursementbystatus.component';
import { Nested } from './components/nested/nested.component';
import { SignIn } from './components/sign-in/sign-in.component';
import ReimbursementComponent from './components/cards/reimbursement.component';
import FindUserByUserIdComponent from './components/pokemon/by-userid.component';
// import ReimbursementByReimbIdComponent from './components/norris/reimbursementbyreim-userid.component';
import FindAllUsersComponent from './components/pokemon/allusers.component';
import ReimbursementByUserIdComponent from './components/norris/reimbursementbyreim-userid.component';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <NavComponent />
        {/* The switch will only render the first route to match */}
        <Switch>
          <Route path="/first" component={UserUpdateComponent} />
          <Route path="/second" component={CreateReimbursementComponent} />
          <Route path="/third" component={Third} />
          <Route path="/cards" component={ReimbursementComponent} />
          <Route path="/get-reim-by-status" component={ReimbursementByStatusComponent} />
          <Route path="/get-reim-by-user-id" component={ReimbursementByUserIdComponent} />
          {/* <Route path="/clicker" component={Clicker} /> */}
          {/* <Route path="/by-status" component={Clicker} /> */}
          <Route path="/home" component={Home} />
          <Route path="/nested" component={Nested} />
          <Route path="/by-userid" component={FindUserByUserIdComponent} />
          <Route path="/all-user" component={FindAllUsersComponent} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/tic-tac-toe" component={TicTacToe} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
