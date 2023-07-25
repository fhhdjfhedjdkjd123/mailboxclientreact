import './App.css';
import {Route,Routes} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Authentication from './Authentication/Authentication';
import WelcomeScreen from './components/WelcomeScreen';

function App() {
  const isAuth =useSelector((state)=>state.authReducer.isAuthenticate)
  return (
    <div>
      <Routes>
        <Route path="/" element={!isAuth ? <Authentication/> : <WelcomeScreen/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
