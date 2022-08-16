import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { groupInfoact, Selectgroupinfo, Selectuserinfo, userInfo } from '../../Redux/ReduxSlice'
import './RulesFollow.css'
import { rules } from './Rules'
import { useSelector } from 'react-redux'

import { auth, db } from '../../../Firebase'
// import { useAuthState } from 'react-firebase-hooks/auth'


const RulesFollow = () => {
  let selectgroupinfo=useSelector(Selectgroupinfo)
  let selectusersinfo=useSelector(Selectuserinfo)

  console.log(selectusersinfo)


    let [askadminbtn,setAskadminBtn]=useState(false)
    let dispatch=useDispatch()


    let handlecheckbox=(e)=>{
setAskadminBtn(!askadminbtn)
    }

let handleeracegroupinfo=()=>{
  
        dispatch(groupInfoact(
           ''
        
        ))
}






let handleAskAdmin=()=>{
  let grpid=selectgroupinfo?.id;
  console.log(grpid)
  let useremail=selectusersinfo?.email;
  console.log(useremail)

  let usersid=selectusersinfo?.userid
  console.log(usersid)

  db.collection(`group`).doc(grpid).collection('members').add({
    email:useremail,
    userid:usersid,
    active:false
  })

}

// Have to add toast
// if alredy asked the admin then show still waiting or form for mail to admin
  return (
    <div className='MainContent_Inside_authentication'>
    
   <div className='MainContent_Inside_authentication_rules'>
    Mandatery Rules to follow before joining {selectgroupinfo?.name} group

  <section className='Maincontent_RulesSection'>
    <ul >
    {rules?.map((item,indx)=>{
      return(
       <li key={indx} >{item}</li>
      )
    })}
    </ul>
  </section>

    
    <input type='checkbox'  onChange={handlecheckbox}
    />  I Acknowledge & Accepted
      

      <button onClick={handleeracegroupinfo}>I Quit</button>
    </div>

<div>

    {askadminbtn && 
    
    <button  onClick={handleAskAdmin}
    >Ask the admin to join</button>}


</div>
  </div>
  )
}

export default RulesFollow