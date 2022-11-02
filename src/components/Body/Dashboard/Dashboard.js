import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { db } from '../../../Firebase'
import { adminInfo, Selectadmininfo } from '../../Redux/ReduxSlice'
// import '/Dashboard.css'
import './Dashboard.css'
import GroupDashboard from './GroupDashboard'
import GroupMembers from './GroupMembers'

const Dashboard = () => {

let selectadmininfo=useSelector(Selectadmininfo)
let groupid=selectadmininfo?.groupid
let groupname=selectadmininfo?.name
let dispatch=useDispatch()


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

let handleBackbtn=()=>{
  dispatch( adminInfo({
    active:false

  }
    
  ))
}

  return (
    <div className='Dashboard'>
        <div className='Dashboard_Inside'>

            <div className='Dashboard_groupspart' >
                Grop here to select
                <div className='Dashboard_groupspart_namesInside'>

               
                { groups.map((item)=>{
                    return(
                        <div key={Math.random()} className={`Dashboard_groupspart_namesInsideNames `}
                        style={{
                          color: groupname ===item.data.name ? 'green':'red',
                          borderBottom:groupname ===item.data.name ? '1px solid white':'1px solid black'
                        }}
                        >
                            <GroupDashboard id={item.id}
                             active={item.data.active} admin={item.data.admin}
                             name={item.data.name}
                             
                             />


                            </div>
                    )
                })}
                 </div>
            </div>
            <div className='Dashboard_grpmemberspart'>

                {/* {selectadmininfo?.groupid} */}
                Members and there data
                in {groupname} group 
                <button onClick={handleBackbtn} className='Dashboard_grpmemberspart_backbtn'>
                  Back
                </button>

                <div
                style={{
                  marginTop:'10px'
                }}
                >
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
    </div>
  )
}

export default Dashboard