import './App.css';
import { BrowserRouter as Router ,Switch,Route,Redirect} from 'react-router-dom';
import Login from './components/Login.Register/Login';
function App() {
  return (
    <div className="App">
      <Router>
          <Switch>
            <Route path='/login' ><Login/></Route>
           
            
          </Switch>
       </Router>
    </div>
  );
}

export default App;
