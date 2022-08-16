import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { groupInfoact, Selectgroupinfo } from '../../Redux/ReduxSlice'
import './RulesFollow.css'
import { rules } from './Rules'
import { useSelector } from 'react-redux'


const RulesFollow = () => {
  let selectgroupinfo=useSelector(Selectgroupinfo)


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
    Mandatery Rules to follow before joining {selectgroupinfo?.name} group

  <section className='Maincontent_RulesSection'>
    <ul>
    {rules?.map((item,indx)=>{
      return(
       <li key={indx}>{item}</li>
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
    
    <button>Ask the admin to join</button>}


</div>
  </div>
  )
}

export default RulesFollow