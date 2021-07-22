import axios from 'axios';
import React,{useState,useEffect} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import PostAPI from '../../API/PostAPI';
import UserAPI from '../../API/UserAPI';
import CreateStatus from '../../components/createStatus'
import NewItem from '../../components/newsItem/news';
import UserData from '../../configData/UserData';
import icon_friend from '../../assets/images/icon-friend.png'
import Friends from '../../configData/Friends';
import ListRequestAddFriendSent from '../../configData/ListRequestAddFriendSent';
import ListRequestAddFriend from '../../configData/ListRequestAddFriend';
import URLSV from '../../constants'
const Index = ({setoverlay,socket,setShowAlertCreated,setShowAlert,setChatBoxShow,setUserConnect}) => {
    const history=useHistory()
    const[avatarPicture,setAvatarPicture]=useState('')
    const[coverPicture,setCoverPicture]=useState('')
    const listfriends=useRecoilValue(Friends)
    const listrequestaddFriendSent=useRecoilValue(ListRequestAddFriendSent)
    const listrequestaddFriend=useRecoilValue(ListRequestAddFriend)
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
    const [show,setShow]=useState(false)
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

        await axios.put(`${URLSV}/api/user/updateprofile`,dataupdate,{
            headers: {'content-type': 'multipart/form-data'}
        })
        history.push('/temp')
        history.goBack()
    }
    const removeFriend=()=>{
        socket.emit('remove-friend',{userRemove:user.user._id,toUser:userProfile._id,createAt:new Date(Date.now())})
    }
    const requestAddFriend=()=>{
        socket.emit('client-send-request-addFriend',{userSendId:user.user._id,toUserId:userProfile._id,createAt:new Date(Date.now()),})
    }
    const AcceptAddFriend=(type)=>{
        socket.emit('accept-friend',{userSendId:userProfile._id,toUserId:user.user._id,createAt:new Date(Date.now()),type:type})
    }
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
                <div className='container d-flex flex-column ' style={{width:'100%'}}>
                   
                        <h1 style={{fontWeight:'700',colỏ:'#000',flex:'1'}}>{userProfile&&userProfile.username}</h1>
                       
                    <hr style={{margin:'8px 16px',backgroundColor:'#dadde1',color:'#dadde1'}}></hr>
                    {user.user&&userProfile&&user.user._id!=userProfile._id?
                    <><div className='d-flex justify-content-end align-items-center' >
                            <div className='mr-3 cursor-pointer' style={{width:'90px',backgroundColor:'#e4e6eb',borderRadius:'8px',height:'40px'}} onClick={()=>{setChatBoxShow(true);setUserConnect(userProfile)}}>
                                <svg viewBox="0 0 28 28" alt="" class="a8c37x1j ms05siws hwsy1cff b7h9ocf4 fzdkajry" height="20" width="20"><path d="M14 2.042c6.76 0 12 4.952 12 11.64S20.76 25.322 14 25.322a13.091 13.091 0 0 1-3.474-.461.956 .956 0 0 0-.641.047L7.5 25.959a.961.961 0 0 1-1.348-.849l-.065-2.134a.957.957 0 0 0-.322-.684A11.389 11.389 0 0 1 2 13.682C2 6.994 7.24 2.042 14 2.042ZM6.794 17.086a.57.57 0 0 0 .827.758l3.786-2.874a.722.722 0 0 1 .868 0l2.8 2.1a1.8 1.8 0 0 0 2.6-.481l3.525-5.592a.57.57 0 0 0-.827-.758l-3.786 2.874a.722.722 0 0 1-.868 0l-2.8-2.1a1.8 1.8 0 0 0-2.6.481Z"></path></svg>
                               
                            </div>
                            <div className='mr-3 cursor-pointer'  style={{position:'relative',backgroundColor:'#e4e6eb',borderRadius:'8px',height:'40px',minWidth:"90px"}}>
                                {userProfile&&listfriends.some(it=>it.id==userProfile._id)?
                                <><div onClick={()=>setShow(!show)} style={{height:'100%',width:'100'}}><img className='mt-2'   src={icon_friend} /></div>
                                { show?
                                  <div style={{top:'45px',position:'absolute',width:'250px',height:'200px',backgroundColor:'#fff',zIndex:'2',boxShadow:'0 12px 28px rgba(0,0,0,0.5)',borderRadius:'8px'}}>
                                    <span onClick={removeFriend} className='d-flex align-items-center p-2 '><i style={{fontSize:'40px'}} class='bx bx-user-x'></i><p style={{fontWeight:'600',margin:'0'}}>Hủy kết bạn</p></span>
                                </div>:
                                null}</>
                                :null}
                                {userProfile&&listrequestaddFriendSent.some(it=>it.id==userProfile._id)?
                                <span className='mr-3 d-flex'  style={{fontSize:'30px',backgroundColor:'#e7f3ff',color:'#1877f2',height:'40px',borderRadius:'8px',width:'100%'}}><i class='bx bxs-user-minus' ></i><p  style={{fontSize:'16px',margin:'0',color:'#1877f2',fontWeight:'500'}} onClick={requestAddFriend}>Hủy lời mời</p></span>
                                :null}
                                {userProfile&&listrequestaddFriend.some(it=>it.id==userProfile._id)?
                                    <>
                                    <span className='d-inline-block mr-3 cursor-pointer ' style={{height:'40px',lineHeight:'40px',width:'60px',backgroundColor:'#e4e6eb',color:'#000',fontWeight:'500',borderRadius:"8px"}} onClick={()=>AcceptAddFriend(false)} >xóa</span>
                                    <span className='d-inline-block cursor-pointer' style={{height:'40px',width:'90px',lineHeight:'40px',backgroundColor:'#2d88ff',color:'#fff',fontWeight:'500',borderRadius:"8px"}}  onClick={()=>AcceptAddFriend(true)}>xác nhận</span>
                                    </>
                                :null}
                                {userProfile&&!listrequestaddFriendSent.some(it=>it.id==userProfile._id)&&!listrequestaddFriend.some(it=>it.id==userProfile._id)&&!listfriends.some(it=>it.id==userProfile._id)?
                                <span className='d-flex align-items-center'  style={{fontSize:'30px',backgroundColor:'#e7f3ff',color:'#1877f2',height:'40px',borderRadius:'8px',width:'100%'}}><i class='bx bxs-user-plus' ></i><p  style={{fontSize:'16px',margin:'0',color:'#1877f2',fontWeight:'500'}} onClick={requestAddFriend}>Thêm bạn</p></span>
                                :null}
                                
                            </div>
                    </div>
                    <hr style={{margin:'8px 16px',backgroundColor:'#dadde1',color:'#dadde1'}}></hr></>
                    :null}

                    {user&&user.user&&user.user._id===params.id&&<CreateStatus socket={socket} setShowAlert={setShowAlert} setShowAlertCreated={setShowAlertCreated} setoverlay={setoverlay}/>}
                    {list.length>0?list.map(item=><NewItem key={item._id} media={true} item={item} socket={socket}/>):<h3 className='mt-4'>Đăng bài viết</h3>}
                </div>
            </div>
        </div>
    );
}

export default Index;
