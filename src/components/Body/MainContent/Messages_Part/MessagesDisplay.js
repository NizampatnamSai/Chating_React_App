import React from 'react'
import { useSelector } from 'react-redux'
import { Selectuserinfo } from '../../../Redux/ReduxSlice'
import './MessagesDisplay.css'
import MoreVertIcon from '@mui/icons-material/MoreVert';


const MessagesDisplay = ({
    messid,message,senderid,sendermail,sentby,time,dislikes,likes,loves}) => {

    // console.log( messid,message,senderid,sendermail,sentby,
    //     time,dislikes,likes,loves)
      
        let selectuserinfo=useSelector(Selectuserinfo)
        // console.log(selectuserinfo.email)
let ownmessage=false;
        if(selectuserinfo.email===sendermail) { ownmessage=true}



  return (
    <div className='MessagesDisplay'>
        <div 
        // className='MessagesDisplay_Inside'>
        className={ownmessage ? ' MessagesDisplay_message_own': 'MessagesDisplay_message'}>

            {/* messages likw watspp */}
            <div className='Messagesdisplay_infotop'>
            {ownmessage ? 'You': sentby}
                </div>
            <div >

            
            {message} <MoreVertIcon/>
            

            </div>
            <div className='Messagesdisplay_infobottom'>
                {time}

            </div>
        </div>
      
    </div>
  )
}

export default MessagesDisplay
