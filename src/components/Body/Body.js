import React from 'react'
import Maincontent from './MainContent/Maincontent'
import Sidebar from './Sidebar/Sidebar'
import './Body.css'
import { useSelector } from 'react-redux'
import { Selectadmininfo, Selectgroupinfo } from '../Redux/ReduxSlice'

const Body = () => {
  let selectgroupinfo=useSelector(Selectgroupinfo)
  let selectadmininfo=useSelector(Selectadmininfo)
  // console.log(selectadmininfo.active)
// no name  & active -> maincontent 100% & sidebar 0%

  return (
    <div className='Body'
    >
        {/* Body */}


<div className='Body_inside'>

    <div className={`Body_sidebar ${!selectgroupinfo?.name   
    && !selectadmininfo.active 
      ?
      'Body_sidebar_NoName':'Body_sidebar_Name'}`}>
    <Sidebar/>

    </div>

    <div className={`Body_Maincontent ${!selectgroupinfo?.name  
      && !selectadmininfo.active 
      ? 'Body_Maincontent_NoName':'Body_Maincontent_Name'}`}>
        <Maincontent/>
    </div>

</div>


        {/* lore,nblzjhgxsa8ygb h */}
        {/* <img src='https://pbs.twimg.com/profile_images/1455185376876826625/s1AjSxph_400x400.jpg'
           alt='Goglr.png'/><img src='https://pbs.twimg.com/profile_images/1455185376876826625/s1AjSxph_400x400.jpg'
           alt='Goglr.png'/><img src='https://pbs.twimg.com/profile_images/1455185376876826625/s1AjSxph_400x400.jpg'
           alt='Goglr.png'/><img src='https://pbs.twimg.com/profile_images/1455185376876826625/s1AjSxph_400x400.jpg'
           alt='Goglr.png'/><img src='https://pbs.twimg.com/profile_images/1455185376876826625/s1AjSxph_400x400.jpg'
           alt='Goglr.png'/><img src='https://pbs.twimg.com/profile_images/1455185376876826625/s1AjSxph_400x400.jpg'
           alt='Goglr.png'/><img src='https://pbs.twimg.com/profile_images/1455185376876826625/s1AjSxph_400x400.jpg'
           alt='Goglr.png'/> */}
   
   
    </div>
  )
}

export default Body