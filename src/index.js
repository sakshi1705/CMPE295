import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'
import App from './components/App';
import { Route, Link, MemoryRouter as Router } from 'react-router-dom';
import Dashboard from "./components/Dashboard";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Router>
      <Route exact path="/" component={App} />
      <Route path="/dashboard" component={Dashboard} />
    </Router>
 
   , document.getElementById('root'));
// const routing = (
//     <Router>
//         <Route exact path="/" component={App} />
//         <Route path="/dashboard" component={Dashboard} />
//     </Router>
//   )

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
