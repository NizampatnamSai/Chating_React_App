import { Avatar } from '@material-ui/core'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useSelector } from 'react-redux'
import { auth } from '../../../Firebase'
import { Selectadmininfo, Selectgroupinfo } from '../../Redux/ReduxSlice'
import './Maincontent.css'
import { deepOrange, deepPurple } from '@mui/material/colors';
import RulesFollow from './RulesFollow'

const Maincontent = () => {

  let selectgroupinfo=useSelector(Selectgroupinfo)
  let selectadmininfo=useSelector(Selectadmininfo)
  // console.log(selectgroupinfo?.name[0])
  const [users,loading]=useAuthState(auth)

  let useraprove=false;
  // console.log(users)
let username=users.displayName

  return (
    <div> {selectgroupinfo?.name ?
   
      <div className='MainContent'>
      <div className='Maincontent_header'>
        <div className='MainContent_Avatar_div'>
          <Avatar sx={{ bgcolor: deepPurple[500]  }} className='Maincontent_Avatar'> 
        
          {username[0].toUpperCase()}{username[1].toUpperCase()  }

           
          </Avatar>
          <span> {username}</span>

          {/* <button>
          {username[0].toUpperCase()}{username[1].toUpperCase()  }

          </button> */}

    
        </div>

        <div>
        {selectgroupinfo?.name} group

        </div>

      

      </div>



      <div className='MainContent_Inside'>

       <div className='MainContent_Inside_display'>
        {
           users.email!=='chatireactappadmin@gmail.com' ?( !useraprove ?
            <RulesFollow />:'display the message'
          ):(
            'display the message'
          )


        }

       </div>

      </div>
    
    </div>



    
    : selectadmininfo? 'dashboard':


''
    
  }
    
    </div>
  )
}

export default Maincontent