import React from 'react';
import { useState } from 'react';
 import Picker from 'emoji-picker-react';
 import dataNews,{pushData} from '../../configData/data';
 import {useRecoilState} from 'recoil';
const UICreator = ({uiCreatorhidden,setuiCreatorhidden}) => {
    const [img,setImg]=useState('https://scontent.fhph1-2.fna.fbcdn.net/v/t1.6435-9/209714742_649770846424801_7979179349709660352_n.jpg?_nc_cat=105&ccb=1-3&_nc_sid=dbeb18&_nc_ohc=m6qXARgbxBMAX9yWwNp&_nc_ht=scontent.fhph1-2.fna&oh=a505a64f51520b8a28bd3db8906c61df&oe=60E4D9C8')
    const [video,setVideo]=useState('https://scontent.fhph1-2.fna.fbcdn.net/v/t1.6435-9/209714742_649770846424801_7979179349709660352_n.jpg?_nc_cat=105&ccb=1-3&_nc_sid=dbeb18&_nc_ohc=m6qXARgbxBMAX9yWwNp&_nc_ht=scontent.fhph1-2.fna&oh=a505a64f51520b8a28bd3db8906c61df&oe=60E4D9C8')
    const [text,setText]=useState('Vũ ơi,bạn đang nghĩ gì thế?')
    const [emoji,setEmoji]=useState(false)
    const [scope,setScope]=useState('')
    const toggleEmoji=()=>setEmoji(!emoji)
    const onEmojiClick = (event, emojiObject) => {
        setText(text+emojiObject.emoji);
      };
    const onuploadImg=(e)=>{

    }
    console.log(text)
    const [newfeeds,setNewFeeds]=useRecoilState(dataNews)
    return (
        <div className='overlay'>
            <div className='upload-baiviet' style={{border:'1px solid rgba(1,1,1,0.1)',width:'500px',height:'450px',backgroundColor:'#ffffff',borderRadius:'6px',margin:'auto',marginTop:'120px',opacity:'1'}}>
                <div className='destroy-upload-baiviet-wraper' onClick={()=>setuiCreatorhidden({...uiCreatorhidden,state:true})} >
                  <i className='destroy-upload-baiviet'></i>
                </div>
                <div style={{height:'60px',borderBottom:'1px solid #e5e5e5'}}>
                    <h3 style={{fontSize:'20px',fontWeight:'700',marginTop:'16px'}}>Tạo bài viết</h3> 
                </div>
                <div className='d-flex flex-column  mt-3' style={{cursor:'pointer',height:'364px'}}>
                   <div className='d-flex p-2' >
                      <img style={{width:'40px',height:'40px',borderRadius:'50%'}} src='https://scontent.fhan3-1.fna.fbcdn.net/v/t1.6435-1/cp0/p50x50/124820552_744423282820166_400071713503603036_n.jpg?_nc_cat=104&ccb=1-3&_nc_sid=7206a8&_nc_ohc=f3aw8aZvptgAX-40as2&_nc_ht=scontent.fhan3-1.fna&tp=27&oh=fcf92930b0cb47d067ebdd8d7af735a4&oe=60E184A0'/>
                      <div className='d-flex flex-column align-items-start ml-2' style={{height:'40px'}}>
                        <span style={{color:'#050505',fontWeight:'500',lineHeight:'16px'}}>Thị Vũ</span>
                        <select style={{border:'none',outline:'none',backgroundColor:'#e4e6eb',borderRadius:'4px'}} name="phamvi" id="phamvi" value='public'>
                          <option value="public">Công khai</option>
                          <option value="private">CHỉ mình tôi</option>
                          <option value="frends">Bạn bè</option>
                        </select>
                      </div>
                    </div>
                    <div  className='ml-2 p-2 d-flex flex-column ' style={{width:'95%',height:'220px',overflowY:'scroll'}}>
                      <div className='d-flex align-item-center'>
                        <div className='ml-2 p-2 ' style={{width:'90%',whiteSpace:'pre-wrap'}}>
                            <textarea  className='ml-2' style={{cursor:'text',backgroundColor:'transparent',float:'left',color:'#65676b',fontSize:'18px',outline:'none',border:'none',width:'100%',wordBreak:'break-word',wordWrap:'break-word',textAlign:'start'}} onChange={(e)=>setText(e.target.value)} value={text} />
                        </div>
                        <div className='mt-3 ml-3' onClick={()=>toggleEmoji()}>
                              <span style={{lineHeight:'32px'}}  className='icon-feel-cmt ic'></span>
                        </div>
                        {emoji?<div style={{position:'absolute',right:'185px'}}>
                            <Picker onEmojiClick={onEmojiClick}/>
                        </div>:null}
                        
                      </div>
                      {uiCreatorhidden.video_img? <div  style={{width:'100%'}} >
                        <div className='mt-3 p-2'  style={{width:'100%',height:'300px',border:'1px solid rgba(0,0,0,0.1)',borderRadius:'6px'}}>
                            <div className='destroy-upload-anh-wraper' onClick={()=>{if(img){setImg('')}else{setuiCreatorhidden({...uiCreatorhidden,video_img:false})}}} >
                                <i className='destroy-upload-anh'></i>
                            </div>
                              <div style={{width:'100%'}} >
                                  {img?
                                  <img style={{objectFit:'cover',width:'100%'}} src={img}/>:
                                  <>
                                  <label style={{margin:'0',cursor:'pointer',width:'100%',height:'100%',display:'inline-block'}} htmlFor='hinh-anh111'><i style={{width:'100%',height:'100%',display:'inline-block',fontSize:'100px',marginTop:'125px'}} class='bx bxs-camera'></i></label> 
                                    <input id='hinh-anh111' style={{display:'none'}} accept="video/*,  video/x-m4v, video/webm, video/x-ms-wmv, video/x-msvideo, video/3gpp, video/flv, video/x-flv, video/mp4, video/quicktime, video/mpeg, video/ogv, .ts, .mkv, image/*, image/heic, image/heif" class="mkhogb32" type="file"/>
                                    </>
                                }
                                    
                              </div>
                        </div>
                      </div>:null}
                    </div>
                    <div>
                        <div className='mt-1 d-flex'  style={{margin:'auto',borderRadius:'8px',width:'80%',border:'1px solid rgba(0,0,0,0.1)',textAlign:'start'}}><span>Thêm vào bài viết</span><i onClick={()=>setuiCreatorhidden({...uiCreatorhidden,video_img:true})} className='rew12-231 ml-3'></i></div>
                      <div onClick={(e)=>{const list=pushData(newfeeds,{content:text,img:img});setNewFeeds(list); return setuiCreatorhidden({...uiCreatorhidden,state:true})}} className='cursor-pointer mt-3 ' style={{margin:'auto',borderRadius:'8px',backgroundColor:'#1877f2',color:'white',width:'80%'}}>
                        Đăng
                      </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UICreator;
