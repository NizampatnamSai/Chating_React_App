import { Avatar } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { groupInfoact } from '../../Redux/ReduxSlice'


const SidebarGroupnames = ({id,name,index,admin,active}) => {
    // console.log(id,name,admin,active)

    let dispatch=useDispatch()


    let handlegroupinfo=()=>{
        dispatch(groupInfoact({
            name:name,
            id:id,
            admin:admin,
            active:active}
        ))

    }
  return (
    <div className='Sidebar_Groupnames'
     >
        <div className='Sidebar_Groupnames_inside'>
            <span>
            <Avatar className='SidebarGroupnames_Avatar'>{`${name[0].toUpperCase()}${name[1].toUpperCase()}`}</Avatar>
            
            </span>
            <span  onClick={handlegroupinfo}
            >{name}</span>

        </div>
    </div>
  )
}

export default SidebarGroupnames