import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// Place other imports below to take precedence over default styles.
import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
