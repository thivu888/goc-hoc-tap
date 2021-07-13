import axios from 'axios';
import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import PostAPI from '../../API/PostAPI';
import UserAPI from '../../API/UserAPI';
import CreateStatus from '../../components/createStatus'
import NewItem from '../../components/newsItem/news';
import UserData from '../../configData/UserData';
const Index = ({setoverlay,socket}) => {
    const {getUserById}=UserAPI()
    const {getPostsByIdUser}=PostAPI()
    const[userProfile,setUserProfile]=useState(null)
    const user=useRecoilValue(UserData)
    const params=useParams()
    const [list,setList]=useState([])
    useEffect(async() => {
        const res= await getPostsByIdUser(params.id)
        if(res)setList([...res])
        const u=await getUserById(params.id)
        if(u) setUserProfile(u)
    }, [params.id]);
    return (
        <div className='container'>
            <div  style={{maxWidth:'940px',margin:'0 auto',position:'relative'}}>
                <img style={{width:'100%',height:'350px',objectFit:'cover',borderBottomLeftRadius:'8px',borderBottomRightRadius:'8px'}} src='https://scontent.fhan3-2.fna.fbcdn.net/v/t1.6435-9/p720x720/83682680_556907158238447_4119141148902031360_n.jpg?_nc_cat=100&ccb=1-3&_nc_sid=e3f864&_nc_ohc=Y9h2CvozJYAAX9fK2V8&tn=jHGZn7yk8RUOoRIO&_nc_ht=scontent.fhan3-2.fna&oh=1f40912ae7bb3cd528d36c6385fe7b57&oe=60F1745D'/>
                <div style={{position:'absolute',left:'40%',bottom:'-16px'}}>
                    <img style={{width:'168px',borderRadius:'50%',border:'4px solid #fff'}} src={userProfile&&userProfile.profilePicture}/>
                    <label className='cursor-pointer' htmlFor='input_img_avatar-21'><span className='d-block' style={{width:'40px',height:'40px',borderRadius:'50%',backgroundColor:'#f0f2f5',fontSize:'20px',zIndex:'2',position:'absolute',right:'10px',bottom:'12px'}}><i style={{margin:'auto',fontSize:'26px'}}  class='bx bxs-camera mt-2'></i></span></label>
                </div>
                <label className='cursor-pointer' style={{display:'block',position:'absolute',bottom:'20px',right:'20px'}} htmlFor="input_img_bia-21"><span className='p-1 pl-2 pr-2 d-flex align-items-center' style={{color:'rgb(0.5,0.5,0.5)',fontWeight:'600',display:'inline-block',backgroundColor:'#fff',borderRadius:'6px',lineHeight:'1.8'}}><i style={{fontSize:'20px'}} class='bx bxs-camera mr-1'></i>chỉnh sửa ảnh bìa</span></label>
                <input type="file" id="input_img_bia-21" className='hidden-element input_img_bia'/>
                <input type="file" id="input_img_avatar-21" className='hidden-element input_img_avatar'/>
            </div>
            <div className='mt-4' style={{maxWidth:'940px',margin:'auto'}}>
                <div className='container d-flex flex-column '>
                    <h1 style={{fontWeight:'700',colỏ:'#000'}}>{userProfile&&userProfile.username}</h1>
                    <hr style={{margin:'8px 16px',backgroundColor:'#dadde1',color:'#dadde1'}}></hr>
                    {user&&user.user&&user.user._id===params.id&&<CreateStatus setoverlay={setoverlay}/>}
                    {list.length>0?list.map(item=><NewItem key={item._id} item={item} socket={socket}/>):<h3 className='mt-4'>Đăng bài viết</h3>}
                </div>
            </div>
        </div>
    );
}

export default Index;
