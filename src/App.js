import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import HomeScene from './scenes/home';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <HomeScene/>
        </Route>
      </Switch>
    </Router>
    
  );
}

export default App;
