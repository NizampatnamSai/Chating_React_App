import React from 'react'
import { useSelector } from 'react-redux'
import { Selectuserinfo } from '../../../Redux/ReduxSlice'
import './MessagesDisplay.css'

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
        className={ownmessage ? 'MessagesDisplay_message_own': 'MessagesDisplay_message'}>

            {/* messages likw watspp */}
            <div >

             {/* className={ownmessage ? 'MessagesDisplay_message_own': 'MessagesDisplay_message'}> */}
            {message}

            </div>
        </div>
      
    </div>
  )
}

export default MessagesDisplay
