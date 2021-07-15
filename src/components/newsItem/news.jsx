import React, { useRef } from 'react';
import { format } from 'timeago.js';
import Inputcmt from './inputComment';
import CommentItem from './commentItem';
import './new.css'
import { useState ,useEffect} from 'react';
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom'
import { useRecoilValue } from 'recoil';
import UserData from '../../configData/UserData';
import io from 'socket.io-client'
import { Viewport } from 'react-is-in-viewport';
import PostAPI from '../../API/PostAPI';
const serverIO='http://localhost:5000'
const News = ({item,media,view}) => {
    const socket=useRef();
    const [userPost,setUserPost]=useState({})
    const [isLiked, setIsLiked] = useState(false);
    const [post,setPost]=useState(item)
    const user =useRecoilValue(UserData)
    const {user:currentUser}={...user}
    const[btndelete,setBtnDelete]=useState(false)
    const [comments,setcomments]=useState(item.comments)
    const{deletePost}=PostAPI()
    const videoref=useRef()
    const history=useHistory()
    const getUser=async()=>{
        await axios.get(`/api/user/getuserbyid/${item.userId}`).then(res=>
         {
             setUserPost(res.data.user)
         }).catch(err=>console.log(err))
     }
     useEffect(()=>{
        socket.current=io(serverIO)
     },[post._id])
    //  useEffect(() => {
    //     setIsLiked(post.likes.includes(currentUser._id));
    // }, [currentUser._id, post.likes.length,post]);

    useEffect(() => {
        getUser()
    }, []);
    const setbuttondelete=()=>{
        if(post.userId===currentUser._id){
            setBtnDelete(!btndelete)
        }
    }
    
   

    useEffect(()=>{
        socket.current.on('server-send-comment',data=>{
          console.log(data)
          setPost({...data.newpost})
            setcomments([...data.newpost.comments])

        })

        socket.current.on('dataRoomCurrent',post=>{
            setPost(post)
        })

        socket.current.on('getlistliked',data=>{
            setPost({...data.newpost})
        })
    },[])
  

    const likePost=async()=>{
        socket.current.emit('likePost',{userId:currentUser._id,postId:post._id})
    }
    
    const joinRoomPost=()=>{
      if(socket.current)  socket.current.emit('joinRomPost',{name:post.postId,id:currentUser._id})
    }
    

   
    const [displaycmt,setdisplaycmt]=useState(false)
    return (
       
        
        <div className='container item-wraper' style={{border:'1px solid #e4e6eb' }} onMouseOver={joinRoomPost}>
       {/* <Viewport
            onEnter={()=>{console.log('inview');joinRoomPost();if(videoref.current)videoref.current.play()}}
            onLeave={()=>{console.log('outview');joinRoomPost();if(videoref.current)videoref.current.pause()}}> */}
            <div className='item' >
                <div className='item-header d-flex pt-3 mb-2'>
                <Link to={`profile/${userPost._id}`} className='d-inline-block'><img style={{flex:'0',cursor:'pointer',width:'48px',height:'48px',borderRadius:'50%',border:'1px solid rgba(96,98,102,0.3)'}} src={userPost.profilePicture}/></Link>
                    <div className='d-flex flex-column align-items-start ml-2' style={{flex:'10'}}>
                    <Link to={`profile/${userPost._id}`} className='d-inline-block'> <strong><span className='onhover-text-decoration' style={{fontWeight:'600',color:'#050505',cursor:'pointer',fontSize:'18px'}}>{userPost.username}</span></strong></Link>
                        <div>
                            <span style={{cursor:'pointer',userSelect:'none',fontWeight:'400',color:'#65676b',fontSize:' .8125rem'}}>{format(item&&item.createdAt)}</span>
                            <span style={{color:'#65676b'}} aria-hidden="true"> · </span>
                            <span class="ormqv51v "><i className='icon-public ic'></i></span>
                        </div>
                    </div>
                    <div style={{flex:'1',width:'40px',height:'40px',borderRadius:'50%',backgroundColor:'#f2f2f2',textAlign:'center',cursor:'pointer'}} onClick={setbuttondelete}>
                        <i class='bx bx-dots-horizontal-rounded bx-rotate-180' style={{color:'#5b626a',marginTop:'10px'}}></i>
                    </div>
                    {btndelete? <ul style={{position:'relative'}}>
                        <li style={{cursor:'pointer',position:'absolute',top:'44px0',color:'red',backgroundColor:'#f2f2f2',width:'50px',height:'25px',borderRadius:'4px',display:'block'}} onClick={()=>deletePost({img_public_id:post.img_public_id,video_public_id:post.video_public_id,id:post._id})}>Xóa</li>
                    </ul>:null}
                </div>
                <div className='content' style={{borderBottom:'1px solid #e4e6eb',textAlign:'start',color: '#050505',wordBreak:'break-word',wordWrap:'break-word',fontSize:'0.9375rem'}}>
                   {item&&item.content}
                </div>
                
                {item&&item.img&&media?<div className='content-img mt-' style={{width:'100%'}}>
                    <img style={{cursor:'pointer',objectFit:'cover',width:'100%',display:'inline-block',height:'100%'}}  src={item&&item.img} alt="" onClick={()=>history.push(`/posts/views/${item._id}`)} />
                </div>:null}
                {item&&item.video&&media?
                                <div style={{borderTop:'1px solid #e4e6eb',cursor:'pointer'}}>
                                        <video ref={videoref} style={{width:'100%'}} controls autoPlay={false}  onClick={()=>{videoref.current.muted=true;history.push(`/posts/video/${item._id}`)}}>
                                            <source src={item&&item.video} type="video/mp4"/>
                                        </video>
                                </div>
                    :null}
                <div style={{width:'100%',borderTop:'1px solid #e4e6eb'}}></div>
                <div style={{height:'42px',borderBottom:'1px solid #e4e6eb'}}>
                    <div className='icon-cam-xuc d-flex align-items-center ' >
                        <span className='d-flex align-items-center p-2' style={{display:'inline-block',flex:'1'}}>
                            <span className='cursor-pointer'>
                                <img style={{width:'18px',height:'18px'}} src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 16 16'%3e%3cdefs%3e%3clinearGradient id='a' x1='50%25' x2='50%25' y1='0%25' y2='100%25'%3e%3cstop offset='0%25' stop-color='%2318AFFF'/%3e%3cstop offset='100%25' stop-color='%230062DF'/%3e%3c/linearGradient%3e%3cfilter id='c' width='118.8%25' height='118.8%25' x='-9.4%25' y='-9.4%25' filterUnits='objectBoundingBox'%3e%3cfeGaussianBlur in='SourceAlpha' result='shadowBlurInner1' stdDeviation='1'/%3e%3cfeOffset dy='-1' in='shadowBlurInner1' result='shadowOffsetInner1'/%3e%3cfeComposite in='shadowOffsetInner1' in2='SourceAlpha' k2='-1' k3='1' operator='arithmetic' result='shadowInnerInner1'/%3e%3cfeColorMatrix in='shadowInnerInner1' values='0 0 0 0 0 0 0 0 0 0.299356041 0 0 0 0 0.681187726 0 0 0 0.3495684 0'/%3e%3c/filter%3e%3cpath id='b' d='M8 0a8 8 0 00-8 8 8 8 0 1016 0 8 8 0 00-8-8z'/%3e%3c/defs%3e%3cg fill='none'%3e%3cuse fill='url(%23a)' xlink:href='%23b'/%3e%3cuse fill='black' filter='url(%23c)' xlink:href='%23b'/%3e%3cpath fill='white' d='M12.162 7.338c.176.123.338.245.338.674 0 .43-.229.604-.474.725a.73.73 0 01.089.546c-.077.344-.392.611-.672.69.121.194.159.385.015.62-.185.295-.346.407-1.058.407H7.5c-.988 0-1.5-.546-1.5-1V7.665c0-1.23 1.467-2.275 1.467-3.13L7.361 3.47c-.005-.065.008-.224.058-.27.08-.079.301-.2.635-.2.218 0 .363.041.534.123.581.277.732.978.732 1.542 0 .271-.414 1.083-.47 1.364 0 0 .867-.192 1.879-.199 1.061-.006 1.749.19 1.749.842 0 .261-.219.523-.316.666zM3.6 7h.8a.6.6 0 01.6.6v3.8a.6.6 0 01-.6.6h-.8a.6.6 0 01-.6-.6V7.6a.6.6 0 01.6-.6z'/%3e%3c/g%3e%3c/svg%3e"/>
                            </span>
                            <span className='cursor-pointer'>
                                <img style={{width:'18px',height:'18px'}} src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 16 16'%3e%3cdefs%3e%3clinearGradient id='a' x1='50%25' x2='50%25' y1='10.25%25' y2='100%25'%3e%3cstop offset='0%25' stop-color='%23FEEA70'/%3e%3cstop offset='100%25' stop-color='%23F69B30'/%3e%3c/linearGradient%3e%3clinearGradient id='d' x1='50%25' x2='50%25' y1='0%25' y2='100%25'%3e%3cstop offset='0%25' stop-color='%23472315'/%3e%3cstop offset='100%25' stop-color='%238B3A0E'/%3e%3c/linearGradient%3e%3clinearGradient id='e' x1='50%25' x2='50%25' y1='0%25' y2='81.902%25'%3e%3cstop offset='0%25' stop-color='%23FC607C'/%3e%3cstop offset='100%25' stop-color='%23D91F3A'/%3e%3c/linearGradient%3e%3cfilter id='c' width='118.8%25' height='118.8%25' x='-9.4%25' y='-9.4%25' filterUnits='objectBoundingBox'%3e%3cfeGaussianBlur in='SourceAlpha' result='shadowBlurInner1' stdDeviation='1'/%3e%3cfeOffset dy='-1' in='shadowBlurInner1' result='shadowOffsetInner1'/%3e%3cfeComposite in='shadowOffsetInner1' in2='SourceAlpha' k2='-1' k3='1' operator='arithmetic' result='shadowInnerInner1'/%3e%3cfeColorMatrix in='shadowInnerInner1' values='0 0 0 0 0.921365489 0 0 0 0 0.460682745 0 0 0 0 0 0 0 0 0.35 0'/%3e%3c/filter%3e%3cpath id='b' d='M16 8A8 8 0 110 8a8 8 0 0116 0'/%3e%3c/defs%3e%3cg fill='none'%3e%3cuse fill='url(%23a)' xlink:href='%23b'/%3e%3cuse fill='black' filter='url(%23c)' xlink:href='%23b'/%3e%3cpath fill='url(%23d)' d='M3 8.008C3 10.023 4.006 14 8 14c3.993 0 5-3.977 5-5.992C13 7.849 11.39 7 8 7c-3.39 0-5 .849-5 1.008'/%3e%3cpath fill='url(%23e)' d='M4.541 12.5c.804.995 1.907 1.5 3.469 1.5 1.563 0 2.655-.505 3.459-1.5-.551-.588-1.599-1.5-3.459-1.5s-2.917.912-3.469 1.5'/%3e%3cpath fill='%232A3755' d='M6.213 4.144c.263.188.502.455.41.788-.071.254-.194.369-.422.371-.78.011-1.708.255-2.506.612-.065.029-.197.088-.332.085-.124-.003-.251-.058-.327-.237-.067-.157-.073-.388.276-.598.545-.33 1.257-.48 1.909-.604a7.077 7.077 0 00-1.315-.768c-.427-.194-.38-.457-.323-.6.127-.317.609-.196 1.078.026a9 9 0 011.552.925zm3.577 0a8.953 8.953 0 011.55-.925c.47-.222.95-.343 1.078-.026.057.143.104.406-.323.6a7.029 7.029 0 00-1.313.768c.65.123 1.363.274 1.907.604.349.21.342.44.276.598-.077.18-.203.234-.327.237-.135.003-.267-.056-.332-.085-.797-.357-1.725-.6-2.504-.612-.228-.002-.351-.117-.422-.37-.091-.333.147-.6.41-.788z'/%3e%3c/g%3e%3c/svg%3e"/>
                            </span>
                            <span className='cursor-pointer'>
                                <img style={{width:'18px',height:'18px'}} src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 16 16'%3e%3cdefs%3e%3clinearGradient id='a' x1='50%25' x2='50%25' y1='0%25' y2='100%25'%3e%3cstop offset='0%25' stop-color='%23FF6680'/%3e%3cstop offset='100%25' stop-color='%23E61739'/%3e%3c/linearGradient%3e%3cfilter id='c' width='118.8%25' height='118.8%25' x='-9.4%25' y='-9.4%25' filterUnits='objectBoundingBox'%3e%3cfeGaussianBlur in='SourceAlpha' result='shadowBlurInner1' stdDeviation='1'/%3e%3cfeOffset dy='-1' in='shadowBlurInner1' result='shadowOffsetInner1'/%3e%3cfeComposite in='shadowOffsetInner1' in2='SourceAlpha' k2='-1' k3='1' operator='arithmetic' result='shadowInnerInner1'/%3e%3cfeColorMatrix in='shadowInnerInner1' values='0 0 0 0 0.710144928 0 0 0 0 0 0 0 0 0 0.117780134 0 0 0 0.349786932 0'/%3e%3c/filter%3e%3cpath id='b' d='M8 0a8 8 0 100 16A8 8 0 008 0z'/%3e%3c/defs%3e%3cg fill='none'%3e%3cuse fill='url(%23a)' xlink:href='%23b'/%3e%3cuse fill='black' filter='url(%23c)' xlink:href='%23b'/%3e%3cpath fill='white' d='M10.473 4C8.275 4 8 5.824 8 5.824S7.726 4 5.528 4c-2.114 0-2.73 2.222-2.472 3.41C3.736 10.55 8 12.75 8 12.75s4.265-2.2 4.945-5.34c.257-1.188-.36-3.41-2.472-3.41'/%3e%3c/g%3e%3c/svg%3e"/>
                            </span>
                            <span className='ml-2 mt-1 onhover-text-decoration ' style={{fontSize:'.9375rem',color:'#656783'}}>{post.likes.length}</span>
                        </span>
                        <span className='d-flex align-items-center pt-1 ' style={{flex:'1',display:'inline-block',height:'42px'}}>
                            <span className='onhover-text-decoration'  style={{lineHeight:'18px',cursor:'pointer',fontSize:'.9375rem',color:'#656783'}}>{`${post.comments.length} bình luận`}</span>
                            <span  className='ml-2 onhover-text-decoration' style={{lineHeight:'18px',cursor:'pointer',fontSize:'.9375rem',color:'#656783'}}>127 lượt chia sẻ </span>
                        </span>
                    </div>
                </div>
                <div className='d-flex align-items-center ' style={{height:'40px',borderBottom:'1px solid #e4e6eb'}}>
                    <div className="qwewqe-12 d-flex justify-content-center align-items-center" style={{color:'#606770',flex:'1',}} onClick={likePost}>
                    {currentUser?<><span style={{lineHeight:'100%'}}><i className={!post.likes.includes(currentUser._id)?'icon-like ic':'icon-like ic liked'}></i></span>
                        <span style={{lineHeight:'100%'}} className={post.likes.includes(currentUser._id)?'text-liked':''}>Thích</span></>:null}
                    </div>
                    <div onClick={()=>setdisplaycmt(true)} className=" qwewqe-12 d-flex justify-content-center align-items-center" style={{color:'#606770',flex:'1'}}>
                        <span style={{lineHeight:'100%'}}><i className='icon-comment ic'></i></span>
                        <span style={{lineHeight:'100%'}}>Bình luận</span>
                    </div>
                    <div className=" qwewqe-12 d-flex justify-content-center align-items-center" style={{color:'#606770',flex:'1'}}>
                        <span style={{lineHeight:'100%'}}><i className='icon-share ic'></i></span>
                        <span style={{lineHeight:'100%'}}>Chia sẻ</span>
                    </div>
                </div>
                <div className={!displaycmt&&'hidden-element'} >
                    {comments.length&&comments.map(comment=><CommentItem socket={socket.current} post={post} setdisplaycmt={setdisplaycmt}   comment={comment}/>)}
                   
                </div>
                
                <Inputcmt currentUser={currentUser} socket={socket.current} setdisplaycmt={setdisplaycmt} post={post}/>
            </div>
        {/* </Viewport> */}

        </div>
    );
}

export default News;
