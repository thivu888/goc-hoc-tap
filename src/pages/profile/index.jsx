import axios from 'axios';
import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import PostAPI from '../../API/PostAPI';
import UserAPI from '../../API/UserAPI';
import CreateStatus from '../../components/createStatus'
import NewItem from '../../components/newsItem/news';
import UserData from '../../configData/UserData';
const Index = ({setoverlay,socket,setShowAlertCreated,setShowAlert}) => {
    const[avatarPicture,setAvatarPicture]=useState('')
    const[coverPicture,setCoverPicture]=useState('')
    const[data,setData]=useState({
        avatar:null,
        cover:null
    })

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
        if(u) {
        setUserProfile(u)
        setAvatarPicture(u.profilePicture)
        setCoverPicture(u.coverPicture)
    }
    }, [params.id]);

    const onhandleChangeImgAvatar=(e)=>{
        e.preventDefault();
        const file=e.target.files[0];
        if(file)setAvatarPicture(URL.createObjectURL(file))
        setData({...data,avatar:file})
    }

    const onhandleChangeImgCover=(e)=>{
        e.preventDefault();
        const file=e.target.files[0];
        if(file)setCoverPicture(URL.createObjectURL(file))
        setData({...data,cover:file})

    }

    const resetChange=()=>{
        setAvatarPicture(userProfile.profilePicture)
        setCoverPicture(userProfile.coverPicture)
        setData({cover:null,avatar:null})
    }

    const onSubmitImg=async(e)=>{
        const dataupdate= new FormData()
        dataupdate.append('id',userProfile._id)
        if(data.avatar!=null){
            dataupdate.append('avatar',data.avatar)
        }
        if(data.cover!=null){
            dataupdate.append('cover',data.cover)
        }

        await axios.put('/api/user/updateprofile',dataupdate,{
            headers: {'content-type': 'multipart/form-data'}
        })
        window.location.reload()
    }
    console.log(list)
    return (
        <div className='container'>
            <div  style={{maxWidth:'940px',margin:'0 auto',position:'relative'}}>
                <img style={{width:'100%',height:'350px',objectFit:'cover',borderBottomLeftRadius:'8px',borderBottomRightRadius:'8px'}} src={coverPicture}/>
                <div style={{position:'absolute',left:'40%',bottom:'-16px'}}>
                    <img style={{width:'168px',borderRadius:'50%',border:'4px solid #fff',objectFit:'cover',height:'168px'}} src={avatarPicture}/>
                    {user&&user.user&&user.user._id===params.id&&<label className='cursor-pointer' htmlFor='input_img_avatar-21'><span className='d-block' style={{width:'40px',height:'40px',borderRadius:'50%',backgroundColor:'#f0f2f5',fontSize:'20px',zIndex:'2',position:'absolute',right:'10px',bottom:'12px'}}><i style={{margin:'auto',fontSize:'26px'}}  class='bx bxs-camera mt-2'></i></span></label>}
                </div>
                {user&&user.user&&user.user._id===params.id&&<label className='cursor-pointer' style={{display:'block',position:'absolute',bottom:'20px',right:'20px'}} htmlFor="input_img_bia-21"><span className='p-1 pl-2 pr-2 d-flex align-items-center' style={{color:'rgb(0.5,0.5,0.5)',fontWeight:'600',display:'inline-block',backgroundColor:'#fff',borderRadius:'6px',lineHeight:'1.8'}}><i style={{fontSize:'20px'}} class='bx bxs-camera mr-1'></i>chỉnh sửa ảnh bìa</span></label>}
                <input type="file" id="input_img_bia-21" className='hidden-element input_img_bia' onChange={onhandleChangeImgCover} onInput={onhandleChangeImgCover}/>
                <input type="file" id="input_img_avatar-21" className='hidden-element input_img_avatar' onChange={onhandleChangeImgAvatar} onInput={onhandleChangeImgAvatar}/>
            </div>
            <div className='mt-4' style={{maxWidth:'940px',margin:'auto'}}>
               {userProfile&&userProfile.profilePicture!=avatarPicture||userProfile&&userProfile.coverPicture!=coverPicture?<><button  onClick={onSubmitImg} style={{outline:'none',border:'none',borderRadius:'4px',backgroundColor:'#1877f2',color:'#fff'}}>Lưu thay đổi</button><button onClick={resetChange} className='ml-4' style={{outline:'none',border:'none',borderRadius:'4px',backgroundColor:'#959fa0',color:'#fff'}}>Hủy</button></>:null}
                <div className='container d-flex flex-column '>
                    <h1 style={{fontWeight:'700',colỏ:'#000'}}>{userProfile&&userProfile.username}</h1>
                    <hr style={{margin:'8px 16px',backgroundColor:'#dadde1',color:'#dadde1'}}></hr>
                    {user&&user.user&&user.user._id===params.id&&<CreateStatus socket={socket} setShowAlert={setShowAlert} setShowAlertCreated={setShowAlertCreated} setoverlay={setoverlay}/>}
                    {list.length>0?list.map(item=><NewItem key={item._id} media={true} item={item} socket={socket}/>):<h3 className='mt-4'>Đăng bài viết</h3>}
                </div>
            </div>
        </div>
    );
}

export default Index;
