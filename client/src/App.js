import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {DataProvider} from './GlobalState'
import Header from './components/headers/Header'
import MainPages from './components/mainpages/Pages'

import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <ReactNotification/>
          <Header />
          <MainPages />
         
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
