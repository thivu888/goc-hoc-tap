import React from 'react';
import './storyItem.css'
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import UserData from '../../configData/UserData';
const CreateStory = () => {
    const user=useRecoilValue(UserData)
   
    return (
        <Link to='/stories/create'>
            <div className='story-item' >
                <img  className='story-item-avt-create' src={user.user.profilePicture}/>
                <div  style={{height:'150px'}} >
                    <img className='story-item-img-create' style={{height:'150px',width:'100%',objectFit:'cover'}}  src={user.user.profilePicture} />
                </div>
                <div className=' d-flex flex-column justify-content-center' style={{width:'100%',height:'50px',backgroundColor:'#ffffff',color:'#000'}} >
                   <div style={{left:'52px',top:'130px',position:'absolute',width:'40px',height:'40px',borderRadius:'50%',border:'3px solid #ffffff',backgroundColor:'#1876f2'}}> <i className='eqw12 mt-1'></i></div>
                    <span className='mt-3' style={{float:'inline-end',color:'#050505',fontWeight:'600',fontSize:'14px'}}>Tạo tin</span>
                </div>
            </div>
        </Link>
    );
}

export default CreateStory;
