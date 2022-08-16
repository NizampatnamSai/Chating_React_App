import React from 'react'
import Maincontent from './MainContent/Maincontent'
import Sidebar from './Sidebar/Sidebar'
import './Body.css'

const Body = () => {
  return (
    <div className='Body'
    >
        {/* Body */}


<div className='Body_inside'>

    <div className='Body_sidebar'>
    <Sidebar/>

    </div>

    <div className='Body_Maincontent'>
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