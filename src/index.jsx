import React from "react";
import {render} from "react-dom";
import {BrowserRouter} from "react-router-dom";

import App from "./components/app/app";

import {createAPI} from "./api";
import reducer from "./reducer";
import {Operations} from "./reducer/data/data";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {compose} from "recompose";

const initApp = () => {
  const api = createAPI((action) => store.dispatch(action));

  const store = createStore(
      reducer,
      compose(
          applyMiddleware(thunk.withExtraArgument(api)),
          window[`__REDUX_DEVTOOLS_EXTENSION__`] &&
          window[`__REDUX_DEVTOOLS_EXTENSION__`]()
      )
  );

  store.dispatch(Operations.loadData());

  render((
    <Provider store={store}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>
  ), document.getElementById(`root`));
};

initApp();
