import './App.css';

import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

//My components
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Header from './components/Header/Header';
import Homepage from './components/Homepage';
import ListOfProducts from './components/Products/ListOfProducts';

const Main = () => (
  <>
    <Switch>
      <Route exact path="/" component={Homepage}></Route>
      <Route path='/list-of-cactus/large-cactus'>
        <ListOfProducts />
      </Route>
      <Route path="/sign-up">
        <SignUp />
      </Route>
      <Route path="/sign-in">
        <SignIn />
      </Route>
    </Switch>
  </>
)

class App extends React.Component {
  render() {
    return (
        <>
            <Header />
            <Main />
        </>
    );
  }
}

export default App;
