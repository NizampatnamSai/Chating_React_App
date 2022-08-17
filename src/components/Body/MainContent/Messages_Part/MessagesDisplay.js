import React from 'react'
import { useSelector } from 'react-redux'
import { Selectadmininfo, Selectgroupinfo, Selectuserinfo } from '../../../Redux/ReduxSlice'
import './MessagesDisplay.css'
import MoreVertIcon from '@mui/icons-material/MoreVert';


const MessagesDisplay = ({
    messid,message,senderid,sendermail,sentby,time,dislikes,likes,loves}) => {

    // console.log( messid,message,senderid,sendermail,sentby,
    //     time,dislikes,likes,loves)
      
        let selectuserinfo=useSelector(Selectuserinfo)
        // let selectadmininfo=useSelector(Selectadmininfo)
        let selectgroupinfo=useSelector(Selectgroupinfo)
        // console.log(selectuserinfo.email)

        let admin=false;

        if (sendermail=== selectgroupinfo?.admin){
            admin=true;
        }
let ownmessage=false;
        if(selectuserinfo.email===sendermail) { ownmessage=true}



  return (
    <div className='MessagesDisplay'>
        <div 
        // className='MessagesDisplay_Inside'>
        className={ownmessage ? ' MessagesDisplay_message_own': 'MessagesDisplay_message'}>

            {/* messages likw watspp */}
            <div className='Messagesdisplay_infotop'>
            {ownmessage ? 'You': admin? 'Admin':
            
            
            sentby}
                </div>
            <div className='Messagesdisplay_messagepart'>

            <div className='Messagesdisplay_messagepart_message'>
            {message}
            </div>

            <div className='Messagesdisplay_messagepart_moreinfo'>
             <MoreVertIcon/></div>
            

            </div>
            <div className='Messagesdisplay_infobottom'>
                {time}

            </div>
        </div>
      
    </div>
  )
}

export default MessagesDisplay
