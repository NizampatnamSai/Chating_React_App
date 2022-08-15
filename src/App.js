import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import { auth } from './Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Signup from './components/Login/Signup';


function App() {
  const [users,loading]=useAuthState(auth)

  return (
    <div className="App">
      {users ? (
    <Header/>

      ): <Signup/>

      }
    </div>
  );
}

export default App;
