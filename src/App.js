import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import NavBar from './components/NavBar';
import { CurrentUserProvider } from './context/CurrentUser';
import CurrentUserChecker from './components/CurrentUserChecker';
function App() {
  return (
    <CurrentUserProvider>
      <CurrentUserChecker>
        <Router>
          <NavBar />
          <Routes />
        </Router>
      </CurrentUserChecker>
    </CurrentUserProvider>
  );
}

export default App;
