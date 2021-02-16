import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
// import reportWebVitals from './reportWebVitals';
// import { UserLocationProvider } from './contexts/useUserLocationContext';
TimeAgo.addDefaultLocale(en);

ReactDOM.render(
  <React.StrictMode>
    <UserSelectionProvider>
      <App />
    </UserSelectionProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
/*   <UserLocationProvider>
    </UserLocationProvider>*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
