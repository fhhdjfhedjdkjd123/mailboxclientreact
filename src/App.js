import './App.css';
import {Route,Routes} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Authentication from './Authentication/Authentication';
import WelcomeScreen from './components/WelcomeScreen';
import Inbox from './components/inbox';
import InboxMsg from './components/InboxMsg';
import SentBox from './components/SentBox';
import SentBoxMessage from './components/SentBoxMsg';

function App() {
  const isAuth =useSelector((state)=>state.authReducer.isAuthenticate)
  return (
    <div>
      <Routes>
        <Route path="/" element={!isAuth ? <Authentication/> : <WelcomeScreen/>}></Route>
        <Route path="/Inbox" element={!isAuth ? <Authentication/> : <Inbox/>}></Route>
        <Route path="/Inbox/:Identifier" element={!isAuth ? <Authentication/> : <InboxMsg/>}></Route>
        <Route path='/SentBox' element={!isAuth ? <Authentication /> : <SentBox/>}></Route>
        <Route path='/Sentbox/:Identifier' element={!isAuth ? <Authentication /> : <SentBoxMessage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
