import './App.css';
import { FormCreate } from './components/FormCreate';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter,Switch,Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Store';
import FormList from './components/FormList';
import Navbar from './components/Navbar';

store.subscribe(()=>console.log(store.getState()));


function App() {
  return (
    <>
      
      <Navbar />
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={FormList} />
            <Route path="/FormList" exact component={FormList} />
            <Route path="/FormCreate" exact component={FormCreate} />
          </Switch>
        </BrowserRouter>
      </Provider>
    
    </>
  );
}

export default App;