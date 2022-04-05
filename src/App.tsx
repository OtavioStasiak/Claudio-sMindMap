import { Home } from './pages/Home';
import { Login } from './pages/Login';

import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Admin } from './pages/Admin';
import { MindMap } from './pages/MindMap';

function App() {

  return (
    <BrowserRouter>

        <Switch>
          <Route path={'/'} exact component={Login} />
          <Route path={'/select-words/'} component={Home} />
          <Route path={'/admin/'} component={Admin} />
          <Route path={'/mind-map/'} component={MindMap} />
        </Switch>
        
   </BrowserRouter>
  );
}

export default App;
