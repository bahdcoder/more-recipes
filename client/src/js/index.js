import React from 'react';
import ReactDOM from 'react-dom';

import '../css/bootstrap.min.css';
import '../css/animate.min.css';
import '../css/styles.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('app'));
registerServiceWorker();
