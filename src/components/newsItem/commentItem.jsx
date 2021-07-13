import React, { useEffect } from 'react';
import { useState } from 'react';
import CommentItemRep from './comnentItemRep';
import InputComment from './inputComment';
import { format } from 'timeago.js';
import { useRecoilValue } from 'recoil';
import UserData from '../../configData/UserData'
import UserAPI from '../../API/UserAPI';
const CommentItem = ({imgsize,socket,comment,post}) => {
    const {getUserById}=UserAPI()
    const [dot,setDot] =useState(false)
    const [inputcmt,setinputcmt] =useState(false)
    const [coms,setComment]=useState(null)
    const user=useRecoilValue(UserData)
    const {user:currentUser}={...user}
    const [commentor,setCommentor]=useState(null)
    const display_dot_dot_dot =()=>{
        setDot(true)
    }
    const hidden_dot_dot_dot =()=>{
        setDot(false)
    }
    useEffect(()=>{
    setComment(comment)
    },[])
    useEffect(()=>{
        getUserById(comment.userId).then(res=>{
            setCommentor(res)
        })
    },[comment.userId])
    return (
        <div className='d-flex align-items-center mt-3 mb-3' style={{cursor:'pointer'}}>
            <div className='d-flex' onMouseOver={display_dot_dot_dot} onMouseLeave={hidden_dot_dot_dot}>
                <div className='dot-afas'>
                <img  style={{width:imgsize||'32px',height:imgsize||'32px',borderRadius:'50%'}} src={commentor&&commentor.profilePicture}/>
                </div>
                <div className='d-flex flex-column' style={{maxWidth:'90%'}}>
                    <div className='d-flex flex-column p-1 pl-2 pr-2' style={{maxWidth:'100%',marginLeft:'16px',borderRadius:'16px',backgroundColor:'#f0f2f5'}}>
                            <span className='onhover-text-decoration'  style={{color:'#050505',fontWeight:'500',fontSize:'14px',textAlign:'start'}}>{commentor&&commentor.username}</span>
                            <div style={{textAlign:'start',wordBreak:'break-word',wordWrap:'break-word'}}>{comment.content}</div> 
                    </div>
                    {/* {<div className='ml-4 mt-1' style={{maxWidth:'200px',maxHeight:'300px',borderRadius:'12px'}}>
                        <img style={{width:'100%',height:'100%',objectFit:'contain',borderRadius:'12px',display:'inline-block'}} src='https://scontent.fhph1-2.fna.fbcdn.net/v/t1.6435-0/p160x160/205588165_4009586245824898_306708298371217003_n.jpg?_nc_cat=105&ccb=1-3&_nc_sid=dbeb18&_nc_ohc=S6gfV_ncZGIAX8X0aBu&tn=zIQVpULslmKPxnQ9&_nc_ht=scontent.fhph1-2.fna&tp=6&oh=6e5241857f1f79adc5d27c95d74ead85&oe=60E43879'></img>
                    </div>} */}
                    <div className='d-flex ml-4'>
                        <span className='ml-2 mr-2 onhover-text-decoration' style={{fontWeight:'bold',color:'#65676b',fontSize:'12px'}} >Thích</span>
                        <span className='mr-2 onhover-text-decoration' style={{fontWeight:'bold',color:'#65676b',fontSize:'12px'}} onClick={()=>setinputcmt(true)}>Trả lời</span>
                        <span className='onhover-text-decoration' style={{color:'#65676b',fontSize:'12px'}}>{format(comment.createAt)}</span>
                    </div>
                    <div className='ml-4' >
                    {comment.repcomment.length>0? comment.repcomment.map(commentrep=><CommentItemRep commentrep={commentrep} imgsize={24} setinputcmt={setinputcmt}/>) :null}
                        <div className={!inputcmt?'hidden-element':''}>
                        <InputComment socket={socket} post={post} rep={true} currentUser={currentUser} comment_Id={comment.comment_Id} imgsize={24}/>
                        </div>
                    </div>
                </div>
                <div className={!dot&&'hidden-element'} style={{flex:'1',width:'40px',height:'40px',textAlign:'center',cursor:'pointer'}}>
                        <i class='bx bx-dots-horizontal-rounded bx-rotate-180' style={{color:'#5b626a',marginTop:'10px'}}></i>
                </div>
            </div>
        </div>
    );
}

export default CommentItem;
