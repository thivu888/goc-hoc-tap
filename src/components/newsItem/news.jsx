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
import GIF from '../IconGIf'
import PostAPI from '../../API/PostAPI';
import like from '../../assets/svg/like.svg'
import love from '../../assets/svg/love.svg'
import sad from '../../assets/svg/sad.svg'
import angry from '../../assets/svg/angry.svg'
import wow from '../../assets/svg/wow.svg'
import haha from '../../assets/svg/haha.svg'
import URLSV from '../../constants'
const serverIO=URLSV
const News = ({item,media,view}) => {
    console.log(item)
    const socket=useRef();
    const [userPost,setUserPost]=useState({})
    const [isLiked, setIsLiked] = useState({
        status:false,
        type:''
    });
    const[displayListGifFeel,setdisplayListGifFeel]=useState(false)
    const [post,setPost]=useState(item)
    const user =useRecoilValue(UserData)
    const {user:currentUser}={...user}
    const[btndelete,setBtnDelete]=useState(false)
    const [comments,setcomments]=useState(item.comments)
    const{deletePost}=PostAPI()
    const videoref=useRef()
    const history=useHistory()
    const getUser=async()=>{
        await axios.get(`${URLSV}/api/user/getuserbyid/${item.userId}`).then(res=>
         {
             setUserPost(res.data.user)
         }).catch(err=>console.log(err))
     }
     useEffect(()=>{
        socket.current=io(serverIO)
     },[post._id])

     useEffect(() => {
         if(currentUser){
       const itemLike= post.likes.find(item=>item.idlike==currentUser._id)
        if(itemLike){
            setIsLiked({status:true,type:itemLike.type})
        }else{
            setIsLiked({status:false,type:''})
        }
    }
    }, [currentUser&&currentUser._id, post.likes.length,post]);

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
  

    const likePost=async(type)=>{
        socket.current.emit('likePost',{userId:currentUser._id,postId:post._id,type:type})
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
                            {post.likes.some(item=>item.type==''||item.type=='LIKE')&&
                            <span className='cursor-pointer'>
                                <img style={{width:'18px',height:'18px'}} src={like}/>
                            </span>
                            }
                            {post.likes.some(item=>item.type=='LOVE')&&
                            <span className='cursor-pointer'>
                                <img style={{width:'18px',height:'18px'}} src={love}/>
                            </span>
                            }               
                            {post.likes.some(item=>item.type=='HAHA')&&
                            <span className='cursor-pointer'>
                                <img style={{width:'18px',height:'18px'}} src={haha}/>
                            </span>
                            } {post.likes.some(item=>item.type=='WOW')&&
                            <span className='cursor-pointer'>
                                <img style={{width:'18px',height:'18px'}} src={wow}/>
                            </span>
                            } {post.likes.some(item=>item.type=='SAD')&&
                            <span className='cursor-pointer'>
                                <img style={{width:'18px',height:'18px'}} src={sad}/>
                            </span>
                            } {post.likes.some(item=>item.type=='ANGRY')&&
                            <span className='cursor-pointer'>
                                <img style={{width:'18px',height:'18px'}} src={angry}/>
                            </span>
                            } 
                            <span className='ml-2 mt-1 onhover-text-decoration ' style={{fontSize:'.9375rem',color:'#656783'}}>{post.likes.length>0&&post.likes.length}</span>
                        </span>
                        <span className='d-flex align-items-center pt-1 ' style={{flex:'1',display:'inline-block',height:'42px'}}>
                            <span className='onhover-text-decoration'  style={{lineHeight:'18px',cursor:'pointer',fontSize:'.9375rem',color:'#656783'}} onClick={()=>setdisplaycmt(true)}>{`${post.comments.length>0?post.comments.length:''} Bình luận`}</span>
                            {/* <span  className='ml-2 onhover-text-decoration' style={{lineHeight:'18px',cursor:'pointer',fontSize:'.9375rem',color:'#656783'}}>127 lượt chia sẻ </span> */}
                        </span>
                    </div>
                </div>
                <div className='d-flex align-items-center ' style={{height:'40px',borderBottom:'1px solid #e4e6eb'}}>
                    <div onMouseLeave={()=>setdisplayListGifFeel(false)} onMouseOver={()=>setdisplayListGifFeel(true)} onMouseMove={()=>setdisplayListGifFeel(true)} className="qwewqe-12 hover-nut-like d-flex justify-content-center align-items-center" style={{color:'#606770',flex:'1',position:'relative'}} onClick={()=>likePost('')}>
                    {isLiked.status&&isLiked.type==''||isLiked.type=='LIKE'
                        ?<>
                        <span style={{lineHeight:'100%'}}><i className='icon-like ic liked'></i></span>
                        <span style={{lineHeight:'100%'}} className='text-liked'>Thích</span>
                        </>
                        :null
                    }
                    {
                    !isLiked.status&& 
                        <>
                        <span style={{lineHeight:'100%'}}><i className='icon-like ic'></i></span>
                        <span style={{lineHeight:'100%'}}>Thích</span>
                        </>
                    }
                    {isLiked.status&&isLiked.type=='HAHA'
                        ?<>
                        <span className='cursor-pointer'>
                                <img style={{width:'18px',height:'18px'}} src={haha}/>
                        </span>
                        <span className='ml-1' style={{lineHeight:'100%',color:'rgb(247, 177, 37)',fontWeight:"600"}} >Haha</span>
                        </>
                        :null
                        
                    }
                    {isLiked.status&&isLiked.type=='LOVE'
                        ?<>
                        <span className='cursor-pointer'>
                                <img style={{width:'18px',height:'18px'}} src={love}/>
                        </span>
                        <span className='ml-1' style={{lineHeight:'100%',color:'rgb(245 62 88)',fontWeight:"600"}} >Yêu thích</span>
                        </>
                        :null
                        
                    }
                    {isLiked.status&&isLiked.type=='WOW'
                        ?<>
                        <span className='cursor-pointer'>
                                <img alt="Wow" class="" height="18" src={wow} width="18"/>
                        </span>
                        <span className='ml-1' style={{lineHeight:'100%',color:'rgb(247, 177, 37)',fontWeight:"600"}} >Wow</span>
                        </>
                        :null
                        
                    }
                    {isLiked.status&&isLiked.type=='SAD'
                        ?<>
                        <span className='cursor-pointer'>
                            <img alt="Buồn" class="" height="18" src={sad} width="18"/>
                        </span>
                        <span className='ml-1' style={{lineHeight:'100%',color:'rgb(247, 177, 37)',fontWeight:"600"}} >Buồn</span>
                        </>
                        :null
                        
                    }
                    {isLiked.status&&isLiked.type=='ANGRY'
                        ?<>
                        <span className='cursor-pointer'>
                                <img alt="Phẫn nộ" class="" height="18" src={angry} width="18"/>
                        </span>
                        <span className='ml-1' style={{lineHeight:'100%',color:'#ea7826',fontWeight:"600"}} >Phẫn nộ</span>
                        </>
                        :null
                        
                    }
                        <div style={{position:'absolute'}}><GIF likePost={likePost} displayListGifFeel={displayListGifFeel} setdisplayListGifFeel={setdisplayListGifFeel} socket={socket.current}/></div>

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
