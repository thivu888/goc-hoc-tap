import React, { useEffect, useRef,useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import './chat-box.css'
import { Socket } from 'socket.io-client';
import ChatItem from './chatItem';
const Index = ({setChatBoxShow,currentUser,userConnect,socket}) => {
	const scroll=useRef()
	const[mess,setMess]=useState([])
	const [contentMess,setContentMess]=useState('')
	const scrollToBottom = () => {
		scroll.current.scrollIntoView({ behavior: "smooth" })
	}
	useEffect(scrollToBottom,[mess.length,userConnect._id])
	const onHandleChangeInput=(e)=>{
		setContentMess(e.target.value)
	}

	useEffect(()=>{
		socket.emit('getdatamess',{name:currentUser.user_id+userConnect.user_id,listUser:[currentUser,userConnect]})
		socket.emit('send-notify-seen-server',{id:currentUser._id,room:(currentUser.user_id+userConnect.user_id)})
	},[currentUser.user_id+userConnect.user_id])

	useEffect(()=>{
		socket.on('server-send-data-mess',res=>{
			console.log(res)
			setMess([...res.content])
		})
	},[])
	useEffect(()=>{
		socket.on('sever-send-mess',data=>{
			setMess(mess=>[...mess,data])
		})
	},[])
	const sendMess=()=>{
		socket.emit('client-send-mess',{content:contentMess,
			userSend:currentUser._id,
			room:(currentUser.user_id+userConnect.user_id),
			toUser:userConnect._id,
			seen:false,
			createAt:new Date(Date.now()),
			mess_id:Math.random().toString(36).substring(2)+Math.random().toString(36).substring(2)+Math.random().toString(36).substring(2)+Math.random().toString(36).substring(2)+Math.random().toString(36).substring(2)
		})
		setContentMess('')
		socket.emit('send-notify-seen-server',{id:currentUser._id,room:(currentUser.user_id+userConnect.user_id)})
	}
	console.log(mess)
    return (
       <div className='chatboxWraper' style={{boxShadow:'0 4px 10px 0 rgb(0 0 0 / 20%), 0 4px 20px 0 rgb(0 0 0 / 19%)'}}>
			<div className='d-flex mt-2 ml-2 mr-2 p-1 align-items-center chatbox-header' style={{boxShadow:'0 2px rgba(0,0,0,0.1)'}}>
				<img style={{width:'36px',height:'36px',float:'left',borderRadius:'50%'}} src={userConnect&&userConnect.profilePicture} />
                  <div className='d-flex flex-column align-items-start justify-content-center '>
                      <span style={{color:'#050505',marginLeft:'8px',fontWeight:'600'}}>{userConnect&&userConnect.username}</span>
                  </div>
				 <div className='cursor-pointer' style={{position:'absolute',right:'10px',top:'-2px'}} onClick={()=>setChatBoxShow(false)}><CloseIcon/></div> 
            </div>
			<ul className='d-lex flex-column content-chat-box' style={{overflowY:'scroll',height:'75%'}} >
				
				{mess.length>0&&mess.map(item=><ChatItem key={Math.random()} user={userConnect} content={item}/>)}
		
				<div ref={scroll}/>
				
				
			</ul>
			<div className='d-flex mt-2 ml-2 mr-2 p-2 chatbox-footer align-items-center' style={{borderTop:'1px solid rgba(0,0,0,0.1)',height:'50px',boxShadow:'0 2px rgba(0,0,0,0.1)'}}>
                 <input onKeyPress={(e)=>{if(e.charCode==13){sendMess()}}} onChange={onHandleChangeInput} value={contentMess} className='p-1' style={{height:'100%',outline:'none',borderRadius:'24px',width:'90%',border:'none',backgroundColor:'#f0f2f5'}} placeholder='nhập tin nhắn ...'/>
				 <span style={{lineHeight:'32px'}}  className='icon-feel-cmt ic cursor-pointer ml-2'></span>	
			</div>
	   </div>
    );
}

export default Index;
