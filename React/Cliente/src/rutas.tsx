import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DetallesProducto from './components/DetallesProducto/detallesProducto';

<Router>
  <Switch>
    <Route path="/producto/:id" Component={DetallesProducto} />
    {/* Otras rutas */}
  </Switch>
</Router>
