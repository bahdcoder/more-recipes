import React from 'react';
import ReactDOM from 'react-dom';

import '../css/bootstrap.min.css';
import '../css/styles.css';

import Home from './pages/Home';
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<Home />, document.getElementById('app'))
registerServiceWorker()
