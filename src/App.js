import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import { auth } from './Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Signup from './components/Login/Signup';
import Body from './components/Body/Body';
import Spinner from 'react-spinkit'



function App() {
  const [users,loading]=useAuthState(auth)
  // console.log(users);


  if (loading){

    return(
      <div className='Loader'>
        <div className='Loader_inside'>

        <img src='https://www.pngitem.com/pimgs/m/27-278960_ca-letter-logo-sign-hd-png-download.png' alt='img.loader'/>

        <Spinner name="ball-triangle-path" color="green" className='Loader_Spinner'/>
        </div>
      </div>
    )

  }

  return (
    <div className="App">
      {users ? (
        <div className='App_inside'>
    <Header/>

    <div className='App_inside_main'>

      <Body/>

    </div>

    </div>

    

      ): <Signup/>

      }
    </div>
  );
}

export default App;
