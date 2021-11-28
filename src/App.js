import logo from './logo.svg';
import './App.css';
import Sidebare from './Sidebar';
import {Router,Switch,Route} from "react-router-dom";

function App() {
      return (
        <Router>
            <Switch>
                <Route exact path='/'>
                  <Sidebare />
                  <div className="App">
                    <header className="App-header">
                      <img src={logo} className="App-logo" alt="logo" />
                      <p>
                        Edit <code>src/App.js</code> and save to reload.
                      </p>
                      <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Learn React
                      </a>
                    </header>
                  </div>
                </Route>
          </Switch>
    </Router>
  );
}

export default App;
