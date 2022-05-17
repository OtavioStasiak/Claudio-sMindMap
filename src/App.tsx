import { Home } from './pages/Home';
import { Login } from './pages/Login';

import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Admin } from './pages/Admin';
import { MindMap } from './pages/MindMap';
import { Users } from './pages/Users';
import { AuthProvider } from './hooks/useAuth';
import { EdgeProvider } from './hooks/useEdge';
import { FinalScreen } from './pages/FinalScreen';
import { AdminMindMap } from './pages/AdminMindMap';
import { AddWords } from './pages/AddWords';

function App() {

  return (
    <BrowserRouter>
      <EdgeProvider>
        <AuthProvider>
          <Switch>
            <Route path={'/'} exact component={Login} />
            <Route path={'/select-words/'} component={Home} />
            <Route exact path={'/admin/1hsai5Dsuha10Jc7y428xc/'} component={Admin} />
            <Route exact path={'/admin/adminmindmap/:email'} component={AdminMindMap} />
            <Route exact path={'/admin/addwords/'} component={AddWords} />
            <Route exact path={'/finished/'} component={FinalScreen} />
            <Route path={'/mind-map/'} component={MindMap} />
            <Route exact path={'/admin/users/'} component={Users} />
          </Switch>
        </AuthProvider>
      </EdgeProvider>
  </BrowserRouter>
  );
}

export default App;
