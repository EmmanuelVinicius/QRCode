import React from 'react';
import Inicio from './routes/inicio/inicio';
import Formulario from './routes/bootForm/bootForm'
import Details from './routes/details/details'
import { BrowserRouter, Switch, Route } from 'react-router-dom';



const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Inicio} />
      <Route path="/formulario" component={Formulario} />
      <Route path="/inscricoes/:id" component={Details} />
      {/* <Route path='*' component={PaginaErro} /> */}
    </Switch>
  </ BrowserRouter>
);

export default App;