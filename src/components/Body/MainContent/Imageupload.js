import React, { useEffect, useState } from 'react'
import './Imageupload.css'
import {db} from '../../../Firebase'
import { useSelector } from 'react-redux';
import { Selectuserinfo } from '../../Redux/ReduxSlice';

function Imageupload() {
  let selectusersinfo=useSelector(Selectuserinfo)
        

    const [images, setImages]=useState([]);
     const [imageURLs, setImageURLS] = useState([]);

    useEffect (() => {
    
    // if (images.length< 1) return; 
    let newImageUrls = [];


    images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setImageURLS (newImageUrls);
    
    
    
    
    
    }, [images]);
    
    function onImageChange (e) { 
        setImages([...e.target.files]);
    
    }

    console.log(imageURLs)

    let handlesenduserpic=(src)=>{
        console.log(src)

  db.collection('users').doc((selectusersinfo?.userid)).update({
    img:src
  })

    }
    
    return (
        <>
    
    <input type="file" multiple accept="image/*" onChange={onImageChange} />
     {imageURLs.map(imageSrc =>{
        return (
            <div>
            <img src={imageSrc}   style={{width:'100px'}}/> 
         
           {imageSrc && 
           
           <button  onClick={()=>{
            handlesenduserpic(imageSrc)
           }}>upload this image</button>}
           
           
           
           </div>
        )
     }
       
         ) }
    

    </>
    )
}

export default Imageupload


