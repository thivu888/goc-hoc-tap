import './App.css';
import { useState ,useEffect,useRef} from 'react';
import { BrowserRouter as Router ,Switch,Route,Redirect} from 'react-router-dom';
import Login from './pages/login/Login';
import Register from './pages/register/Register'
import Home from './pages/Home/Home';
import UserAPI from './API/UserAPI';
import PostAPI from './API/PostAPI';
import Alert from 'react-bootstrap/Alert'
import io from 'socket.io-client'
import View from './components/viewsPost'
import {useRecoilState, useRecoilValue} from 'recoil'
import UserData from './configData/UserData'
import Profile from './pages/profile'
import Watch from './components/watch';
import Topbar from './components/topbar'
import ChatBox from './components/chat-box'
import ForgotPassword from './components/forgotPass'
const serverIO='http://localhost:5000'

function App() {
    const socket=useRef()
 
  const [showAlert,setShowAlert]=useState(false)
  const [showAlertCreated,setShowAlertCreated]=useState(false)
  const [user,setUser]=useRecoilState(UserData)
  const[overlay,setoverlay]=useState(false)
  const{loadUser,getListMess}=UserAPI()
  const {getPosts}=PostAPI()
  useEffect(() => {
    socket.current=io(serverIO)
    if(user.user)socket.current.emit('joinpages',user.user._id)
    loadUser()
    getPosts()

  }, []);
 

  const [userConnect,setUserConnect]=useState(null)
  const [chatBoxShow,setChatBoxShow]=useState(false)
  return (
    <div className={'App'} style={{position:'relative'}}>
        <div className={overlay?'postoverlay':''}onClick={()=>setoverlay(false)}></div>

      <Router>
      {user.user?<Topbar socket={socket.current} setUserConnect={setUserConnect} setChatBoxShow={setChatBoxShow} />:null}

          <Switch>
            
            <Route path='/login' ><Login/></Route>
            <Route path='/forgot' ><ForgotPassword/></Route>
            <Route path='/register' ><Register/></Route>
            <Route path='/watch' ><Watch/></Route>
            <Route path='/posts/views/:id' ><View socket={socket.current}/></Route>
            <Route path='/posts/video/:id' ><View  socket={socket.current}/></Route>
            <Route path='/profile/:id' ><Profile setShowAlertCreated={setShowAlertCreated} setShowAlert={setShowAlert}  setoverlay={setoverlay} socket={socket.current}/></Route>
            <Route path='/'>{user.user?<Home setShowAlertCreated={setShowAlertCreated} setShowAlert={setShowAlert} socket={socket.current} setUserConnect={setUserConnect} userConnect={userConnect} chatBoxShow={chatBoxShow}  setChatBoxShow={setChatBoxShow}  setoverlay={setoverlay}/>:<Redirect to='/login'/>}</Route>
          </Switch>
       </Router>
       {chatBoxShow?<ChatBox currentUser={user.user} socket={socket.current} setChatBoxShow={setChatBoxShow} userConnect={userConnect}/>:null}   
       <div style={{position:'fixed',bottom:'20px',left:"50px"}}><Alert onClose={()=>setShowAlert(false)} show={showAlert} closeLabel='Close alert' dismissible={true} variant="dark" >bài viết đang được xét duyệt</Alert></div> 
       <div style={{position:'fixed',bottom:'20px',left:"50px"}}><Alert onClose={()=>setShowAlertCreated(false)} show={showAlertCreated} closeLabel='Close alert' dismissible={true} variant="success" >bài viết đã được đăng</Alert></div> 
    </div>
  );
}

export default App;
