import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

// Place other imports below to take precedence over default styles.
import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
