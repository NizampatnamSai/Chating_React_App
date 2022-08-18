import { Avatar } from '@material-ui/core'
import React, { useEffect, useRef, useState } from 'react'
import './Messages.css'
import SendIcon from '@mui/icons-material/Send';
import { db } from '../../../../Firebase';
import { useSelector } from 'react-redux';

import { selectadmininfo,Selectuserinfo } from '../../../Redux/ReduxSlice'
import MessagesDisplay from './MessagesDisplay';
import MicOutlinedIcon from '@mui/icons-material/MicOutlined';
import MicOffIcon from '@mui/icons-material/MicOff';
import {useCollection, useDocument} from 'react-firebase-hooks/firestore'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';


const Messages = ({groupid}) => {


  const [roomMessage,loading]=useCollection(
    groupid && db.collection('group').doc(groupid).collection('messages').orderBy('time','asc')
)

  const Chatref=useRef(null)
  useEffect(()=>{
    Chatref?.current?.
    scrollIntoView(
      false
      // { block: 'end',  behavior: 'smooth' }
    )

},[groupid,loading])




  let [input,setInput]=useState({
    text:'',
    mic:'',
    combine:''
  })
  let selectuserinfo=useSelector(Selectuserinfo)
  let handleInputchange=(e)=>{
    let micinp=input.combine
    setInput({
      ...input,
      text:e.target.value,
      combine:(`${input.text}${micinp}`)
    })
  }

 




// Mic part

let [micon,setMicon]=useState(false)


let handlemiconbtn=()=>{
  setMicon(false)
  alert('mic is off now ')
  SpeechRecognition.stopListening()



}

let {
  transcript,
  interimTranscript,
  finalTranscript,
  resetTranscript,
  listening,
} = useSpeechRecognition();

let [language, setLanguage] = useState(
  {
    code: 'te',
    name: 'telugu'
  })

let handlemicoffbtn = () => {
  alert('Mic is on, please speck to record')
  setMicon(true)


  // let language='en'
  SpeechRecognition.startListening({
    continuous: true,
    language: language.code,
  })

  let micinp=input.text
  setInput({
    ...input,
    mic:transcript,
    combine:(`${input.mic}${micinp}`)
  })

  //  console.log(transcript)


}

// console.log(input.combine)


  // Date part


let functiondate=()=>{

  let date=new Date()
  let newdate=`${date}`


  let dateformat=newdate.split(' ')
  let hrestime=dateformat[4].split(':')
 
  
  let reqsendtime;
  if(hrestime[0]>12){
    reqsendtime=(`${hrestime[0]-12}:${hrestime[1]}:${hrestime[2]} pm`)
  }
  else  reqsendtime=(`${hrestime[0]} :${hrestime[1]}:${hrestime[2]} am`)
  
  return `${dateformat[1]} ${dateformat[2]} ${dateformat[3]} ${reqsendtime}`


}

let functiondatecheck=()=>{
  let today = new Date();
  let date = today.getFullYear()+' '+(today.getMonth()+1)+' '+today.getDate();
  let time = today.getHours() + ' ' + today.getMinutes() + ' ' + today.getSeconds();
    let dateTime = date+' '+time;

    return dateTime
}
 

  let handlesubmitmessage=()=>{
    let reqdate=functiondate()
    let timechecktime=functiondatecheck()
    // timestamp:firebase.firestore.FieldValue.serverTimestamp(),

    db.collection('group').doc(groupid).collection('messages').add({
      time:reqdate,
      message:(input.text),
      loves:0,
      likes:0,
      dislikes:0,
      sentby:(selectuserinfo.name),
      senderid:(selectuserinfo.userid),
      sendermail:(selectuserinfo.email),
      timechecktime:timechecktime,

    })

    

  .then(res=>{
      // console.log(res)
      toast.success(`message sent`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        // pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      // alert('Succesfully sent the feedback')
      
    }).catch(error=>{
      console.log(error)
      toast.warn('Oops some thing went wrong see the console for error!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });


    // alert(`message ${input} sent`)
 
  }
  )
  setInput({
    ...input,
    text:''
  })

}



  let [messages,setMessages]=useState([])

  useEffect(()=>{
    db.collection('group').doc(groupid).collection('messages').orderBy('time','asc').onSnapshot((snap)=>{

    // db.collection('group').doc(groupid).collection('messages').onSnapshot((snap)=>{
      setMessages(snap.docs.map((item)=>({
        id:item.id,
        data:item.data()
      })))
    })
      
  },[groupid])



























// console.log(window.scrollY)

  return (
    <div className='Messages'>
      <div className='Messages_Inside'>
        <div className='Messages_messages' ref={Chatref}>
      {/* Messages display */}

      {Array.isArray(messages) && messages?.map((item)=>{
        return(
          <div key={item.id}>
            <MessagesDisplay messid={item.id}
            message={item.data.message} senderid={item.data.senderid}
            sendermail={item.data.sendermail} sentby={item.data.sentby}
            time={item.data.time} dislikes={item.data.dislikes}
            likes={item.data.likes} loves={item.data.loves} timechecktime={item.data.timechecktime}
            groupid={groupid} updated={item.data.updated}
            />
            
            </div>
        )
      })}

          
        </div>





      <div className='Message_footer'>
        {/* Have to use react mic */}
        <input  placeholder='type a message' value={input.text} onChange={handleInputchange}/>
          
        

        <div className={micon? 'micpart_oned':'micpart_offed'}>
         {micon ? 
         <MicOutlinedIcon onClick={handlemiconbtn}/>: 
         
         
         <MicOffIcon onClick={handlemicoffbtn}/>}
</div>


         {input.text && 
        //use mic here 
          <Avatar  className='Message_send_Avatar' onClick={handlesubmitmessage}> 
        
        

        <SendIcon />

         
        </Avatar>
         
          }
      </div>

      
      
      </div>
    </div>
  )
}

export default Messages