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
    // console.log(moreinfo)
}


let handleditmessage=()=>{
    
}


  return (
    <div className='MessagesDisplay'>
            {/* {!ownmessage && 'chsfrew'} */}

        <div 
        // className='MessagesDisplay_Inside'>
        
        className={ownmessage ? ' MessagesDisplay_message_own': 
        
        admin? 'MessagesDisplay_message adminmessage' :'MessagesDisplay_message'}>

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
                    {ownmessage && <div className='message_deleteicon'>
                <Delete/>
                    </div>}
                    
                    <div className='message_upgradeicon'>
                <UpgradeIcon/>
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
