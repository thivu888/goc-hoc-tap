import React,{useState} from 'react';
import './createstatus.css'
import axios from 'axios';
import {Spinner} from 'react-spinners-css';
import { useRecoilState, useRecoilValue } from 'recoil';
import UserData from '../../configData/UserData';
import CloseIcon from '@material-ui/icons/Close';
import PostData from '../../configData/PostData';
import { Socket } from 'socket.io-client';

const Index = ({setoverlay,setShowAlertCreated,setShowAlert,socket}) => {
    const [posts,setposts]=useRecoilState(PostData)
    const user=useRecoilValue(UserData)
    const [imgpost,setImgPost]=useState(null)
    const [videopost,setVideoPost]=useState(null)
    const [contentPost,setContentPost]=useState('')
    const[loading,setLoading]=useState(false)
    const onInputFile=(e)=>{
        const file=e.target.files[0]
        if(file){
            if(file.type.includes('image'))
            {
                setImgPost(file) 
            }
            if(file.type.includes('video'))
            {
                setVideoPost(file) 


            }
        }
    }
    const onHandleSubmit=async()=>{
        const data = new FormData();
       
        if(imgpost){
            data.append('img',imgpost)
            
        }
        
        if(videopost){
            data.append('video',videopost)

        }
        if(contentPost){
            data.append('content',contentPost)
        }
        setoverlay(false)
        setShowAlert(true)
        setVideoPost(null);
        setImgPost(null);
        setContentPost('')
        const res=await axios.post('/api/post',data,{
            headers: {'content-type': 'multipart/form-data'}
        })
        socket.emit('create-post')

        setShowAlert(false)
        setShowAlertCreated(true)
        setTimeout(() => {
            setShowAlertCreated(false)
        }, 2000);
    }
    return (<>
        <div className='container create-status-wrap'>
                {loading?<div style={{position:'absolute',top:'10px',left:'200px'}}>

                    <Spinner color="#be97e8" />
                </div>:null}
                <div className='d-flex align-items-center mt-3 p-2' style={{cursor:'pointer'}}>
                    <img style={{width:'40px',height:'40px',borderRadius:'50%'}} src={user.user&&user.user.profilePicture}/>
                    <div className='ml-2 p-2 qwert' style={{width:'90%',borderRadius:'24px',height:'40px'}} >
                        <input className='ml-2' style={{float:'left',color:'#65676b',fontSize:'18px',height:'100%',outline:'none',border:'none',width:'100%',backgroundColor:'transparent'}} placeholder={`${user.user&&user.user.username},bạn đang nghĩ gì thế?`} value={contentPost} onFocus={()=>setoverlay(true)} onInput={(e)=>setContentPost(e.target.value)}/>
                    </div>
                </div>
               {imgpost||videopost?(<> <div style={{borderTop:'1px solid #e4e6eb'}} className='mt-1 mb-1 cursor-pointer'>
                  {imgpost?  <div style={{position:'relative'}}>
                        <img style={{objectFit:'cover',width:'100%',display:'inline-block'}} src={URL.createObjectURL(imgpost)}/>
                        <div onClick={()=>setImgPost(null)} style={{position:'absolute',top:'10px',right:'10px'}}><CloseIcon/></div>
                    </div>:null}
                    {videopost?<div style={{borderTop:'1px solid #e4e6eb',position:'relative'}}>
                        <video style={{width:'100%'}} >
                            <source src={URL.createObjectURL(videopost)} type="video/mp4"/>
                        </video>
                        <div onClick={()=>setVideoPost(null)} style={{position:'absolute',top:'10px',right:'10px'}}><CloseIcon/></div>
                    </div>:null}
                </div>
                </>):null}
                <div className='mt-3 d-flex align-items-center' style={{borderTop:'1px solid #e4e6eb',width:'100%',height:'40px',margin:'auto'}}>
                    <div className='d-flex justify-content-around jqwgj pt-2 pb-2 mt-2' style={{flex:'1',cursor:'pointer'}}>
                        <i className='icon-video'></i>
                        <span className='mr-4'  style={{color:'#65676b',fontSize:'.9375rem',fontWeight:'600'}}>Video trực tiếp</span>
                    </div>
                    <div className='d-flex justify-content-around jqwgj pt-2 pb-2 mt-2' style={{flex:'1',cursor:'pointer',width:'80%'}}>
                       <label className='d-flex justify-content-around cursor-pointer' style={{margin:'0',padding:'0'}} htmlFor='input-img-video'> 
                            <i className='icon-img'></i>
                            <span className='mr-5'  style={{color:'#65676b',fontSize:'.9375rem',fontWeight:'600'}} >Ảnh/Video</span>
                        </label>
                        <input type='file' name='file' className='hidden-element' id='input-img-video' accept="image/*,audio/*,video/*" onChange={onInputFile} />
                    </div>
                    <div className='d-flex justify-content-around jqwgj pt-2 pb-2 mt-2' style={{flex:'1',cursor:'pointer'}}>
                        <i className='icon-state'></i>
                        <span  style={{color:'#65676b',fontSize:'.9375rem',fontWeight:'600'}}>Cảm xúc/Hoạt động</span>
                    </div>
                </div>
                <div className='mt-2 p-3' style={{borderTop:'1px solid #e4e6eb',}} onClick={onHandleSubmit}>
                      <div  className='cursor-pointer p-2' style={{margin:'auto',borderRadius:'8px',backgroundColor:'#1877f2',color:'white',width:'80%'}}>
                        Đăng
                      </div>
                </div>
        </div>
        </>
       
    );
}

export default Index;
