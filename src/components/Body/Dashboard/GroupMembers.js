import React, { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import './GroupDashboard.css'
import UpgradeIcon from '@mui/icons-material/Upgrade';
import { db } from '../../../Firebase';
import { useSelector } from 'react-redux';
import { Selectadmininfo } from '../../Redux/ReduxSlice';

const GroupMembers = ({id,active,block,userid,email,name,groupid}) => {

   let selectadmininfo=useSelector(Selectadmininfo)
   // let groupname=selectadmininfo?.name
    // console.log(id,block,active,email,name,userid)

let [editoption,setEditoption]=useState(false)

let handleedit=()=>{
   alert('you can edit the info now')
   setEditoption(!editoption)
}




// let reqactive=active;
// let reqblock=active;

let [meminfo,setMeminfo]=useState({
   memactive:active,
   memblock:block

})


// let [act,setAct]=useState()


let handleactive=()=>{

   if(editoption){
      let reqactive=!meminfo.memactive;

  
   setMeminfo({
      ...meminfo,
      memactive:reqactive
   })

   }
   else {
      alert('clcik edit button to edit')
   }




}



let handleblock=()=>{
   if(editoption){
   
let reqblock=meminfo.memblock
   setMeminfo({
      ...meminfo,
      memblock:!reqblock
   })
   }

   else {
      alert('clcik edit button to edit')
   }

}



let handleEditUpdate=()=>{

   db.collection('group').doc(groupid).collection('members').doc(id).update({
      active:(meminfo.memactive),
      block:(meminfo.memblock)
   })
   alert('Saved succefully')
   setEditoption(!editoption)


}

// console.log(meminfo)
    return (
    <div className='GroupMembers'>
     
        <div className='GroupMembers_Inside'>
     <table className='GroupMembers_table'>
        <tbody 
      
        className='GroupMembers_tablet1'
        >
            
        {name}

           
            
        </tbody>

        <tbody 
       
        className='GroupMembers_tablet2'
        
        >
         <button
        onClick={handleactive}
       style={{
         backgroundColor:meminfo.memactive? 'green':'red',
         color:'white',
         border:'2px solid white',
         borderRadius:'2px'
       }}
        >{meminfo.memactive ? 'active':'pending'}</button></tbody>
        
        
          <tbody
       
        className='GroupMembers_tablet3'
        
        >
         <button
         onClick={handleblock}
         style={{
            backgroundColor:!meminfo.memblock? 'green':'red',
            color:'white',
            border:'2px solid white',
            borderRadius:'2px'
          }}
         
         >{meminfo.memblock? 'blocked':'Notblocked'}</button>
         
         
         </tbody>
        <tbody
        className='GroupMembers_tablet4'
        
        >
         {editoption ? <UpgradeIcon onClick={handleEditUpdate}/>:
         <EditIcon onClick={handleedit}/>}
        </tbody>
     </table>



      
      
        </div>
    </div>
  )
}

export default GroupMembers