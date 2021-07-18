import React from 'react';
import { useRecoilValue } from 'recoil';
import UserData from '../../configData/UserData';

const ItemAddFriend = ({user,socket}) => {
    const userCurrent=useRecoilValue(UserData)
  
    const AcceptAddFriend=(type)=>{
        socket.emit('accept-friend',{userSendId:user._id,toUserId:userCurrent.user._id,createAt:new Date(Date.now()),type:type})
    }
    return (
    <li  style={{width:'100%'}} className='mt-2 p-4 d-flex justify-content-between' >
        <div style={{borderRadius:"8px"}} className='d-flex item-user cursor-pointer align-items-center' >
            <div className={user.isOnline?'list-user-das align-items-center  list-user-das-rightbar d-flex list-user-das-rightbar-online':'list-user-das align-items-center  list-user-das-rightbar d-flex'}style={{cursor:'pointer',borderRadius:'12px',}}>
                <img  style={{width:'40px',height:'40px',borderRadius:'50%'}} src={user.profilePicture}/>
            </div>
            <span style={{color:'#050505',marginLeft:'8px',fontWeight:'500'}}>{user.username}</span>
        </div>
        <div className='d-flex align-items-center ml-4'>
            <span className='d-inline-block mr-3 cursor-pointer ' style={{height:'40px',lineHeight:'40px',width:'60px',backgroundColor:'#e4e6eb',color:'#000',fontWeight:'500',borderRadius:"8px"}} onClick={()=>AcceptAddFriend(false)}>xóa</span>
            <span className='d-inline-block cursor-pointer' style={{height:'40px',width:'90px',lineHeight:'40px',backgroundColor:'#2d88ff',color:'#fff',fontWeight:'500',borderRadius:"8px"}} onClick={()=>AcceptAddFriend(true)}>xác nhận</span>
        </div>
    </li>
    );
}

export default ItemAddFriend;
