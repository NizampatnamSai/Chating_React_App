import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import { auth, db } from './Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Signup from './components/Login/Signup';
import Body from './components/Body/Body';
import Spinner from 'react-spinkit'
import { useEffect, useState } from 'react';
import { useThemeWithoutDefault } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { Selectuserinfo, userInfo } from './components/Redux/ReduxSlice';



function App() {
  const [users,loading]=useAuthState(auth)
  let dispatch=useDispatch()
  // let selectusersinfo=useSelector(Selectuserinfo)

  // console.log(selectusersinfo)

// let [user,setUser]=useState([])
//   useEffect(()=>{
//     if(users){
//     db.collection('users').onSnapshot((snap)=>{
      
//       setUser(snap.docs.map((doc)=>({
//         id:doc.id,
//         data:doc.data()
        
//       })))
//     })}
//   },[])

// useEffect(()=>{

// if(user){
//   // let indx=user.indexOf((users?.email))
//   // console.log(indx)
//   console.log(user)

//   user?.map((item)=>{
//     if(item?.data?.email===users.email){
//       dispatch(
//         userInfo({
//           userid:(item.id),
//           email:(item.data.email)
//         })
//       )
//     }
//   })
// }


// },[])


let [user,setUser]=useState([])

// useEffect(()=>{
//   db.collection('users').onSnapshot((snapshot)=>{
//     setUser(snapshot.docs.map((doc)=>({
        
//         id:doc.id,
//         data:doc.data(),
      
//     })))
//   }) ;

// },[])


  useEffect(()=>{
    // if(users){
    db.collection('users').onSnapshot((snap)=>{
      
      setUser(snap.docs.map((doc)=>({
        id:doc.id,
        data:doc.data()
        
      })))
    })
  // }
  },[])



let requerid;
let reqemail;
// if(Array.isArray(user)){
  if(user){

  user?.map((userinformation)=>{
     if(
      userinformation?.data?.email===users?.email
     )
     { requerid=userinformation.id;
      reqemail=userinformation.data.email;
      
      
      dispatch(
                userInfo({
                      userid:requerid,
                  email:reqemail
                })
              )

     }
  })
}








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
