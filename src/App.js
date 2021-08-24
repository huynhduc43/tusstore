import './App.css';

import React from 'react';

import {
  Route,
  Switch,
} from "react-router-dom";

import { SnackbarProvider } from 'notistack';

//My components
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Homepage from './components/Homepage/Homepage';
import ListOfProducts from './components/Products/ListOfProducts';
import Cart from './components/ShoppingCart/Cart';
import Account from './components/Account/Account';
import Constants from './components/Constants';

const Main = () => (
  <div style={{
    minHeight: 'calc(100vh - 306px)',
    backgroundColor: Constants.GRAY,
    paddingTop: 48,
    paddingBottom: 48,
  }}>
    <Switch>
      <Route exact path="/" component={Homepage}></Route>
      <Route path='/list-of-cactus/large-cactus'>
        <ListOfProducts />
      </Route>
      <Route path="/cart" component={Cart} />
      <Route path='/account' component={Account}/>
      <Route path="/sign-up">
        <SignUp />
      </Route>
      <Route path="/sign-in">
        <SignIn />
      </Route>
    </Switch>
  </div>
)

class App extends React.Component {
  render() {
    return (
        <SnackbarProvider maxSnack={3}>
            <Header />
            <Main />
            <Footer/>
        </SnackbarProvider>
    );
  }
}

export default App;
