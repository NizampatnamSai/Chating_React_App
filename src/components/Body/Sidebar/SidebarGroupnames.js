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
            <small>{index+1}</small>
            <span  onClick={handlegroupinfo}
            >{name}</span>

        </div>
    </div>
  )
}

export default SidebarGroupnames