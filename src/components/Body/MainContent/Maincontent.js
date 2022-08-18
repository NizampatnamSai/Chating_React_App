import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDispatch, useSelector } from 'react-redux'
import { auth, db } from '../../../Firebase'
import { groupInfoact, Selectadmininfo, Selectgroupinfo, Selectuserinfo } from '../../Redux/ReduxSlice'
import './Maincontent.css'
import { deepOrange, deepPurple } from '@mui/material/colors';
import RulesFollow from './RulesFollow'
import Dashboard from '../Dashboard/Dashboard'
// import { MessageSharp } from '@mui/icons-material'
import Messages from './Messages_Part/Messages'
import BlockIcon from '@mui/icons-material/Block';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DoneIcon from '@mui/icons-material/Done';
import GroupAddIcon from '@mui/icons-material/GroupAdd';


const Maincontent = () => {

  let selectgroupinfo=useSelector(Selectgroupinfo)
  let selectadmininfo=useSelector(Selectadmininfo)
  let selectusersinfo=useSelector(Selectuserinfo)

  let dispatch=useDispatch()
  
  const [users,loading]=useAuthState(auth)

  let useraprove=false;
 
let username=users.displayName

let usersid=selectusersinfo?.userid
// console.log(usersid)





let grpid=selectgroupinfo?.id;
  // console.log(grpid)

let [grpmembers,setGroupmembers]=useState({})

useEffect(()=>{
  db.collection(`group`).doc(grpid).collection('members').onSnapshot((snap)=>{
    setGroupmembers(snap.docs.map((doc)=>({
      id:doc.id,
      data:doc.data()

    })))
    // console.log(snap)
  })
 

   
},[grpid])

// console.log(grpmembers)



let aprovedmem=[]
let procmem=[]
let blockmen=[]
let grpmembercheck=false;


if (Array.isArray(grpmembers)){
  grpmembers?.map((item,indx)=>{
    // console.log(`item.data.userid)`)
    if(item.data.active) 
     { aprovedmem.push(item.data.name)}

     if
 (!item.data.active)
 {procmem.push(item.data.name)}


    if(item.data.block)
                  { blockmen.push(item.data.name)}
    

                  if(item.data.userid===usersid){
                    if(item.data.active){
                      useraprove=true;
                    }
      grpmembercheck=true;

    }

    

    // if(item.data.userid===usersid){
     

    //   grpmembercheck=true;}
  })
}

// console.log(grpmembercheck)


// console.log(blockmen)

let handleeracegroupinfo=()=>{
  
  dispatch(groupInfoact(
     ''
  
  ))
}

  return (
    <div> {
      
      selectgroupinfo?.name ?
   
      <div className='MainContent'>
      <div className='Maincontent_header'>
        <div className='MainContent_Avatar_div'>
          <Avatar  className='Maincontent_Avatar'> 
        
          {username[0].toUpperCase()}{username[1].toUpperCase()  }

           
          </Avatar>
          <span> {username}</span>

          {/* <button>
          {username[0].toUpperCase()}{username[1].toUpperCase()  }

          </button> */}

    
        </div>

        <div>
        {selectgroupinfo?.name} group

        </div>

        <div>

          {users?.email==='chatireactappadmin@gmail.com' ?

          

          <button onClick={handleeracegroupinfo}>back</button>
          
          
          : grpmembercheck ?blockmen.includes(selectusersinfo?.name)? 
          
          <span className='Span_Showblock'><BlockIcon/> Blocked</span>
          : 
          
          aprovedmem.includes(selectusersinfo?.name)?
          <span className='Span_ShowAproved'><DoneIcon/> Approved</span>
          : <span className='Span_Showpending'><AccessTimeIcon/> Pending

          </span>
           
          :
          <span className='Span_Shownotamember'><GroupAddIcon/> Not a member</span>

          
          
          }

          </div>

      

      </div>



      <div className='MainContent_Inside'>

       <div className='MainContent_Inside_display'>




                                      {/* member avilable with name */}





        {/* <section>
        members available in group {aprovedmem.length} */}

         {/* { Array.isArray(grpmembers)&& grpmembers?.map((item,indx)=>{
          return(
            <div key={Math.random()}>
         
            { item.data.active &&  item.data.name}
            

              </div>
          )
         })} */}

         {/* {
        aprovedmem.map((item)=>{
          return(
            <div key={Math.random()}>
              {item}
            </div>
          )
        })
         }
         </section> */}


         {/* <section>
          in process {procmem.length} */}
         

         {/* { Array.isArray(grpmembers)&& grpmembers?.map((item,indx)=>{
          return(
            <div key={Math.random()}>
           
            { !item.data.active && item.data.name}
            

              </div>
          )
         })} */}


{/* {
        procmem.map((item)=>{
          return(
            <div key={Math.random()}>
              {item}
            </div>
          )
        })
         }

         </section> */}


  {/* use this
() users.email!=='chatireactappadmin@gmail.com' &&  !useraprove )?
 <RulesFollow />:'display the message' :'DIsplay message' */}


        {
          ( (users.email!=='chatireactappadmin@gmail.com') && ( !useraprove )) ?
            <RulesFollow />:

         
         <div className='Mailcontent_Messages'>
            <Messages groupid={grpid}/>
            </div>


        }

       </div>

      </div>
    
    </div>



    
    : selectadmininfo.active &&

    // 'dashboard'
    <Dashboard/>



    
  }
    
    </div>
  )
}

export default Maincontent