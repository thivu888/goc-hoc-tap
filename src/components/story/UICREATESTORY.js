import React,{useState} from 'react';
import Bg_story from '../../assets/images/bg-story.png'
import CloseIcon from '@material-ui/icons/Close';
import { useRecoilValue } from 'recoil';
import UserAPI from '../../API/UserAPI';
import UserData from '../../configData/UserData';
import { useHistory } from 'react-router-dom';
const UICREATESTORY = ({setShowAlertCreated,setShowAlert,socket}) => {
    const{createStory}=UserAPI()
    const user=useRecoilValue(UserData)
    const [file,setFile]=useState(null)
    const history=useHistory()
    const oninputfilestory=(e)=>{
       if(!e.target.files[0].type.includes('image')){
            alert('bạn phải chọn file dạng image')
            setFile(null)
       }else{
            if(e.target.files[0]){

                setFile(e.target.files[0])
            }
            else{
                setFile(null)
            }
       }
        
    }
    const handleSubmit=async()=>{
        const data=new FormData()
        data.append('file',file);
        data.append('id',user.user._id)
        setShowAlert(true)
        await createStory(data)
        setShowAlert(false)
        setShowAlertCreated(true)
        setTimeout(()=>
        setShowAlertCreated(false),2000
        )
        setFile(null)
        socket.emit('up-story')
    }
    return (
        <div style={{position:'fixed',bottom:'0',left:'0',right:'0',top:'0'}}>
            <div className='row' style={{height:'100%'}}>
                <div className='col-xl-4 col-xxl-4 col-lg-4 pt-5 mt-1' style={{backgroundColor:'#fff',height:'100%',position:'relative'}}>
                       <div className='mt-4 ml-4 d-flex cursor-pointer' onClick={()=>history.goBack()}  ><CloseIcon/></div> 
                        <div className='d-flex ml-3'>
                            <h2 className='mt-3' style={{fontWeight:'700'}}>Tin của bạn</h2>
                        </div>
                        <div className='d-flex align-items-center ml-3 mt-4'>
                            <img style={{width:'60px',height:'60px',float:'left',borderRadius:'50%'}} src={user.user&&user.user.profilePicture} />
                            <span style={{color:'#050505',marginLeft:'4px',fontWeight:'600',fontSize:'20px'}}>{user.user&&user.user.username}</span>
                        </div>
                        <hr className='mt-5' style={{margin:'8px 16px',backgroundColor:'#dadde1',color:'#dadde1'}}></hr>
                        {file?<div className='d-flex justify-content-center pl-5 pr-5 mt-5'>
                            <button className='mr-3' style={{outline:'none',flex:'1',backgroundColor:'rgb(228 230 235)',borderRadius:'6px',border:'none',fontWeight:'600',height:"40px"}} onClick={()=>setFile(null)}>Bỏ</button>
                            <button className='ml-3' style={{outline:'none',flex:'2',backgroundColor:'rgb(24 119 242)',borderRadius:'6px',border:'none',fontWeight:'600',color:'#fff',height:"40px"}} onClick={handleSubmit}>chia sẻ lên tin</button>
                        </div>:null}
                </div>
               
                <div className='col-xl-8 col-xxl-8 col-lg-8 pt-5 mt-1' style={{height:'100%'}}>
                        <div className='mt-5 d-flex flex-column justify-content-center ' style={{position:'relative',margin:'auto',width:'218px',height:'330px',backgroundImage:`url(${Bg_story})`,backgroundPosition:'0 0',backgroundSize:'auto'}}>
                        {!file? <label htmlFor='in-put-file-story' className='d-flex flex-column justify-content-center cursor-pointer'>
                                <div style={{width:'60px',height:"60px",borderRadius:'50%',backgroundColor:'#fff',margin:'auto'}}><span style={{fontSize:'40px'}}><i class='bx bx-image-add'></i></span></div>
                                <span style={{fontWeight:"500",color:'#fff'}}>Tạo tin ảnh</span>
                                <input onInput={oninputfilestory} type='file' id='in-put-file-story' accept="image/*" className='hidden-element'/>
                            </label>:
                            <><img src={URL.createObjectURL(file)} style={{width:'100%',objectFit:'container'}}/>
                                <div style={{color:'#fff',position:'absolute',top:'10px',right:'10px'}} onClick={()=>setFile(null)}><CloseIcon/> </div>
                            </>
                            }
                        </div>
                        
                </div>
            </div>  
        </div>
    );
}

export default UICREATESTORY;
