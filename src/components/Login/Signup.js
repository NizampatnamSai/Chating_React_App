import React, { useState } from 'react'
import { auth, db, provider } from '../../Firebase'
import './Signup.css'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
const Signup = () => {

  let [userinfo,setUserInfo]=useState({
    name:'',
    mail:'',
    password:''
  })


  let [passwordVisible, setpasswordVisible]=useState(false)
    let handleSubmit=(e)=>{
     e.preventDefault()
     alert('submitted')


     auth.createUserWithEmailAndPassword(userinfo.mail,userinfo.password).then((userAuth)=>{
      userAuth.user.updateProfile({
        displayName:userinfo.name,
        
      })

        db.collection('users').add({
      name:userinfo.name,
      email:userinfo.mail,
      // password:userinfo.password,
      active:true,
      img:''
           
     
       })
    
    })
   .catch(error=>alert(error))
    }


    // db.collection('suppliers').add({
    //   name:suplyinfo.name,
    //   email:suplyinfo.email,
    //   password:suplyinfo.password,
    //   active:true,
    //   survingTable:''
           
   
      
     
    //    })






    let handleInput=(e)=>{
      let nam=e.target.name
      let val=e.target.value

      setUserInfo({
        ...userinfo,
        [nam]:val
      })

    }

    // console.log(userinfo)

    let googleSIgnin=()=>{
  auth.signInWithPopup(provider).then((res)=>{
    // console.log(res)
      // console.log(res.user.photoURL)
    db.collection('users').add({
      name:res.user.displayName,
        email:res.user.email,
      // password:userinfo.password,
      active:true,
      img:res.user.photoURL
           
     
       })
  }).
  catch((error)=>{
      alert(error.message)
  })
    }
  

    let handlePaswordvisible=()=>{
      setpasswordVisible(!passwordVisible)
    }

  return (
    <div className='Signup'>
      {/* Signup */}
      <div className='Signup_inside'>
        <form onSubmit={handleSubmit}
        >
            <input placeholder='Enter your name' type='text'
             name='name'  value={userinfo.name}
             required  onChange={handleInput} />
            <input placeholder='Enter your email' type='email' 
             name='mail'  value={userinfo.mail}
             required onChange={handleInput}/>
             <div className='Signup_passworddiv'>
            <input placeholder='Enter your password' 
            type={passwordVisible?'text':"password"  }
               
             name='password' value={userinfo.password}
             required onChange={handleInput}/>


             

            <small className='Signup_visiblity_icon'
            onClick={
              handlePaswordvisible
            }>

              {passwordVisible? <VisibilityIcon />:
              <VisibilityOffIcon/>
               }
              
            </small>
            </div>

            <button type='submit'>Signup</button>
        </form>

        <p>Already Registred?

        <button className='Signup_Loginbtn'>Login</button>

        </p>
        
        <small>Or</small>

        <div className='signup_withGoogle'>
          <p>Signin with </p>
        {/* <button> */}
          
          <img src='https://pbs.twimg.com/profile_images/1455185376876826625/s1AjSxph_400x400.jpg'
           alt='Goglr.png'  onClick={googleSIgnin}
           />
        {/* </button> */}
        </div>
       
      </div>
    </div>
  )
}

export default Signup
