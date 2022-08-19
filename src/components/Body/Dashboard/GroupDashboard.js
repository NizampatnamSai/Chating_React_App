import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { adminInfo } from '../../Redux/ReduxSlice'
import './GroupDashboard.css'

const GroupDashboard = ({id,active,admin,name}) => {
  
  
  let [editinfo,setEditinfo]=useState(false)
  let dispatch=useDispatch()
  
  
  
  
  let handlegroupselect=()=>{
    dispatch( adminInfo({
        active:true,
        groupid:id,
        name:name

      }
        
      ))
  }
  
    return (
    <div className='groupDashboard'>

       <span
       onClick={handlegroupselect}
       >{name}</span> 

{editinfo &&



<div className='groupDashboard_Inside'>
edit
</div>}
       
        
        </div>
  )
}

export default GroupDashboard