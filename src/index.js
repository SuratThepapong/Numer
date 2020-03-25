import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Router,Route,Link,browserHistory} from 'react-router'
import { BrowserRouter } from 'react-router-dom'

import * as serviceWorker from './serviceWorker';
import { Form } from 'antd';

const AppWithRouter = () => (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
  
ReactDOM.render(<AppWithRouter />, document.getElementById('root'))


serviceWorker.unregister();
