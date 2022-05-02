import { Home } from './pages/Home';
import { Login } from './pages/Login';

import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Admin } from './pages/Admin';
import { MindMap } from './pages/MindMap';
import { Users } from './pages/Users';
import { AuthProvider } from './hooks/useAuth';

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Route path={'/'} exact component={Login} />
          <Route path={'/select-words/'} component={Home} />
          <Route exact path={'/admin/'} component={Admin} />
          <Route path={'/mind-map/'} component={MindMap} />
          <Route exact path={'/admin/users/'} component={Users} />
        </Switch>
      </AuthProvider>
  </BrowserRouter>
  );
}

export default App;
