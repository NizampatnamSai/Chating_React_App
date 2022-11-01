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


let [usemic,setUsemic]=useState(false)

let handleusemic=()=>{
  setUsemic(!usemic)

  if(usemic){
  SpeechRecognition.stopListening()
  resetTranscript()
  setMicon(false)

    
  }
}

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
      // combine:(`${input.text}${micinp}`)
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

// console.log(listening)

let [language, setLanguage] = useState(
  {
    code: 'en',
    name: 'english'
  })

  let handlelanguagechange = (e) => {
    console.log(e.target.value)
    let targeted = (e.target.value)
    console.log(targeted.split(' '))
    let targetteddata = targeted.split(' ');
    console.log(targetteddata);
    setLanguage({
      ...language,
      code: targetteddata[1],
      name: targetteddata[0]
    })
    console.log('during changing code',language.code)

    micLanguageCheck()


  }


  let micLanguageCheck=()=>{
    console.log('after changed code',language.code)
    SpeechRecognition.startListening({
      continuous: true,
      language: language.code,
    })
  }

let handlemicoffbtn = () => {
  alert('Mic is on, please speck to record')
  setMicon(true)


  // let language='en'


  // let micinp=input.text
  

  //  console.log(transcript)
  micLanguageCheck()

}


useEffect(()=>{
  setInput({
    ...input,
    mic:transcript,
  
  })
},[transcript])
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

let reqmessage;
    if(usemic){
      reqmessage=input.mic
    }
    else {
      reqmessage=input.text
    }

    db.collection('group').doc(groupid).collection('messages').add({
      time:reqdate,
      message:reqmessage,
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
    text:'',
    mic:''
  })

  resetTranscript()
  setMicon(false)
  SpeechRecognition.stopListening()


}



  let [messages,setMessages]=useState([])

  useEffect(()=>{
    // db.collection('group').doc(groupid).collection('messages').orderBy('time','asc').onSnapshot((snap)=>{
      db.collection('group').doc(groupid).collection('messages').orderBy('timechecktime','asc').onSnapshot((snap)=>{

    // db.collection('group').doc(groupid).collection('messages').onSnapshot((snap)=>{
      setMessages(snap.docs.map((item)=>({
        id:item.id,
        data:item.data()
      })))
    })
    
    setInput({
      ...input,
      text:'',
      mic:''
    })

    resetTranscript()
    
    setMicon(false)
  SpeechRecognition.stopListening()
    





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
{ micon &&
      <div className='Messages_ShowMicListening'>
        <div>
          Language change
          <div>

<select onChange={handlelanguagechange}>
  <option>English en</option>
  <option>Telugu te</option>

  <option>Hindi hi</option>
  <option>Tamil ta</option>
  <option>Kannada kn</option>
</select>
</div>


          </div>
        <div className='Messages_ShowMicListening_Inside'>

        <div>
          Speak now,
        Mic is listening in {language.code}....
        <br/>



       <h3 style={{marginTop:'10px', padding:'5px'}}
       >{transcript}</h3> 
        
        </div>
        <div>

          {/* mic img large & small */}
          <img src='https://mir-s3-cdn-cf.behance.net/project_modules/max_632/0f4eed26719057.5635a060dc9e1.gif'/>
        </div>
        </div>
      </div>}

          
        </div>





      <div className='Message_footer'>
        {/* Have to use react mic */}
        
        {usemic ? 
        
        <button className='Message_footer_usemicbtn'
        onClick={handleusemic}
        >useText</button>
        :
        
        
        <button onClick={handleusemic} 
        className='Message_footer_usemicbtn'
         >usemic</button>}




       {usemic ?
       <input placeholder='use Mic to speck in telugu'  value={input.mic}/>:

       <input  placeholder='type a message' value={input.text} onChange={handleInputchange}/>
      
      }


          
        

        <div className={micon? 'micpart_oned':'micpart_offed'}>
           {usemic && (micon ? 

         <MicOutlinedIcon onClick={handlemiconbtn}     
         className={listening && 'micpart_oned_listening'}   />: 
         
         
         <MicOffIcon onClick={handlemicoffbtn}   
        //  className={!listening && 'micpart_oned_listening'}
         />)}
</div>
          

          {usemic ?
          (input.mic && 
            
            <Avatar  className='Message_send_Avatar' onClick={handlesubmitmessage}> 
        
        

            <SendIcon />
    
             
            </Avatar>) :
        (input.text && 
          //use mic here 
            <Avatar  className='Message_send_Avatar' onClick={handlesubmitmessage}> 
          
          
  
          <SendIcon />
  
           
          </Avatar>
           
        )
        
        }


{usemic &&
          input.mic && <button
          className='micspeechclear_btn'
          onClick={()=>{

            setInput({
              ...input,
              mic:''
            })
            resetTranscript()
          }}
          
          
          >
            clear</button>}
         
      </div>

      
      
      </div>
    </div>
  )
}

export default Messages