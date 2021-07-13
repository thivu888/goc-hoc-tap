import React from 'react';
import './rightbar.css'
import ChatBox from '../chat-box'
import { useRecoilValue } from 'recoil';
import UserData, { listUser } from '../../configData/UserData';
import ListItemUser from './listItemUser';
const Index = ({socket,setChatBoxShow,setUserConnect}) => {
    const userCurrent=useRecoilValue(UserData)
    const listuser=useRecoilValue(listUser)
  
    return (
        <div className='rightbar col-xl-3 col-xxl-3 col-lg-3 d-flex flex-column align-items-start'>
            <div className='ml-3' style={{width:'100%'}} >
                <span style={{fontWeight:'600',color:'#65676b'}}>Người liên hệ</span>
            </div>
            <ul className='mt-2' style={{width:'100%'}}>
                {listuser&&listuser.length>0&&listuser.map((user)=><ListItemUser key={user._id} user={user} setChatBoxShow={setChatBoxShow} setUserConnect={setUserConnect} />)}
                
                
            </ul>
        </div>
    );
}

export default Index;
