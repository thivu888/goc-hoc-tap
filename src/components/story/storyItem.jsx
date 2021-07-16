import React, { useState,useEffect } from 'react';
import './storyItem.css'
import { Link } from 'react-router-dom';
import UserAPI from '../../API/UserAPI';
const StoryItem = ({item}) => {
    const [user,setUser]=useState(null)
    const{getUserById}=UserAPI()
    useEffect(() => {
        getUserById(item.user).then(res=>setUser(res))
      
    }, [item.user]);
    
    return (
            <div className='story-item'>
                <img className='story-item-avt' src={user&&user.profilePicture}/>
                <img className='story-item-img' style={{objectFit:"cover",width:"100%"}} src={item.url} />
                <span className='story-item-name' style={{wordBreak:"break-word"}}>{user&&user.username}</span>
            </div>
    );
}

export default StoryItem;
