import React, { useState } from 'react';
import axios from 'axios'
import CloseIcon from '@material-ui/icons/Close';
import Picker from 'emoji-picker-react';

import filecomment from '../../configData/fileComment';
import filecommentRep from '../../configData/fileCommentRep';
import { useRecoilState, useRecoilValue } from 'recoil';
const InputComment = ({imgsize,currentUser,post,socket,setdisplaycmt,rep,comment_Id}) => {
    const [content, setContent] = useState('');
    const [file,setFIle]=useRecoilState(filecomment)
    const [fileRep,setFIleRep]=useRecoilState(filecommentRep)
    const [showEmoji,setShowEmoji]=useState(false)  
    const onChangeInput=(e)=>{
        let name=e.target.name;
        let value=e.target.value;
        setContent(value)
    }
    const onInputFile=(e)=>{
        const f=e.target.files[0]
        if(f){
            setFIle(f) 
        }else{
            setFIle(null)
        }
    }
    const onEmojiClick = (event, emojiObject) => {
        setContent(content+emojiObject.emoji);
      };
    const submitHandle=async(e)=>{
        const dataform=new FormData()
      if(e.charCode==13)
       {
            const data={
               content,
               userId:currentUser._id,
               room:post.postId.toString(),
               repcomment:[],
               createAt:new Date(Date.now()),
               comment_Id:Math.random().toString(36).substring(2)+Math.random().toString(36).substring(2),
               UserCreator:post.userId

           }
            if(file){
                dataform.append('file',file)
                const res=  await axios.post('/api/post/filecomment', dataform, { headers: {'content-type': 'multipart/form-data'}})
                data.filecomment={...res.data}
                }
           socket.emit('sendComment',data)
           setdisplaycmt(true)
           setContent('')
           setFIle(null)
           }
          
       }
    
    return (<>
    <div className='d-flex align-items-center mt-3 mb-3' style={{cursor:'pointer'}}>
            <div className='dot-afas'>
                <img style={{width:imgsize||'32px',height:imgsize||'32px',borderRadius:'50%'}} src={currentUser&&currentUser.profilePicture}/>
            </div>
            <div className='ml-2  qwert' style={{width:'90%',borderRadius:'24px',height:'32px'}}>
                    <div className='d-flex' style={{height:'100%',borderRadius:'24px',width:'100%'}}>
                    <input value={content} name="content"  className='p-2' style={{flex:'3',outline:'none',height:'100%',borderRadius:'24px',border:'none',backgroundColor:'transparent'}} type='text' placeholder='Viết bình luận' onChange={onChangeInput} onKeyPress={submitHandle} />
                    <ul className='d-flex justify-content-around align-items-center p-2 pt-3' style={{margin:'0',height:'100%',flex:'1'}}>
                        <li style={{position:'relative'}} onClick={()=>setShowEmoji(!showEmoji)}>
                            <span style={{lineHeight:'32px'}}  className='icon-feel-cmt ic'></span>
                            {showEmoji?<div style={{position:'absolute',top:'-335px',right:'2px'}}>
                                <Picker onEmojiClick={onEmojiClick}/>
                            </div>:null}
                        </li>
                        <li >
                            <label style={{margin:'0',cursor:'pointer'}} htmlFor='hinh-anh111'><span style={{lineHeight:'32px'}} className='icon-img-cmt ic'></span></label> 
                            <input onChange={onInputFile} name="file" id='hinh-anh111' style={{display:'none'}} accept="video/*,  video/x-m4v, video/webm, video/x-ms-wmv, video/x-msvideo, video/3gpp, video/flv, video/x-flv, video/mp4, video/quicktime, video/mpeg, video/ogv, .ts, .mkv, image/*, image/heic, image/heif" class="mkhogb32" type="file"/>
                        </li>
                        <li >
                            <span style={{lineHeight:'32px'}} className='icon-gif-cmt ic'></span>
                        </li>
                        <li >
                            <span  style={{lineHeight:'32px'}} className='icon-ticker-cmt ic p-2'></span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div className='mb-2'>
             {file&&file.type.includes('image')&&<><img src={URL.createObjectURL(file)} style={{width:"120px",objectFit:'contain',borderRadius:'8px'}}></img><div onClick={()=>setFIle(null)} className='cursor-pointer' style={{position:'relative',top:'-120px',left:'80px'}}>< CloseIcon/></div></>}
             {file&&file.type.includes('video')&&<><video controls style={{width:"200px",borderRadius:'8px'}}><source type="video/mp4" src={URL.createObjectURL(file)}/></video><div onClick={()=>setFIle(null)} className='cursor-pointer' style={{position:'relative',top:'-100px',left:'120px'}}>< CloseIcon/></div></>}
        </div>
     
        </>
    );
}

export default InputComment;
