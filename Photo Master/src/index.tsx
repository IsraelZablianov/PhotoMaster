import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import { Provider } from "react-redux";
import { createStore } from "redux";
import App from "./app/components/app/app";
import photoMasterApp from "./reducers"

const store = createStore(photoMasterApp);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
