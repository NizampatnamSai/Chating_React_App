import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { groupInfoact, Selectgroupinfo, Selectuserinfo, userInfo } from '../../Redux/ReduxSlice'
import './RulesFollow.css'
import { rules } from './Rules'
import { useSelector } from 'react-redux'

import { auth, db } from '../../../Firebase'
// import { useAuthState } from 'react-firebase-hooks/auth'
// import { ToastContainer, toast } from 'react-toastify';


const RulesFollow = () => {
  let selectgroupinfo=useSelector(Selectgroupinfo)
  let selectusersinfo=useSelector(Selectuserinfo)

  // console.log(selectusersinfo)


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




let grpid=selectgroupinfo?.id;
  // console.log(grpid)
  let useremail=selectusersinfo?.email;
  // console.log(useremail)

  let usersid=selectusersinfo?.userid
  // console.log(usersid)
  let username=selectusersinfo?.name

let handleAskAdmin=()=>{
  

  db.collection(`group`).doc(grpid).collection('members').add({
    email:useremail,
    userid:usersid,
    active:false,
    name:username,
  })

}

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


let grpmemstatuscheck=true;
let grpmemblockcheck;
let grpmembercheck;


if(Array.isArray(grpmembers)){

  grpmembers?.map((item)=>{
    if(item?.data?.userid===usersid){
      grpmemstatuscheck=item?.data?.active;
      grpmemblockcheck=item?.data?.block;
      grpmembercheck=true;
    }

  })

}

// console.log(grpmembers)
// console.log(grpmemstatuscheck,grpmemblockcheck)




let submitFeedbackForm=(e)=>{
   
  e.preventDefault()
  // console.log(e.target)
  // emailjs.sendForm(
  //   'service_18f6qgg',
  //   'template_4280pt1',
  //   e.target,
  //   'XIyoA13Wr3KbW0VjW'
  // )
  // .then(res=>{
  //   console.log(res)
  //   toast.success('Succesfully sent the feedback', {
  //     position: "top-right",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     // pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     });
  //   // alert('Succesfully sent the feedback')
    
  // }).catch(error=>{
  //   console.log(error)
  //   toast.warn('Oops some thing went wrong', {
  //     position: "top-right",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     });
  // })
}
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

    
    <input type='checkbox'  onChange={handlecheckbox} value={true}
    />  I Acknowledge & Accepted
      

      <button onClick={handleeracegroupinfo}>I Quit</button>
    </div>

<div>



  { grpmemstatuscheck ?  askadminbtn && 
    
    <button  onClick={handleAskAdmin}
    >Ask the admin to join</button>:
    grpmembercheck?

    
<div>


    Your Response is sent to the group admin , it will take time to add you. 
    Want fast responce? Mail him .

  <form
  onSubmit={submitFeedbackForm}
    style={{maxWidth:'500px', marginLeft:'auto',marginRight:'auto', width:'95%'}}
  >
  <div className="form-group m-2">
    <label >Your Name</label>
    <input type="name" className="form-control col-md-5 col-12" id="exampleFormControlInput1"
     placeholder="write your name here" required name='user_name'/>
  </div>
  <div className="form-group m-2">
    <label>Email address</label>
    <input type="email" className="form-control" id="exampleFormControlInput1" 
    placeholder="write your email address here" required name='user_email'/>
  </div>


  <div className="form-group m-2">
    <label >Message</label>
    <textarea className="form-control" id="exampleFormControlTextarea1" rows="4"
     required name='message'/>
  </div>
  <button type='submit' className='btn btn-primary m-2'>Submit</button>
</form>



</div>:
''
  
  
  }

   





</div>
  </div>
  )
}

export default RulesFollow