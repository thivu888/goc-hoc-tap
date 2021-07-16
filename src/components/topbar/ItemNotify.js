import React, { useState,useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import UserAPI from '../../API/UserAPI';
import PostData from '../../configData/PostData';
import UserData from '../../configData/UserData';

const ItemNotify = ({item,socket}) => {
    const[userSend,setUserSend]=useState(null)
    const[userPost,setUserPost]=useState(null)
    const[post,setPost]=useState(null)
    const posts=useRecoilValue(PostData)
    const {getUserById}=UserAPI()
    const history=useHistory()
    const userCurrent=useRecoilValue(UserData)
    useEffect(async() => {
        const uSend=await getUserById(item.userId)
        setUserSend(uSend)
        const uPost=await getUserById(item.userPostId)
        setUserPost(uPost)
       const post= posts.find(it=>it.postId==item.idpost)
       setPost(post)
    }, [item.userId,item.userPostId,item.type,item.idpost]);
    return (
        <li onClick={()=>{if(userSend&&userPost){
            socket.emit('client-send-seen-notify',{...item,userCurrent:userCurrent.user._id})
            history.push(`/posts/views/${post&&post._id}`)}
            }}>
        <div className={!item.isRead?'d-flex m-2 p-1 fasjg':'d-flex m-2 p-1'}>
        <img style={{width:'60px',height:'60px',float:'left',borderRadius:'50%'}} src={userSend&&userSend.profilePicture} />
        <div className='d-flex flex-column align-items-start justify-content-center '>
            <span style={{color:'#050505',marginLeft:'8px',fontWeight:'600',wordBreak:'break-word',textAlign:'start'}}>{`${userSend&&userSend.username} cũng đã ${item.type} về bài biết của ${userPost&&userPost.username}`}</span>
        </div>
        </div>
    </li>
    );
}

export default ItemNotify;
