import './App.css';
import {Route,Routes} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Authentication from './Authentication/Authentication';
import WelcomeScreen from './components/WelcomeScreen';
import Inbox from './components/Inbox';
import InboxMsg from './components/InboxMsg';

function App() {
  const isAuth =useSelector((state)=>state.authReducer.isAuthenticate)
  return (
    <div>
      <Routes>
        <Route path="/" element={!isAuth ? <Authentication/> : <WelcomeScreen/>}></Route>
        <Route path="Inbox" element={!isAuth ? <Authentication/> : <Inbox/>}></Route>
        <Route path="Inbox/:Identifier" element={!isAuth ? <Authentication/> : <InboxMsg/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
