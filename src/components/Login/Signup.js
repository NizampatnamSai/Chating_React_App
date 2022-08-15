import React from 'react'
import './Signup.css'

const Signup = () => {

    let handleSubmit=(e)=>{
     e.preventDefault()
     alert('submitted')
    }
  return (
    <div className='Signup'>
      {/* Signup */}
      <div className='Signup_inside'>
        <form onSubmit={handleSubmit}
        >
            <input placeholder='Enter your name' type='text' required/>
            <input placeholder='Enter your email' type='email' required/>
            <input placeholder='Enter your password' type='password' required/>

            <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Signup
