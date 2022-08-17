import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import './Messages.css'
import SendIcon from '@mui/icons-material/Send';
import { db } from '../../../../Firebase';
import { useSelector } from 'react-redux';

import { selectadmininfo,Selectuserinfo } from '../../../Redux/ReduxSlice'
import MessagesDisplay from './MessagesDisplay';

const Messages = ({groupid}) => {

  let [input,setInput]=useState('')
  let selectuserinfo=useSelector(Selectuserinfo)
  // Selectuserinfo

  let handleInputchange=(e)=>{
    setInput(e.target.value)
  }
 
  let date=new Date()
 

  let newdate=`${date}`


  let dateformat=newdate.split(' ')
  let hrestime=dateformat[4].split(':')
  
  let reqsendtime;
  if(hrestime[0]>12){
    reqsendtime=(`${hrestime[0]-12}:${hrestime[1]} pm`)
  }
  else  reqsendtime=(`${hrestime[0]} am`)
  
  let reqdate=`${dateformat[1]} ${dateformat[2]} ${dateformat[3]} ${reqsendtime}`
// console.log(reqdate)

  let handlesubmitmessage=()=>{

    db.collection('group').doc(groupid).collection('messages').add({
      time:reqdate,
      message:input,
      loves:0,
      likes:0,
      dislikes:0,
      sentby:(selectuserinfo.name),
      senderid:(selectuserinfo.userid),
      sendermail:(selectuserinfo.email)

    })

    alert(`message ${input} sent`)
    setInput('')
 
  }


  let [messages,setMessages]=useState([])

  useEffect(()=>{
    db.collection('group').doc(groupid).collection('messages').onSnapshot((snap)=>{
      setMessages(snap.docs.map((item)=>({
        id:item.id,
        data:item.data()
      })))
    })
      
  },[groupid])

  console.log(messages)
  return (
    <div className='Messages'>
      <div className='Messages_Inside'>
        <div className='Messages_messages'>
      {/* Messages display */}

      {Array.isArray(messages) && messages?.map((item)=>{
        return(
          <div key={item.id}>
            <MessagesDisplay messid={item.id}
            message={item.data.message} senderid={item.data.senderid}
            sendermail={item.data.sendermail} sentby={item.data.sentby}
            time={item.data.time} dislikes={item.data.dislikes}
            likes={item.data.likes} loves={item.data.loves}
            
            />
            </div>
        )
      })}

          
        </div>





      <div className='Message_footer'>
        {/* Have to use react mic */}
        <input  placeholder='type a message' value={input} onChange={handleInputchange}/>
         <button>mics</button>
         {input && 
        //  <button
        //  onClick={handlesubmitmessage}
        //  >
          <Avatar  className='Message_send_Avatar' onClick={handlesubmitmessage}> 
        
        {/* {username[0].toUpperCase()}{username[1].toUpperCase()  } */}
        {/* {`->`} */}

        <SendIcon />

         
        </Avatar>
          // </button>
          }
      </div>

      
      
      </div>
    </div>
  )
}

export default Messages