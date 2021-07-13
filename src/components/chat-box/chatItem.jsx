import React from 'react';
import { useRecoilValue } from 'recoil';
import UserData from '../../configData/UserData';

const ChatItem = ({user,content}) => {
    const currentUser=useRecoilValue(UserData)
    return (
    <li className={content.userSend===currentUser.user._id?'item-mess me':'item-mess'} style={{width:'100%'}}>
        <div className='d-flex m-2 p-1'>
            <img  style={{width:'32px',height:'32px',float:'left',borderRadius:'50%'}} src={user.profilePicture} />
            <span className='p-3 d-block' style={{maxWidth:'80%',textAlign:'start',wordBreak:'break-word',fontSize:'.9375rem',lineHeight:'1.333',color:'#050505',marginLeft:'8px',fontWeight:'400',backgroundColor:'#e4e6eb',borderRadius:"32px"}}>{content.content}</span>
        </div>
    </li>
    );
}

export default ChatItem;
