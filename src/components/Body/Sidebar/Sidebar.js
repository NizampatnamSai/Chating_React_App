import { display } from '@mui/system'
import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import UpgradeIcon from '@mui/icons-material/Upgrade';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../../Firebase';
import SidebarGroupnames from './SidebarGroupnames';
import { useDispatch } from 'react-redux';
import { adminInfo } from '../../Redux/ReduxSlice';
// import { Delete } from '@material-ui/icons'
// import { Link, Navigate, useNavigate } from 'react-router-dom'


const Sidebar = () => {

  const [users,loading]=useAuthState(auth)
  let dispatch=useDispatch()


  let [groups,SetGroups]=useState({

  })

  useEffect(()=>{
    db.collection('group').onSnapshot((snap)=>{
      // console.log(snap)
      SetGroups(snap.docs.map((doc)=>({
        id:doc.id,
        data:doc.data()
        
      })))
    })
  },[])

  // console.log(groups)

  let [groupname,SetGroupName]= useState({
    display:false,
    name:''

  })

  let handleCreateGroup=()=>{
    let grpdis=!groupname.display
   
    SetGroupName(
     {
      ...groupname,
      display:grpdis,
      name:''
     }
    )}

          //  Adding the image to the group
   

    let handleSubmitgroupname=()=>{
      db.collection('group').add({
      name:groupname.name,
      admin:users.email,
      active:true,
      img:''
      
     
       })

       SetGroupName(
        {
         ...groupname,
         display:false,
         name:''
        })


    }

    let handleDashboard=()=>{
        dispatch( adminInfo({
          active:true

        }
          
        ))

    }
  
  return (
    <div className='Sidebar'>
      <p className='Sidebar_p'>Sidebar</p>
      
      <div className='Sidebar_inside'>
      {users.email==='chatireactappadmin@gmail.com' &&  
     
     <button onClick={handleDashboard} className='dashboard_btn'
     >Admin Dashboard</button>
       
       }

{users.email==='chatireactappadmin@gmail.com' &&  <p className='Sidebar_createGroup'
       onClick={handleCreateGroup}
       >+ Create group</p> }
      

       {groupname.display && 
       <form>
        <div className='Sidebar_Input_div'>
       <input placeholder='Enter the Group name' required 
       onChange={(e)=>{
        SetGroupName({
          ...groupname,

name:e.target.value
        })
       }}
       />

{
  groupname.name && 
  <UpgradeIcon  className='Sidebar_updateicon' onClick={handleSubmitgroupname}/>

}
       </div>
       
       
       </form>}

       <div className='Sidebar_Groupsinfo'>
        <span>
          Available Groups  {Array.isArray(groups) && groups.length}
        </span>

        <div className='Sidebar_Groupsinfo_names'>
          {  Array.isArray(groups) && groups?.map((item,indx)=>{
            return(
              <div key={item.id}>
              {/* {(indx+1)}  {item.data.name} */}
             
              <SidebarGroupnames id={item.id}
               name={item.data.name}  admin={item.data.admin}
                active={item.data.active}  index={indx}
               />
              </div>
            )
          })}
        </div>
       </div>

      </div>
    </div>
  )
}

export default Sidebar
