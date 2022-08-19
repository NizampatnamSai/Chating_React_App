import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { db } from '../../../Firebase'
import { Selectadmininfo } from '../../Redux/ReduxSlice'
// import '/Dashboard.css'
import './Dashboard.css'
import GroupDashboard from './GroupDashboard'
import GroupMembers from './GroupMembers'

const Dashboard = () => {

let selectadmininfo=useSelector(Selectadmininfo)
let groupid=selectadmininfo?.groupid
let groupname=selectadmininfo?.name

  let [groups,SetGroups]=useState([])

useEffect(()=>{
  db.collection('group').onSnapshot((snap)=>{
    
    SetGroups(snap.docs.map((doc)=>({
      id:doc.id,
      data:doc.data()
      
    })))
  })
},[])


let [groupmembers,setGroupmembers]=useState([])
 useEffect(()=>{
    db.collection('group').doc(groupid).collection('members').onSnapshot((snap)=>{
        setGroupmembers(snap.docs.map((item)=>({
            id:item.id,
            data:item.data()
        })))
    })

 },[groupid])

//  console.log(groupmembers)

  return (
    <div className='Dashboard'>
        <div className='Dashboard_Inside'>

            <div className='Dashboard_groupspart' >
                Grop here to select
                { groups.map((item)=>{
                    return(
                        <div key={Math.random()}>
                            <GroupDashboard id={item.id}
                             active={item.data.active} admin={item.data.admin}
                             name={item.data.name}
                             
                             />


                            </div>
                    )
                })}
            </div>
            <div className='Dashboard_grpmemberspart'>

                {/* {selectadmininfo?.groupid} */}
                Members and there data
                in {groupname} group


                { groupmembers.map((item)=>{
                    return(
                        <div key={item.id}>
                            <GroupMembers id={item.id}
                            active={item.data.active} block={item.data.block}
                            email={item.data.email}  name={item.data.name}
                            userid={item.data.userid} groupid={groupid}
                            
                            />

                            </div>
                    )
                })

                }
            </div>
        </div>
    </div>
  )
}

export default Dashboard