import './App.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import UserForm from './userForm';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={UserForm} />
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
