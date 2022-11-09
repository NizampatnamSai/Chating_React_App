import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Selectuserinfo } from '../../Redux/ReduxSlice'
import Imageupload from './Imageupload'
import './Welcomepage.css'
const Welcomepage = () => {
  let selectusersinfo=useSelector(Selectuserinfo)
//   console.log(selectusersinfo?.img)



  let [img,setImag]=useState('')
  let handleImagechange=(e)=>{
    console.log(e.target.files)
    setImag(e.target.files)

  }
  console.log(img)

let [imgurl,setImguel]=useState('')

// useEffect(()=>{
//     let url=(URL.createObjectURL(img))

//     setImguel(
// url
//     )



// },[img])

// const logoChangeHandler = (e) => {
//     e.preventDefault();
//     let selectedFile = e.target.files[0];
//     // debugger;
//     setFile(URL.createObjectURL(e.target.files[0]));
//     dispatch(logoUpload(formDataGenerator({ logo: selectedFile })));
//     // debugger;
//   };

let previewimg=()=>{
    let url=(URL.createObjectURL(img))

    setImguel(
url
    )
}



















let imgsrc;
// let imgsrc=(selectusersinfo?.imgsrc) ;

// imgsrc=`https://lh3.googleusercontent.com/ogw/AOh-ky2oloVkT73T_KxqD2WfRWheMs0mvNvZZpMmSb6O=s32-c-mo`

  return (

    <div className='Welcomepage'>
        <h1>
      Welcome, <b>{selectusersinfo?.name}</b>
      </h1>
      <div className='Welcomepage_inside'>
        <div>
            {/* up with Avater */}
            {imgsrc  ?
            // <Avatar src={imgsrc} alt='png'/>
<img src={imgsrc} alt='o'/>

            :
            <div className='welcomepage_Avatarimgchoose'>
               

           <div className='Avatar_part'> 
          <span><Avatar className='Avatar_part_Avatar'>
             <h1> {selectusersinfo?.name && 
              (`${selectusersinfo?.name[0].toUpperCase()}${selectusersinfo?.name[1].toUpperCase()}`)}
         </h1>   </Avatar> </span> 
            <span className='Avatar_part_status'>.</span>
            </div>



{/* <div>
                <span>Want to uploadprofile image?</span>

                <input type='file' placeholder='upload image'
                accept='image/*' onChange={handleImagechange} 
                // value={img}
                />
                {img && <button onClick={()=>{
                    setImag('')
                }}>Erace img</button>}
                {img && <button >Uploadimg</button>}


                <div>
                  {img &&  
                  
                //   `preview img`
                <button onClick={previewimg}>priewv</button>
                  }



            {imgurl && <img src={imgurl} alt='select img preview'/>}








                 
                    </div>
</div> */}


{/* Image upload part need to add*/}


            {/* No profile pic is uploaded, uploadnow?
             <Imageupload/> */}


            </div>
        


        }

            {/* <Avatar src='https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png' alt='png'/> */}
                {/* <img /> */}
            
        </div>
        <div className='Welcomepage_moreinfo'>
          {selectusersinfo?.email==='chatireactappadmin@gmail.com'? 'Hi Admin':
          <p>

            Hi , <b>{selectusersinfo?.name}</b>
            <br/>
            {/* more info */}
            Join the groups, chat with your friends, explore new things & enjoy the life !
           <br/>
           <b> But newer forget to follow the basic rules of the groups, because  you may be block the Admin at any time...
           </b>
           </p>}
            
            </div>
      </div>
    </div>


  )


}

export default Welcomepage
