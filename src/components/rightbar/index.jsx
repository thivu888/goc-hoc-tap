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
        let listfr=[]
      
        friends.forEach(item=>{
            list=list.filter(it=>it._id!=item.id)
        })
        friends.forEach(item=>{
           const u= listuser.find(it=>it._id==item.id)
           if(u){
            listfr.push(u)
           }
        })
        setListFriends([...listfr])
        setlistusers([...list])
    },[listuser.length,friends.length,listuser,friends])
    console.log(listfriends)
    return (
        <div className='rightbar col-xl-3 col-xxl-3 col-lg-2 col-sm-2 col-md-2  d-flex flex-column  align-items-start' style={{overflowX:'hidden'}}>
            <div className='ml-3 d-flex' style={{width:'100%'}} >
                <span style={{fontWeight:'600',color:'#65676b'}}>Gợi ý kết bạn</span>
            </div>
            <ul className='mt-2 scroll-custom' style={{width:'100%',height:"300px",overflowY:'scroll',overflowX:'hidden'}}>
                {listusers&&listusers.length>0&&listusers.map((user)=><ListItemUser socket={socket} key={user._id} user={user} setChatBoxShow={setChatBoxShow} setUserConnect={setUserConnect} />)}
            </ul>
            <div className='ml-3 d-flex' style={{width:'100%'}} >
                <span style={{fontWeight:'600',color:'#65676b'}}>Bạn Bè</span>
            </div>
            <ul className='mt-2 scroll-custom' style={{width:'100%',maxHeight:"500px",overflowY:'scroll',overflowX:'hidden'}}>
                {listfriends&&listfriends.length>0&&listfriends.map((user)=><ListFriends socket={socket} key={user._id} user={user} setChatBoxShow={setChatBoxShow} setUserConnect={setUserConnect} />)}
            </ul>
        </div>
    );
}

export default Index;
