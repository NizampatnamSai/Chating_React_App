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

  let [login,SetLogin]=useState(false)

  let [passwordVisible, setpasswordVisible]=useState(false)
    let handleSubmit=(e)=>{
     e.preventDefault()
     alert('submitted')

  if (!login)  {
     auth.createUserWithEmailAndPassword(userinfo.mail,userinfo.password).then((userAuth)=>{
      userAuth.user.updateProfile({
        displayName:userinfo.name,
        
      })

        db.collection('users').add({
      name:userinfo.name,
      email:userinfo.mail,
      active:true,
      img:''
           
     
       })
    
    })
   .catch(error=>alert(error))}

   else {
 
 
      auth.signInWithEmailAndPassword(userinfo.mail,userinfo.password)
      // .then (userAuth=>{
      //   setSigninagain(true)
       
      // })
 .catch(error=>alert(error))




    
   }





    }


    let handleInput=(e)=>{
      let nam=e.target.name
      let val=e.target.value

      setUserInfo({
        ...userinfo,
        [nam]:val
      })

    }

   

    let googleSIgnin=()=>{
  auth.signInWithPopup(provider).then((res)=>{
   
    db.collection('users').add({
      name:res.user.displayName,
        email:res.user.email,
     
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

    let handleLoginpage=()=>{
      SetLogin(!login)
    }

  return (
    <div className='Signup'>
     
      <div className={ !login ?'Signup_inside':'Signup_inside Signup_inside_login'}>
        {
          login ?
          <p>Please Login to precede further</p>:
          <p>Please Signup to precede further</p>

        }
        <form onSubmit={handleSubmit}
        >
           
           
           {
            !login &&
           <input placeholder='Enter your name' type='text'
             name='name'  value={userinfo.name}
             required  onChange={handleInput} />}




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

            <button type='submit'>{
              login ? 'Login':"Signup"
            }
              
              
              </button>
        </form>

        <p>{ login?'Not yet ' :'Already '}
       
        Registred?
          
          


        </p>
        <button className='Signup_Loginbtn'
        onClick={handleLoginpage}
        >
          {
            login? 'Signup':'Login'
          }
          
          </button>

        
        {/* <small>Or</small>

        <div className='signup_withGoogle'>
          <p>Signin with </p>
          
          <img src='https://pbs.twimg.com/profile_images/1455185376876826625/s1AjSxph_400x400.jpg'
           alt='Goglr.png'  onClick={googleSIgnin}
           />
        </div>
        */}
      </div>
    </div>
  )
}

export default Signup
