import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { NotFoundLayout } from '../../Layouts/NotFoundLayout/NotFoundLayout';

class SwitchRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: props.routes,
    };
  }

  render() {
    const route = this.state.routes.find((f) => f.default === true);
    return (
      <Switch>
        {this.state.routes.map((value, key) => {
          if (!value.isRoute) return null;
          if (value.authorize) {
            return (
              <PrivateRoute
                path={value.layout + value.path}
                component={value.component}
                key={`privateRoute${key + 1}`}
                addRoute={value.addRoute}
              />
            );
          }

          return (
            <Route
              path={value.layout + value.path}
              component={value.component}
              key={`privateRoute${key + 1}`}
            />
          );
        })}
        <Redirect exact from={route.layout} to={route.layout + route.path} />
        <Route path='*' component={NotFoundLayout} />
      </Switch>
    );
  }
}
export { SwitchRoute };
