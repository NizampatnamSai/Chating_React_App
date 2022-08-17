import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Selectadmininfo, Selectgroupinfo, Selectuserinfo } from '../../../Redux/ReduxSlice'
import './MessagesDisplay.css'
import MoreVertIcon from '@mui/icons-material/MoreVert';


const MessagesDisplay = ({
    messid,message,senderid,sendermail,sentby,time,dislikes,likes,loves}) => {

  let [moreinfo,setMoreinfo]=useState(false)
      
        let selectuserinfo=useSelector(Selectuserinfo)
        // let selectadmininfo=useSelector(Selectadmininfo)
        let selectgroupinfo=useSelector(Selectgroupinfo)

        let admin=false;

        if (sendermail=== selectgroupinfo?.admin){
            admin=true;
        }
let ownmessage=false;
        if(selectuserinfo.email===sendermail) { ownmessage=true}


let handlemoreinfo=()=>{
    setMoreinfo(!moreinfo)
}
  return (
    <div className='MessagesDisplay'>
        <div 
        // className='MessagesDisplay_Inside'>
        className={ownmessage ? ' MessagesDisplay_message_own': 'MessagesDisplay_message'}>

            {/* messages likw watspp */}
            <div className='Messagesdisplay_infotop'>
            {ownmessage ? 'You': admin? 'Admin':
            
            // color change to admin
            sentby}
                </div>
            <div className='Messagesdisplay_messagepart'>

            <div className='Messagesdisplay_messagepart_message'>
            {message}
            </div>

            <div className='Messagesdisplay_messagepart_moreinfo'>
             <MoreVertIcon
             onClick={handlemoreinfo}
             
             />
             {moreinfo &&
            <div className='Messagesdisplay_messagepart_moreinfo_dis'>
                more options like edit,delete like etc
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
