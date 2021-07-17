import React, { useEffect,useState } from 'react';
import './rightbar.css'
import ChatBox from '../chat-box'
import { useRecoilValue } from 'recoil';
import UserData, { listUser } from '../../configData/UserData';
import ListItemUser from './listItemUser';
import ListFriends from './ListFriends';
import Friends from '../../configData/Friends';
const Index = ({socket,setChatBoxShow,setUserConnect}) => {
    const userCurrent=useRecoilValue(UserData)
    const listuser=useRecoilValue(listUser)
    const friends=useRecoilValue(Friends)
    const [listfriends,setListFriends]=useState([])
    const [listusers,setlistusers]=useState([])
    useEffect(()=>{
        let list=[...listuser]
        console.log(friends);
        console.log(listuser);
        friends.forEach(item=>{
            list=list.filter(it=>it._id!=item.id)
        })
        console.log('rerender')
        setlistusers([...list])
    },[listuser.length,friends.length])

    return (
        <div className='rightbar col-xl-3 col-xxl-3 col-lg-3 d-flex flex-column align-items-start' style={{overflowX:'hidden'}}>
            <div className='ml-3' style={{width:'100%'}} >
                <span style={{fontWeight:'600',color:'#65676b'}}>Gợi ý kết bạn</span>
            </div>
            <ul className='mt-2 scroll-custom' style={{width:'100%',height:"300px",overflowY:'scroll',overflowX:'hidden'}}>
                {listusers&&listusers.length>0&&listusers.map((user)=><ListItemUser socket={socket} key={user._id} user={user} setChatBoxShow={setChatBoxShow} setUserConnect={setUserConnect} />)}
            </ul>
            <div className='ml-3' style={{width:'100%'}} >
                <span style={{fontWeight:'600',color:'#65676b'}}>Bạn Bè</span>
            </div>
            <ul className='mt-2 scroll-custom' style={{width:'100%',maxHeight:"500px",overflowY:'scroll',overflowX:'hidden'}}>
                {listuser&&listuser.length>0&&listuser.map((user)=><ListFriends socket={socket} key={user._id} user={user} setChatBoxShow={setChatBoxShow} setUserConnect={setUserConnect} />)}
            </ul>
        </div>
    );
}

export default Index;
