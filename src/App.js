import logo from './logo.svg';
import './App.css';
import { FormCreate } from './components/FormCreate';
import { BrowserRouter,Switch,Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Store';

import FormShow from './components/FormShow';

store.subscribe(()=>console.log(store.getState()));


function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={FormShow} />
            <Route path="/FormShow" exact component={FormShow} />
            <Route path="/FormCreate" exact component={FormCreate} />
          </Switch>
        </BrowserRouter>
      </Provider>
    
    </>
  );
}

export default App;