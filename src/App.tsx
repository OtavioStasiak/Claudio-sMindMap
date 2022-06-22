import { Home } from './pages/Home';
import { Login } from './pages/Login';

import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Admin } from './pages/Admin';
import { MindMap } from './pages/MindMap';
import { Banners } from './pages/Banners';
import { AuthProvider } from './hooks/useAuth';
import { EdgeProvider } from './hooks/useEdge';
import { FinalScreen } from './pages/FinalScreen';
import { AdminMindMap } from './pages/AdminMindMap';
import { AddWords } from './pages/AddWords';
import { FinalMessage } from './pages/FinalMessage';

function App() {

  return (
    <BrowserRouter>
      <EdgeProvider>
        <AuthProvider>
          <Switch>
            <Route path={'/:brand'} exact component={Login} />
            <Route path={'/map/select-words/'} exact component={Home} />
            <Route exact path={'/admin/1hsai5Dsuha10Jc7y428xc/'} component={Admin} />
            <Route exact path={'/admin/adminmindmap/:email'} component={AdminMindMap} />
            <Route exact path={'/admin/addwords/'} component={AddWords} />
            <Route exact path={'/admin/finalmessage'} component={FinalMessage} />
            <Route exact path={'/admin/banners/'} component={Banners} />
            <Route exact path={'/map/finished/'} component={FinalScreen} />
            <Route path={'/map/mind-map/'} component={MindMap} />
          </Switch>
        </AuthProvider>
      </EdgeProvider>
  </BrowserRouter>
  );
}

export default App;
