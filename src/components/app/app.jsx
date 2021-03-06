import React from "react";
import {Switch, Route} from "react-router-dom";

import Home from "../pages/home/home";
import Film from "../pages/film/film";
import Mylist from "../pages/mylist/mylist";
import Review from "../pages/review/review";

import Header from "../header/header";
import SignIn from "../sign-in/sign-in";
import Player from "../video-player/video-player";
import Footer from "../footer/footer";
import Heading from "../heading/heading";

import withPrivateRoute from "../../hocs/with-private-route/with-private-route";

const PrivateRoute = withPrivateRoute(Route);

class App extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route
          path="/login"
          render={() => (
            <div className="user-page">
              <Header title={`Sign in`}/>
              <SignIn/>
              <Footer/>
            </div>
          )}
        />
        <Route path="/film/:id" exact component={Film}/>
        <Route path="/film/:id/details" component={Film}/>
        <Route path="/film/:id/reviews" component={Film}/>
        <Route path="/film/:id/review" exact component={Review}/>
        <Route path="/player" component={Player}/>
        <PrivateRoute path="/mylist" exact component={Mylist}/>
        <Route render={() => <Heading title={`Error 404`}/>}/>
      </Switch>
    );
  }
}

export default App;
