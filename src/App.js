import './App.css';

import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

import { SnackbarProvider } from 'notistack';

//My components
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Homepage from './components/Homepage';
import ListOfProducts from './components/Products/ListOfProducts';
import Cart from './components/ShoppingCart/Cart';

const Main = () => (
  <div style={{
    minHeight: 'calc(100vh - 306px)',
  }}>
    <Switch>
      <Route exact path="/" component={Homepage}></Route>
      <Route path='/list-of-cactus/large-cactus'>
        <ListOfProducts />
      </Route>
      <Route path="/cart" component={Cart} />
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
