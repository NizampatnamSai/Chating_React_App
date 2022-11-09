import React, { useEffect, useState } from 'react'
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
// let selectgroupinfo=useSelector(Selectgroupinfo)

  let [moreinfo,setMoreinfo]=useState(false)
      
        let selectuserinfo=useSelector(Selectuserinfo)
        // console.log(selectuserinfo?.userid)
        let selectgroupinfo=useSelector(Selectgroupinfo)
        let groupname=selectgroupinfo?.name
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
      let timechecktimenow=dateTime;
  
      return timechecktimenow
  }

let functiontimecheck=()=>{
    // let nowtime=
    let nowtime=functiondatecheck().split(' ')

    let messagetime=timechecktime?.split(' ')
    console.log(nowtime,messagetime)

    // convert hrs,min,sec to sum of seconds the compare like that

    if(Array.isArray(nowtime) && nowtime[3]>messagetime[3]){
        console.log('true')
    }

    else {
        console.log('false')
    }

    // Pass edit or delete
    
    // console.log(functiondatecheck())

}




let [editinfo,setEditinfo]=useState({
    open:false,
    text:message
})

let handlemoreinfo=()=>{
    // alert('cliked')
    setMoreinfo(!moreinfo)
    setEditinfo({
        ...editinfo,
        open:false
    })

// let  timestamp=functiondatecheck();

    // db.collection('group').doc(groupid).collection('messages').doc(messid).update({
    
    //     timechecktime:timestamp
    
    
    
    
    // })









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

 toast.success(`message updated`, {
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

let [likesData,setLikesData]=useState([])

let getLikesData=()=>{
    db.collection('users').doc(selectuserinfo?.userid).
        collection('likes').onSnapshot((data)=>(
            setLikesData((data.docs.map((item)=>({
                id:item.id,
                data:item.data()
            }))))
        ))
}

useEffect(()=>{

    getLikesData()
},[message])


let likesmesid=[];

let likesid=[]

likesData.map((item,indx)=>{
    likesmesid.push(item.data.messid)
    likesid.push(item.id)

})

let handleClickIcons=(name)=>{
    if(name==='like'){

//    if(likesData.map((item,indx)=>{
//     if(item.data.messid===messid)
     
   
// }
//    ))



if(likesmesid.includes(messid)){
    // console.log(likesid[(likesmesid.indexOf(messid))])
    alert('deleted from the like')
    db.collection('users').doc(selectuserinfo?.userid).
    collection('likes').doc(likesid[(likesmesid.indexOf(messid))]).delete()
    
    db.collection('group').doc(groupid).collection('messages').doc(messid).update({
        likes:(likes-1)
    })

    setMoreinfo(false)


}

else{

        alert('added to the like')

        db.collection('users').doc(selectuserinfo?.userid).
        collection('likes').add({
            groupid, messid,message,senderid,sendermail,sentby,groupname
        })
        
        db.collection('group').doc(groupid).collection('messages').doc(messid).update({
            likes:(likes+1)
        })
    setMoreinfo(false)


    }}

    if(name==='dislike'){
        alert('added to the dislike')
    }

    if(name==='fire'){
        alert('added to the fire')
    }

    if(name==='favorite'){
        alert('added to the favaroute')
    }
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

                    {/* Liked by update the db & store in array if name include? color to red if not actual color & includes alredy liked */}
                    <div className='message_loveicon'>
                <FavoriteIcon
                onClick={()=>{
                    handleClickIcons('favorite')
                }}
                />
                    </div>
                    <div className='message_fireicon'>
                    <LocalFireDepartmentIcon
                    onClick={()=>{
                        handleClickIcons('fire')
                    }}
                    />
                        </div>
                    <div className='message_thumbsupicon'>
                <ThumbUpIcon
                onClick={()=>{
                    handleClickIcons('like')
                }}
                />
                    </div>
                    <div className='message_thumbsdownicon'>
                <ThumbDownAltIcon
                onClick={()=>{
                    handleClickIcons('dislike')
                }}
                />
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

            <div 
            className='Messagesdisplay_emogies'
            >
                {likes>0 &&
               <div>
                <span>
                <ThumbUpIcon
                style={
                    {
                        // color:'#E8BEAC',
                        color:'#c68642'
                        
                    }
                }
/>
                </span>

                <span>
               
                {likes}
                
                    </span>
                
                </div>}
            </div>
        </div>
      
    </div>
  )
}

export default MessagesDisplay



// import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
// import { Selectadmininfo, Selectgroupinfo, Selectuserinfo } from '../../../Redux/ReduxSlice'
// import './MessagesDisplay.css'
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import EditIcon from '@mui/icons-material/Edit';
// import UpgradeIcon from '@mui/icons-material/Upgrade';
// import { Delete } from '@material-ui/icons'
// // import { EdgesensorHighOutlined } from '@mui/icons-material';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ThumbUpIcon from '@mui/icons-material/ThumbUp';
// import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
// import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
// import { db } from '../../../../Firebase';
// import { toast } from 'react-toastify';
// // import firebase from 'firebase/compat/app';



// const MessagesDisplay = ({
//     groupid, messid,message,senderid,sendermail,sentby,time,dislikes,
//     likes,loves, timechecktime,updated}) => {

// let updatedmessage='';
// if(updated){
//     updatedmessage='updated'
// }
// // let selectgroupinfo=useSelector(Selectgroupinfo)
// console.log(messid)
//   let [moreinfo,setMoreinfo]=useState(false)
      
//         let selectuserinfo=useSelector(Selectuserinfo)
//         // console.log(selectuserinfo?.userid)
//         let selectgroupinfo=useSelector(Selectgroupinfo)
//         let groupname=selectgroupinfo?.name
//         let admin=false;
//         if (sendermail=== selectgroupinfo?.admin){
//             admin=true;
//         }
// let ownmessage=false;
//         if(selectuserinfo.email===sendermail) { ownmessage=true}






// let functiondatecheck=()=>{
//     let today = new Date();
//     let date = today.getFullYear()+' '+(today.getMonth()+1)+' '+today.getDate();
//     let time = today.getHours() + ' ' + today.getMinutes() + ' ' + today.getSeconds();
//       let dateTime = date+' '+time;
//       let timechecktimenow=dateTime;
  
//       return timechecktimenow
//   }

// let functiontimecheck=()=>{
//     // let nowtime=
//     let nowtime=functiondatecheck().split(' ')

//     let messagetime=timechecktime?.split(' ')
//     console.log(nowtime,messagetime)

//     // convert hrs,min,sec to sum of seconds the compare like that

//     if(Array.isArray(nowtime) && nowtime[3]>messagetime[3]){
//         console.log('true')
//     }

//     else {
//         console.log('false')
//     }

//     // Pass edit or delete
    
//     // console.log(functiondatecheck())

// }




// let [editinfo,setEditinfo]=useState({
//     open:false,
//     text:message
// })

// let handlemoreinfo=()=>{
//     setMoreinfo(!moreinfo)
//     setEditinfo({
//         ...editinfo,
//         open:false
//     })

// // let  timestamp=functiondatecheck();

//     // db.collection('group').doc(groupid).collection('messages').doc(messid).update({
    
//     //     timechecktime:timestamp
    
    
    
    
//     // })









// }

// // console.log(editinfo.text)
// let handleditmessage=()=>{
//     let openchek=editinfo.open;
//     setEditinfo({
//         ...editinfo,
//         open:!openchek
//     })

// functiontimecheck()
   
//     // console.log(timestamp)
//     let timecheck=true;
//     if(admin){
// alert('Admin! you can edit this')

// // db.collection('group').doc(groupid).collection('messages').doc(messid).update({

// // })
//     }
//     else {
//         if(timecheck){
//             alert("Sorry after 12hrs of your sent message you can't edit")
//         }

//         else {
//             alert('You can edit!')
//         }

//     }

// }

// let handlemessageDelete=()=>{
//     let timecheck=true;
//     if(selectuserinfo.email==='chatireactappadmin@gmail.com'){
// alert('Admin! you can delete this')
// db.collection('group').doc(groupid).collection('messages').doc(messid).delete().then((res)=>{
    
//         // console.log(res)
//         toast.info(`message deleted`, {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           // pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           });
//         // alert('Succesfully sent the feedback')
        
//       })

//     }
//     else {
//         if(timecheck){
//             alert("Sorry after 2days / 48hrs of your sent message you can't delete message!")
//         }

//         else {
//             alert('You can delete!')
//         }

//     }

// }

// let handleupgrademessage=()=>{
// db.collection('group').doc(groupid).collection('messages').doc(messid).update({
//     message:(editinfo.text),
//     updated:true
// })

// .then((res)=>{

//     setMoreinfo(!moreinfo)
//     setEditinfo({
//         ...editinfo,
//         open:false
//     })

//  toast.success(`message updated`, {
//     position: "top-right",
//     autoClose: 5000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     // pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     })


// }).catch((res)=>{
//     console.log(res)
//     toast.warn(`Opps something went wrong check the console for the responce`, {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         // pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         })


// })
// }

// let [likesData,setLikesData]=useState([])

// let getLikesData=()=>{
//     db.collection('users').doc(selectuserinfo?.userid).
//         collection('likes').onSnapshot((data)=>(
//             setLikesData((data.docs.map((item)=>({
//                 id:item.id,
//                 data:item.data()
//             }))))
//         ))
// }

// useEffect(()=>{

//     getLikesData()
// },[message])


// // let likesmesid=[];

// // let likesid=[]

// let [emogiData,setEmogiData]=useState({
//     likes:{
//         likesmesid:[],
//         likesid:[]
//     }
// })

// useEffect(()=>{
//     likesData.map((item,indx)=>{
//         // likesmesid.push(item.data.messid)
//         // likesid.push(item.id)
//         setEmogiData({
//             ...emogiData,
//             likes:{
//                   ...emogiData.likes,
//                   likesmesid:[
//                     ...emogiData.likes.likesmesid,
//                     (item.data.messid)
//                   ],
    
//                   likesid:[
//                     ...emogiData.likes.likesid,
//                     (item.id)
//                   ],
//                 }
//             })
//         })
// },[])



// console.log(emogiData.likes.likesmesid)

// let handleClickIcons=(name)=>{
//     if(name==='like'){

// //    if(likesData.map((item,indx)=>{
// //     if(item.data.messid===messid)
     
   
// // }
// //    ))



// // if(likesmesid.includes(messid)){
// //     // console.log(likesid[(likesmesid.indexOf(messid))])
// //     alert('deleted from the like')
// //     db.collection('users').doc(selectuserinfo?.userid).
// //     collection('likes').doc(likesid[(likesmesid.indexOf(messid))]).delete()
    
// //     db.collection('group').doc(groupid).collection('messages').doc(messid).update({
// //         likes:(likes-1)
// //     })

// // }

// if(emogiData.likes.likesmesid.includes(messid)){
//     // console.log(likesid[(likesmesid.indexOf(messid))])
//     alert('deleted from the like')
//     db.collection('users').doc(selectuserinfo?.userid).
//     collection('likes').doc(emogiData.likes.likesid[(emogiData.likes.likesmesid.indexOf(messid))]).delete()
    
//     db.collection('group').doc(groupid).collection('messages').doc(messid).update({
//         likes:(likes-1)
//     })

// }

// else{

//         alert('added to the like')

//         db.collection('users').doc(selectuserinfo?.userid).
//         collection('likes').add({
//             groupid, messid,message,senderid,sendermail,sentby,groupname
//         })
        
//         db.collection('group').doc(groupid).collection('messages').doc(messid).update({
//             likes:(likes+1)
//         })

//     }}

//     if(name==='dislike'){
//         alert('added to the dislike')
//     }

//     if(name==='fire'){
//         alert('added to the fire')
//     }

//     if(name==='favorite'){
//         alert('added to the favaroute')
//     }
// }
//   return (
//     <div className='MessagesDisplay'>
          

//         <div 
 
        
//         className={ownmessage ? ' MessagesDisplay_message_own': 
        
//         admin? 'MessagesDisplay_message adminmessage' :'MessagesDisplay_message'}>

           
//             <div className='Messagesdisplay_infotop'>
//             {/* {ownmessage ? 

//             `You`: admin? 'Admin':
            
         
//             sentby} */}

// {ownmessage ? 
//             updated ? 'You (updated message)':

//             `You`: admin? 'Admin':
//             updated ? `${sentby} (updated message)`  :sentby
            
         
//             }





//                 </div>
//             <div className='Messagesdisplay_messagepart'>

//             <div className='Messagesdisplay_messagepart_message'>
//             {message} <br/>
//             {editinfo.open && <input value={editinfo.text} 
//             onChange={(e)=>{
//                 setEditinfo({
//                     ...editinfo,
//                     text:e.target.value
//                 })

//             }}/>}
//             </div>

//             <div className='Messagesdisplay_messagepart_moreinfo'>
//              <MoreVertIcon
//              onClick={handlemoreinfo}
             
//              />
//              {moreinfo &&
//             <div className='Messagesdisplay_messagepart_moreinfo_dis'>
//                 {/* more options like edit,delete like etc */}
               
               
//                {ownmessage && 
//                <div className='message_Editicon'>
//                 <EditIcon onClick={handleditmessage}/>
//                     </div>} 

//                     {/* Liked by update the db & store in array if name include? color to red if not actual color & includes alredy liked */}
//                     <div className='message_loveicon'>
//                 <FavoriteIcon
//                 onClick={()=>{
//                     handleClickIcons('favorite')
//                 }}
//                 />
//                     </div>
//                     <div className='message_fireicon'>
//                     <LocalFireDepartmentIcon
//                     onClick={()=>{
//                         handleClickIcons('fire')
//                     }}
//                     />
//                         </div>
//                     <div className='message_thumbsupicon'>
//                 <ThumbUpIcon
//                 onClick={()=>{
//                     handleClickIcons('like')
//                 }}
//                 />
//                     </div>
//                     <div className='message_thumbsdownicon'>
//                 <ThumbDownAltIcon
//                 onClick={()=>{
//                     handleClickIcons('dislike')
//                 }}
//                 />
//                     </div>

//                     {(ownmessage || (selectuserinfo.email==='chatireactappadmin@gmail.com'))  && <div className='message_deleteicon'>
//                 <Delete  onClick={handlemessageDelete}/>
//                     </div>}
                    
//                     <div className='message_upgradeicon'>
//                 <UpgradeIcon onClick={handleupgrademessage}/>
//                     </div>
                  
                    
//             </div> 
//             }
//              </div>
            

//             </div>
//             <div className='Messagesdisplay_infobottom'>
//                 {time}

//             </div>

//             <div 
//             className='Messagesdisplay_emogies'
//             >
//                 {likes>0 &&
//                <div>
//                 <span>
//                 <ThumbUpIcon
//                 style={
//                     {
//                         // color:'#E8BEAC'
//                         color:'#c68642'
                        
//                     }
//                 }
// />
//                 </span>

//                 <span>
               
//                 {likes}
                
//                     </span>
                
//                 </div>}
//             </div>
//         </div>
      
//     </div>
//   )
// }

// export default MessagesDisplay
