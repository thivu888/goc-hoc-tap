import React,{useState} from 'react';
import './login.css'
import video from '../../assets/videos/bg.mp4'
import img from '../../assets/images/img-bg.jpg'
import user from '../../assets/images/m.png'
import lock from '../../assets/images/l.png'
const Login = () => {
    const [state, setstate] = useState({
        usename:'',
        password:''
    });
    const onChangeInput=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setstate({...state,[name]:value})
    }
    const onSubmitHandle=(e)=>{
        e.preventDefault();
        alert(123)
    }
    return (<>
        {/* <div className='box-video'>
            <video id="video_background" preload="auto" autoplay="true" loop="loop" muted volume="0">
                <source src={video} type="video/mp4"/>
            </video>
        </div> */}
        <img className='box-img' src={img} />
        <div className='icon-book'><i class='bx bx-book-open bx-tada' ></i></div>
        <div className='logo'>
            <span>G</span>
            <span>Ó</span>
            <span>C</span>
            <span>H</span>
            <span>Ọ</span>
            <span>C</span>
            <span>T</span>
            <span>Ậ</span>
            <span>P</span>
        </div>
        
        <form className='form-login' onSubmit={onSubmitHandle} >
            <input style={{backgroundImage:`url(${user})`}} className='form-name' type='text' name='username' placeholder='username' onChange={onChangeInput} value={state.username}/>
            <input style={{backgroundImage:`url(${lock})`}} className='form-pass' type='password' name='password' placeholder="password" onChange={onChangeInput} value={state.password} />
            <input type="submit" name="submit" id="login" value='Đăng nhập'/>
        </form>

    </>);
}

export default Login;
