import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';
import Dashboard from '~/pages/Dashboard';
import Enrollment from '~/pages/Enrollment';
import HelpOrder from '~/pages/HelpOrder';
import Plan from '~/pages/Plan';
import Student from '~/pages/Student';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/student" component={Student} isPrivate />
      <Route path="/plan" component={Plan} isPrivate />
      <Route path="/enrollment" component={Enrollment} isPrivate />
      <Route path="/helpOrder" component={HelpOrder} isPrivate />
    </Switch>
  );
}
