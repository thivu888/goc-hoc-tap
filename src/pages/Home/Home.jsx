import React, { useEffect, useRef,useState } from 'react';
import Feed from '../../components/feed/feed';
import Sidebar from '../../components/sidebar';
import io from 'socket.io-client'
import Rightbar from '../../components/rightbar';
import ChatBox from '../../components/chat-box'
import './Home.css'
import { useRecoilState, useRecoilValue } from 'recoil';
import audioNotifyMess from '../../assets/audio/lvSDckxyoU5.ogg'
import {listMessUser,listUser} from '../../configData/UserData'
import UserData from '../../configData/UserData';
const serverIO='http://localhost:5000'

const Home = ({setoverlay,setUserConnect,setChatBoxShow,chatBoxShow,userConnect,socket,setShowAlertCreated,setShowAlert}) => {
    // const audioRef=useRef()
    // const [listmessUser,setlistMessUser]=useRecoilState(listMessUser)
    // const [listuser,setListUser]=useRecoilState(listUser)
    // const user=useRecoilValue(UserData)
    // const socket=useRef()
    // useEffect(()=>{
    //     socket.current=io(serverIO)

    //     socket.current.emit('joinpages',user.user._id)
    //     socket.current.emit('getlistuser',user.user._id);
    //     socket.current.emit('getlistMess',user.user._id);
    //       socket.current.on('ListUser',list=>{
    //           const newlist=list.filter((item)=>{
    //               return item._id!=user.user._id
    //           })
    //           setListUser(newlist)
    //       });
        
    //       socket.current.on('sever-send-list-mess',data=>{
             
    //           setlistMessUser([...data])
    //       })
      
    //       socket.current.on('send-notify-seen-client',data=>{
    //           if(data&&data.length>0){
    //           setlistMessUser([...data])
                  
    //           }
    //       })
          
    //     },[])

    //     useEffect(()=>{
    //         socket.current.on('server-send-notify-comment',data=>{
    //             audioRef.current.play()
    //         },[]);
    //          socket.current.on('sever-send-notify-mess',data=>{
    //             audioRef.current.play();
    //             setlistMessUser([...data])
    //         })
    //        },[])
  
    return (<>
            <div className="container-fluid">
                 <div className='row'>
                    <Sidebar/>
                    <Feed setShowAlertCreated={setShowAlertCreated} setShowAlert={setShowAlert} setoverlay={setoverlay} socket={socket}/>
                    <Rightbar setChatBoxShow={setChatBoxShow}  setUserConnect={setUserConnect} socket={socket}/>
                </div>
            </div>
      
        
        {/* {chatBoxShow?<ChatBox currentUser={user.user} socket={socket.current} setChatBoxShow={setChatBoxShow} userConnect={userConnect}/>:null} */}
        {/* <audio className='hidden-element' controls preload="none" ref={audioRef}>
            <source src={audioNotifyMess} type="audio/ogg"/>
        </audio> */}
    </>);
}

export default Home;
