import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Selectadmininfo, Selectgroupinfo, Selectuserinfo } from '../../../Redux/ReduxSlice'
import './MessagesDisplay.css'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import { Delete } from '@material-ui/icons'
// import { EdgesensorHighOutlined } from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import { db } from '../../../../Firebase';
import { toast } from 'react-toastify';
// import firebase from 'firebase/compat/app';



const MessagesDisplay = ({
    groupid, messid,message,senderid,sendermail,sentby,time,dislikes,
    likes,loves, timechecktime,updated}) => {

        let updatedmessage='';
if(updated){
    updatedmessage='updated'
}

  let [moreinfo,setMoreinfo]=useState(false)
      
        let selectuserinfo=useSelector(Selectuserinfo)
        let selectgroupinfo=useSelector(Selectgroupinfo)
        let admin=false;
        if (sendermail=== selectgroupinfo?.admin){
            admin=true;
        }
let ownmessage=false;
        if(selectuserinfo.email===sendermail) { ownmessage=true}






let functiondatecheck=()=>{
    let today = new Date();
    let date = today.getFullYear()+' '+(today.getMonth()+1)+' '+today.getDate();
    let time = today.getHours() + ' ' + today.getMinutes() + ' ' + today.getSeconds();
      let dateTime = date+' '+time;
      let timechecktime=dateTime;
    let timedis=timechecktime.split(' ')
  
      return timedis
  }

let functiontimecheck=()=>{
    // Pass edit or delete
    
    // console.log(functiondatecheck())

}




let [editinfo,setEditinfo]=useState({
    open:false,
    text:message
})

let handlemoreinfo=()=>{
    setMoreinfo(!moreinfo)
    setEditinfo({
        ...editinfo,
        open:false
    })
}

// console.log(editinfo.text)
let handleditmessage=()=>{
    let openchek=editinfo.open;
    setEditinfo({
        ...editinfo,
        open:!openchek
    })

functiontimecheck()
   
    // console.log(timestamp)
    let timecheck=true;
    if(admin){
alert('Admin! you can edit this')

// db.collection('group').doc(groupid).collection('messages').doc(messid).update({

// })
    }
    else {
        if(timecheck){
            alert("Sorry after 12hrs of your sent message you can't edit")
        }

        else {
            alert('You can edit!')
        }

    }

}

let handlemessageDelete=()=>{
    let timecheck=true;
    if(selectuserinfo.email==='chatireactappadmin@gmail.com'){
alert('Admin! you can delete this')
db.collection('group').doc(groupid).collection('messages').doc(messid).delete().then((res)=>{
    
        // console.log(res)
        toast.info(`message deleted`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          // pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
        // alert('Succesfully sent the feedback')
        
      })

    }
    else {
        if(timecheck){
            alert("Sorry after 2days / 48hrs of your sent message you can't delete message!")
        }

        else {
            alert('You can delete!')
        }

    }

}

let handleupgrademessage=()=>{
db.collection('group').doc(groupid).collection('messages').doc(messid).update({
    message:(editinfo.text),
    updated:true
})

.then((res)=>{

    setMoreinfo(!moreinfo)
    setEditinfo({
        ...editinfo,
        open:false
    })

 toast.info(`message updated`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    // pauseOnHover: true,
    draggable: true,
    progress: undefined,
    })


}).catch((res)=>{
    console.log(res)
    toast.warn(`Opps something went wrong check the console for the responce`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        // pauseOnHover: true,
        draggable: true,
        progress: undefined,
        })


})
}


  return (
    <div className='MessagesDisplay'>
          

        <div 
 
        
        className={ownmessage ? ' MessagesDisplay_message_own': 
        
        admin? 'MessagesDisplay_message adminmessage' :'MessagesDisplay_message'}>

           
            <div className='Messagesdisplay_infotop'>
            {/* {ownmessage ? 

            `You`: admin? 'Admin':
            
         
            sentby} */}

{ownmessage ? 
            updated ? 'You (updated message)':

            `You`: admin? 'Admin':
            updated ? `${sentby} (updated message)`  :sentby
            
         
            }





                </div>
            <div className='Messagesdisplay_messagepart'>

            <div className='Messagesdisplay_messagepart_message'>
            {message} <br/>
            {editinfo.open && <input value={editinfo.text} 
            onChange={(e)=>{
                setEditinfo({
                    ...editinfo,
                    text:e.target.value
                })

            }}/>}
            </div>

            <div className='Messagesdisplay_messagepart_moreinfo'>
             <MoreVertIcon
             onClick={handlemoreinfo}
             
             />
             {moreinfo &&
            <div className='Messagesdisplay_messagepart_moreinfo_dis'>
                {/* more options like edit,delete like etc */}
               
               
               {ownmessage && 
               <div className='message_Editicon'>
                <EditIcon onClick={handleditmessage}/>
                    </div>} 

                    
                    <div className='message_loveicon'>
                <FavoriteIcon/>
                    </div>
                    <div className='message_fireicon'>
                    <LocalFireDepartmentIcon/>
                        </div>
                    <div className='message_thumbsupicon'>
                <ThumbUpIcon/>
                    </div>
                    <div className='message_thumbsdownicon'>
                <ThumbDownAltIcon/>
                    </div>

                    {(ownmessage || (selectuserinfo.email==='chatireactappadmin@gmail.com'))  && <div className='message_deleteicon'>
                <Delete  onClick={handlemessageDelete}/>
                    </div>}
                    
                    <div className='message_upgradeicon'>
                <UpgradeIcon onClick={handleupgrademessage}/>
                    </div>
                  
                    
            </div> 
            }
             </div>
            

            </div>
            <div className='Messagesdisplay_infobottom'>
                {time}

            </div>
        </div>
      
    </div>
  )
}

export default MessagesDisplay
