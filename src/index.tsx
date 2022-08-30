import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
// import reportWebVitals from './reportWebVitals';
import './styles/index.scss';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Router>
    <App />
  </Router>
);

// reportWebVitals(console.log);
