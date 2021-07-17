import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import ListRequestAddFriend from '../../configData/ListRequestAddFriend';
import ListRequestAddFriendSent from '../../configData/ListRequestAddFriendSent';
import UserData from '../../configData/UserData';

const ListItemUser = ({user,setChatBoxShow,setUserConnect,socket}) => {
    const userCurrent=useRecoilValue(UserData)
    const requestAddFriendSent=useRecoilValue(ListRequestAddFriendSent)
    const requestaddFriend=useRecoilValue(ListRequestAddFriend)
    const [sent,setSent]=useState(false)
    const requestAddFriend=()=>{
        socket.emit('client-send-request-addFriend',{userSendId:userCurrent.user._id,toUserId:user._id,createAt:new Date(Date.now()),})
    }
    const AcceptAddFriend=(type)=>{
        socket.emit('accept-friend',{userSendId:user._id,toUserId:userCurrent.user._id,createAt:new Date(Date.now()),type:type})
    }
    useEffect(()=>{
        setSent(requestAddFriendSent.some(item=>item.id==user._id))
    },[requestAddFriendSent.length,requestAddFriendSent])
    return (
        <li  style={{width:'100%'}} className='mt-2 d-flex' >
                <div style={{borderRadius:"8px"}} onClick={()=>{setChatBoxShow(true);setUserConnect(user)}} className='d-flex item-user cursor-pointer align-items-center' >
                    <div className={user.isOnline?'list-user-das align-items-center  list-user-das-rightbar d-flex list-user-das-rightbar-online':'list-user-das align-items-center  list-user-das-rightbar d-flex'}style={{cursor:'pointer',borderRadius:'12px',}}>
                        <img  style={{width:'40px',height:'40px',borderRadius:'50%'}} src={user.profilePicture}/>
                    </div>
                    <span style={{color:'#050505',marginLeft:'8px',fontWeight:'500'}}>{user.username}</span>
                </div>
                {requestaddFriend.some(item=>item.id==user._id)?
                <div className='d-flex align-items-center ml-4'>
                    <span className='d-inline-block mr-3 cursor-pointer ' style={{height:'40px',lineHeight:'40px',width:'60px',backgroundColor:'#e4e6eb',color:'#000',fontWeight:'500',borderRadius:"8px"}} onClick={()=>AcceptAddFriend(false)}>xóa</span>
                    <span className='d-inline-block cursor-pointer' style={{height:'40px',width:'90px',lineHeight:'40px',backgroundColor:'#2d88ff',color:'#fff',fontWeight:'500',borderRadius:"8px"}} onClick={()=>AcceptAddFriend(true)}>xác nhận</span>
                </div>:
                <div className='align-items-center d-flex justify-content-between ml-4 cursor-pointer' onClick={requestAddFriend}>
                   {sent?<span className='mr-3 d-flex'  style={{fontSize:'30px',backgroundColor:'#e7f3ff',color:'#1877f2'}}><i class='bx bxs-user-minus' ></i><p  style={{fontSize:'16px',margin:'0',color:'#1877f2',fontWeight:'500'}}>Hủy lời mời</p></span>:<span className='mr-3 d-flex align-items-center'  style={{fontSize:'30px',backgroundColor:'#e7f3ff',color:'#1877f2'}}><i class='bx bxs-user-plus' ></i><p  style={{fontSize:'16px',margin:'0',color:'#1877f2',fontWeight:'500'}}>Thêm bạn</p></span>} 
                </div>}
        </li>
    );
}

export default ListItemUser;
