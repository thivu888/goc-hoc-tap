import "./sidebar.css";
import {useState} from 'react'
import UserData from "../../configData/UserData";
import { useRecoilValue } from "recoil";
import {Link} from 'react-router-dom'
export default function Sidebar() {
    const user=useRecoilValue(UserData)
    
    const[more,setMore]=useState(false)
    const toggleMore=()=>{
        setMore(!more)
    }
  return (
    <div className='col-xl-3 col-xxl-3 col-lg-3 sidebar'>
        <ul>
            <li className='sidebar-item' style={{marginTop:'20px'}}>
                <Link to={`/profile/${user.user._id}`}>
                    <div  style={{display:'flex',cursor:'pointer',borderRadius:'12px',}}>
                        <img style={{width:'28px',height:'28px',borderRadius:'50%'}} src={user&&user.user.profilePicture}/>
                        <span style={{color:'#050505',marginLeft:'8px',fontWeight:'500'}}>{user.user.username}</span>
                    </div>
                </Link>
            </li>
            <li className='sidebar-item' style={{marginTop:'20px'}}>
                <div  style={{display:'flex',cursor:'pointer',borderRadius:'12px',}}>
                    <img style={{width:'28px',height:'28px',borderRadius:'50%'}} src='https://static.xx.fbcdn.net/rsrc.php/v3/y8/r/S0U5ECzYUSu.png'/>
                    <span style={{color:'#050505',marginLeft:'8px',fontWeight:'500'}}>Bạn bè</span>
                </div>
            </li>
            <li className='sidebar-item' style={{marginTop:'20px'}}>
                <div  style={{display:'flex',cursor:'pointer',borderRadius:'12px',}}>
                    <img style={{width:'28px',height:'28px',borderRadius:'50%'}} src='https://static.xx.fbcdn.net/rsrc.php/v3/yD/r/lVijPkTeN-r.png'/>
                    <span style={{color:'#050505',marginLeft:'8px',fontWeight:'500'}}>Trang</span>
                </div>
            </li>
            <li className='sidebar-item' style={{marginTop:'20px'}}>
                <div  style={{display:'flex',cursor:'pointer',borderRadius:'12px',}}>
                    <img style={{width:'28px',height:'28px',borderRadius:'50%'}} src='https://static.xx.fbcdn.net/rsrc.php/v3/yH/r/kyCAf2jbZvF.png'/>
                    <span style={{color:'#050505',marginLeft:'8px',fontWeight:'500'}}>Nhóm</span>
                </div>
            </li>
            <li className='sidebar-item' style={{marginTop:'20px'}}>
                <div  style={{display:'flex',cursor:'pointer',borderRadius:'12px',}}>
                    <img style={{width:'28px',height:'28px',borderRadius:'50%'}} src='https://static.xx.fbcdn.net/rsrc.php/v3/yU/r/D2y-jJ2C_hO.png'/>
                    <span style={{color:'#050505',marginLeft:'8px',fontWeight:'500'}}>Marketplace</span>
                </div>
            </li>
            <li className='sidebar-item' style={{marginTop:'20px'}}>
                <div  style={{display:'flex',cursor:'pointer',borderRadius:'12px',}}>
                    <img style={{width:'28px',height:'28px',borderRadius:'50%'}} src='https://static.xx.fbcdn.net/rsrc.php/v3/yj/r/n2vd2VduYc1.png'/>
                    <span style={{color:'#050505',marginLeft:'8px',fontWeight:'500'}}>Chiến dịch gây quỹ</span>
                </div>
            </li>
            <li className='sidebar-item' style={{marginTop:'20px'}}>
                <div  style={{display:'flex',cursor:'pointer',borderRadius:'12px',}}>
                    <img style={{width:'28px',height:'28px',borderRadius:'50%'}} src='https://static.xx.fbcdn.net/rsrc.php/v3/yt/r/PObY9OA5lvJ.png'/>
                    <span style={{color:'#050505',marginLeft:'8px',fontWeight:'500'}}>Chơi game</span>
                </div>
            </li>
            {more?(<><li className='sidebar-item' style={{marginTop:'20px'}}>
                <div  style={{display:'flex',cursor:'pointer',borderRadius:'12px',}}>
                    <img style={{width:'28px',height:'28px',borderRadius:'50%'}} src='https://static.xx.fbcdn.net/rsrc.php/v3/yQ/r/MN5ZSGIfEZ3.png'/>
                    <span style={{color:'#050505',marginLeft:'8px',fontWeight:'500'}}>Danh sách bạn bè</span>
                </div>
            </li>
            <li className='sidebar-item' style={{marginTop:'20px'}}>
                <div  style={{display:'flex',cursor:'pointer',borderRadius:'12px',}}>
                    <img style={{width:'28px',height:'28px',borderRadius:'50%'}} src='https://static.xx.fbcdn.net/rsrc.php/v3/yv/r/GJ4EaivDaSj.png'/>
                    <span style={{color:'#050505',marginLeft:'8px',fontWeight:'500'}}>Facebook Pay</span>
                </div>
            </li>
            <li className='sidebar-item' style={{marginTop:'20px'}}>
                <div  style={{display:'flex',cursor:'pointer',borderRadius:'12px',}}>
                    <img style={{width:'28px',height:'28px',borderRadius:'50%'}} src='https://static.xx.fbcdn.net/rsrc.php/v3/ye/r/w-vdKCGzCy1.png'/>
                    <span style={{color:'#050505',marginLeft:'8px',fontWeight:'500'}}>Gần đây nhất</span>
                </div>
            </li>
            <li className='sidebar-item' style={{marginTop:'20px'}}>
                <div  style={{display:'flex',cursor:'pointer',borderRadius:'12px',}}>
                    <img style={{width:'28px',height:'28px',borderRadius:'50%'}} src='https://static.xx.fbcdn.net/rsrc.php/v3/yj/r/8OasGoQgQgF.png'/>
                    <span style={{color:'#050505',marginLeft:'8px',fontWeight:'500'}}>Hoạt động quảng cáo gần đây</span>
                </div>
            </li>
            <li className='sidebar-item' style={{marginTop:'20px'}}>
                <div  style={{display:'flex',cursor:'pointer',borderRadius:'12px',}}>
                    <img style={{width:'28px',height:'28px',borderRadius:'50%'}} src='https://static.xx.fbcdn.net/rsrc.php/v3/y8/r/he-BkogidIc.png'/>
                    <span style={{color:'#050505',marginLeft:'8px',fontWeight:'500'}}>Kỷ niệm</span>
                </div>
            </li>
            <li className='sidebar-item' style={{marginTop:'20px'}}>
                <div  style={{display:'flex',cursor:'pointer',borderRadius:'12px',}}>
                    <img style={{width:'28px',height:'28px',borderRadius:'50%'}} src='https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/4Y9Xi2D3hJv.png'/>
                    <span style={{color:'#050505',marginLeft:'8px',fontWeight:'500'}}>Messager</span>
                </div>
            </li>
            <li className='sidebar-item' style={{marginTop:'20px'}}>
                <div  style={{display:'flex',cursor:'pointer',borderRadius:'12px',}}>
                    <img style={{width:'28px',height:'28px',borderRadius:'50%'}} src='https://static.xx.fbcdn.net/rsrc.php/v3/yu/r/1Xvrz50fHMF.png'/>
                    <span style={{color:'#050505',marginLeft:'8px',fontWeight:'500'}}>Messager nhí</span>
                </div>
            </li>
            <li className='sidebar-item' style={{marginTop:'20px'}}>
                <div  style={{display:'flex',cursor:'pointer',borderRadius:'12px',}}>
                    <img style={{width:'28px',height:'28px',borderRadius:'50%'}} src='https://static.xx.fbcdn.net/rsrc.php/v3/ys/r/8wTx0Eu2vRq.png'/>
                    <span style={{color:'#050505',marginLeft:'8px',fontWeight:'500'}}>Sự kiện</span>
                </div>
            </li>
            <li className='sidebar-item' style={{marginTop:'20px'}}>
                <div  style={{display:'flex',cursor:'pointer',borderRadius:'12px',}}>
                    <img style={{width:'28px',height:'28px',borderRadius:'50%'}} src='https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/vxMUnHhu6Do.png'/>
                    <span style={{color:'#050505',marginLeft:'8px',fontWeight:'500'}}>Sức khỏe cảm xúc</span>
                </div>
            </li>
            <li className='sidebar-item' style={{marginTop:'20px'}}>
                <div  style={{display:'flex',cursor:'pointer',borderRadius:'12px',}}>
                    <img style={{width:'28px',height:'28px',borderRadius:'50%'}} src='https://static.xx.fbcdn.net/rsrc.php/v3/yC/r/bo0Zt72NIra.png'/>
                    <span style={{color:'#050505',marginLeft:'8px',fontWeight:'500'}}>Thời tiết</span>
                </div>
            </li>
            <li className='sidebar-item' style={{marginTop:'20px'}}>
                <div  style={{display:'flex',cursor:'pointer',borderRadius:'12px',}}>
                    <img style={{width:'28px',height:'28px',borderRadius:'50%'}} src='https://static.xx.fbcdn.net/rsrc.php/v3/y9/r/DHBHg9MEeSC.png'/>
                    <span style={{color:'#050505',marginLeft:'8px',fontWeight:'500'}}>Trình quản lí quảng cáo</span>
                </div>
            </li>
            <li className='sidebar-item' style={{marginTop:'20px'}}>
                <div  style={{display:'flex',cursor:'pointer',borderRadius:'12px',}}>
                    <img style={{width:'28px',height:'28px',borderRadius:'50%'}} src='https://static.xx.fbcdn.net/rsrc.php/v3/y9/r/DHBHg9MEeSC.png'/>
                    <span style={{color:'#050505',marginLeft:'8px',fontWeight:'500'}}>Trình quản lí quảng cáo</span>
                </div>
            </li>
            <li className='sidebar-item' style={{marginTop:'20px'}}>
                <div  style={{display:'flex',cursor:'pointer',borderRadius:'12px',}}>
                    <img style={{width:'28px',height:'28px',borderRadius:'50%'}} src='https://static.xx.fbcdn.net/rsrc.php/v3/yD/r/CwKNCefmHON.png'/>
                    <span style={{color:'#050505',marginLeft:'8px',fontWeight:'500'}}>Trung tâm quảng cáo</span>
                </div>
            </li>
            <li className='sidebar-item' style={{marginTop:'20px'}}>
                <div  style={{display:'flex',cursor:'pointer',borderRadius:'12px',}}>
                    <img style={{width:'28px',height:'28px',borderRadius:'50%'}} src='https://static.xx.fbcdn.net/rsrc.php/v3/yT/r/cT5nPnO8Wsc.png'/>
                    <span style={{color:'#050505',marginLeft:'8px',fontWeight:'500'}}>Ứng phó khẩn cấp</span>
                </div>
            </li>
            <li className='sidebar-item' style={{marginTop:'20px'}}>
                <div  style={{display:'flex',cursor:'pointer',borderRadius:'12px',}}>
                    <img style={{width:'28px',height:'28px',borderRadius:'50%'}} src='https://static.xx.fbcdn.net/rsrc.php/v3/y_/r/NYOGcd-z-qs.png'/>
                    <span style={{color:'#050505',marginLeft:'8px',fontWeight:'500'}}>Ưu đãi</span>
                </div>
            </li>
            <li className='sidebar-item' style={{marginTop:'20px'}}>
                <div  style={{display:'flex',cursor:'pointer',borderRadius:'12px',}}>
                    <img style={{width:'28px',height:'28px',borderRadius:'50%'}} src='https://static.xx.fbcdn.net/rsrc.php/v3/yy/r/9bekmF_PzNp.png'/>
                    <span style={{color:'#050505',marginLeft:'8px',fontWeight:'500'}}>Video chơi game</span>
                </div>
            </li>
            <li className='sidebar-item' style={{marginTop:'20px'}}>
                <div  style={{display:'flex',cursor:'pointer',borderRadius:'12px',}}>
                    <img style={{width:'28px',height:'28px',borderRadius:'50%'}} src='https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/Nl9CPY6q_n-.png'/>
                    <span style={{color:'#050505',marginLeft:'8px',fontWeight:'500'}}>Video trực tiếp</span>
                </div>
            </li>
            <li className='sidebar-item' style={{marginTop:'20px'}}>
                <div  style={{display:'flex',cursor:'pointer',borderRadius:'12px',}}>
                    <img style={{width:'28px',height:'28px',borderRadius:'50%'}} src='https://static.xx.fbcdn.net/rsrc.php/v3/yo/r/DO-SN-shaZL.png'/>
                    <span style={{color:'#050505',marginLeft:'8px',fontWeight:'500'}}>Việc làm</span>
                </div>
            </li>
            <li className='sidebar-item' style={{marginTop:'20px'}}>
                <div  style={{display:'flex',cursor:'pointer',borderRadius:'12px',}}>
                    <img style={{width:'28px',height:'28px',borderRadius:'50%'}} src='https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/duk32h44Y31.png'/>
                    <span style={{color:'#050505',marginLeft:'8px',fontWeight:'500'}}>Watch</span>
                </div>
            </li>
            <li className='sidebar-item' style={{marginTop:'20px'}}>
                <div  style={{display:'flex',cursor:'pointer',borderRadius:'12px',}}>
                    <img style={{width:'28px',height:'28px',borderRadius:'50%'}} src='https://static.xx.fbcdn.net/rsrc.php/v3/yK/r/mAnT0r8GSOm.png'/>
                    <span style={{color:'#050505',marginLeft:'8px',fontWeight:'500'}}>Yêu thích</span>
                </div>
            </li></>):null}
            {!more?<li className='sidebar-item' style={{marginTop:'20px'}}>
                <div style={{display:'flex',cursor:'pointer',borderRadius:'12px',}} >
                    <i className='down-more-side-bar'></i>
                    <span style={{color:'#050505',marginLeft:'8px',fontWeight:'500'}} onClick={toggleMore}>Xem thêm</span>
                </div>
            </li>:
            <li className='sidebar-item' style={{marginTop:'20px'}}>
                <div style={{display:'flex',cursor:'pointer',borderRadius:'12px',}} >
                    <i className='top-more-side-bar'></i>
                    <span style={{color:'#050505',marginLeft:'8px',fontWeight:'500'}} onClick={toggleMore}>Ẩn bớt</span>
                </div>
            </li>}
        </ul>
        
    </div>
  );
}