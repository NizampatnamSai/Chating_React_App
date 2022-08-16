import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { groupInfoact } from '../../Redux/ReduxSlice'

const RulesFollow = () => {

    let [askadminbtn,setAskadminBtn]=useState(false)
    let dispatch=useDispatch()


    let handlecheckbox=(e)=>{
// console.log(e.target.value)
setAskadminBtn(!askadminbtn)
    }

let handleeracegroupinfo=()=>{
  
        dispatch(groupInfoact(
           ''
        
        ))
}
  return (
    <div className='MainContent_Inside_authentication'>
    
   <div className='MainContent_Inside_authentication_rules'>
    Main datery Rules to follow before joining

  

    
    <input type='checkbox'  onChange={handlecheckbox}
    />  I Acknowledge & Accepted
      

      <button onClick={handleeracegroupinfo}>I Quit</button>
    </div>

<div>

    {askadminbtn && 
    
    <button>Ask the admin to join</button>}


</div>
  </div>
  )
}

export default RulesFollow