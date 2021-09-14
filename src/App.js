import './App.css';

import React from 'react';

import {
  Route,
  Switch,
  useLocation,
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
import PrivateRoute from './components/PrivateRoute';
import { ProvideAuth } from './context/AuthContext';
// import { 
//   initiateSocketConnection,
//   disconnectSocket,
//   subscribeToChat,
// } from './socketio.serivce';

const Main = () => {

  return (
    <div style={{
      paddingTop: 24,
      paddingBottom: 24,
    }}>
      <Switch>
        <Route exact path="/" component={Homepage}></Route>
        <Route path='/products' component={ListOfProducts} />
        <Route path="/cart" component={Cart} />
        <Route path="/sign-up">
          <SignUp />
        </Route>
        <Route path="/sign-in">
          <SignIn />
        </Route>
        <PrivateRoute path="/account">
          <Account />
        </PrivateRoute>
      </Switch>
    </div>)
}

export default function App() {
  const location = useLocation();

  // useEffect(() => {
  //   initiateSocketConnection();

  //   subscribeToChat((err, data) => {
  //     console.log(data);
  //   });

  //   return () => {
  //     disconnectSocket();
  //   }
  // }, []);

  return (
    <SnackbarProvider maxSnack={3}>
      <ProvideAuth>
        {(location.pathname !== "/sign-in" && location.pathname !== "/sign-up") ? (<>
          <Header />
          <div style={{ backgroundColor: Constants.GRAY, }}><Main /></div>
          <Footer /></>
        ) : (
          <Main />
        )}
      </ProvideAuth>
    </SnackbarProvider>
  );
}
