import React from 'react';
import { useState,useEffect } from 'react';
import { format } from 'timeago.js';
import InputComment from './inputComment';
import UserAPI from '../../API/UserAPI';

const CommentItemRep = ({imgsize,setinputcmt,commentrep}) => {
    const [dot,setDot] =useState(false)
    const [commentor,setCommentor]=useState(null)
    const {getUserById}=UserAPI()

    const display_dot_dot_dot =()=>{
        setDot(true)
    }
    const hidden_dot_dot_dot =()=>{
        setDot(false)
    }
    useEffect(()=>{
        getUserById(commentrep.userId).then(res=>{
            setCommentor(res)
        })
    },[commentrep.userId])
    return (
        <div className='d-flex align-items-center mt-3 mb-3' style={{cursor:'pointer',minWidth:'300px'}}>
            <div className='d-flex' onMouseOver={display_dot_dot_dot} onMouseLeave={hidden_dot_dot_dot}>
                <div className='dot-afas'>
                    <img  style={{width:imgsize||'32px',height:imgsize||'32px',borderRadius:'50%',display:'inline-block'}} src={commentor&&commentor.profilePicture}/>
                </div>
                <div className='d-flex flex-column' style={{maxWidth:'90%'}}>
                    <div className='d-flex flex-column p-1 pl-2 pr-2' style={{maxWidth:'100%',marginLeft:'16px',borderRadius:'16px',backgroundColor:'#f0f2f5'}}>
                            <span className='onhover-text-decoration'  style={{color:'#050505',fontWeight:'500',fontSize:'14px',textAlign:'start'}}>{commentor&&commentor.username}</span>
                            <div style={{textAlign:'start',wordBreak:'break-word',wordWrap:'break-word'}}>{commentrep.content}</div> 
                    </div>
                    {commentrep.filecomment&&commentrep.filecomment.type=='image'&&<div className='ml-4 mt-1' style={{maxWidth:'200px',maxHeight:'300px',borderRadius:'12px'}}>
                        <img style={{width:'100%',height:'100%',objectFit:'contain',borderRadius:'12px',display:'inline-block'}} src={commentrep.filecomment.url}></img>
                    </div>}

                    {commentrep.filecomment&&commentrep.filecomment.type=='video'&&<div className='ml-4 mt-1' style={{maxWidth:'300px',maxHeight:'300px',borderRadius:'12px'}}>
                    <video controls style={{width:"300px",borderRadius:'8px'}}><source type="video/mp4" src={commentrep.filecomment.url}/></video>
                    </div>}
                    <div className='d-flex ml-4'>
                        <span className='ml-2 mr-2 onhover-text-decoration' style={{fontWeight:'bold',color:'#65676b',fontSize:'12px'}} >Thích</span>
                        <span className='mr-2 onhover-text-decoration' style={{fontWeight:'bold',color:'#65676b',fontSize:'12px'}} onClick={()=>setinputcmt(true)}>Trả lời</span>
                        <span className='onhover-text-decoration' style={{color:'#65676b',fontSize:'12px'}}>{format(commentrep.createAt)}</span>
                    </div>
                    
                </div>
                <div className={!dot&&'hidden-element'} style={{flex:'1',width:'40px',height:'40px',textAlign:'center',cursor:'pointer'}}>
                        <i class='bx bx-dots-horizontal-rounded bx-rotate-180' style={{color:'#5b626a',marginTop:'10px'}}></i>
                </div>
            </div>
        </div>
    );
}

export default CommentItemRep;
