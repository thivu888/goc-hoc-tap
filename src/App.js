import './App.css';
import { useState ,useEffect,useRef} from 'react';
import { BrowserRouter as Router ,Switch,Route,Redirect} from 'react-router-dom';
import Login from './pages/login/Login';
import Register from './pages/register/Register'
import Home from './pages/Home/Home';
import UserAPI from './API/UserAPI';
import PostAPI from './API/PostAPI';
import io from 'socket.io-client'
import {useRecoilState, useRecoilValue} from 'recoil'
import UserData from './configData/UserData'
import Profile from './pages/profile'
import Watch from './components/watch';
import Topbar from './components/topbar'
const serverIO='http://localhost:5000'

function App() {
    const socket=useRef()
 

  const [user,setUser]=useRecoilState(UserData)
  const[overlay,setoverlay]=useState(false)
  const{loadUser,getListMess}=UserAPI()
  const {getPosts}=PostAPI()
  useEffect(() => {
    socket.current=io(serverIO)
    loadUser()
    getPosts()

  }, []);
 

  const [userConnect,setUserConnect]=useState(null)
  const [chatBoxShow,setChatBoxShow]=useState(false)
  return (
    <div className={'App'} style={{position:'relative'}}>
        <div className={overlay?'postoverlay':''}onClick={()=>setoverlay(false)}></div>

    <Router>
    <Topbar setUserConnect={setUserConnect} setChatBoxShow={setChatBoxShow} />

          <Switch>
            
            <Route path='/login' ><Login/></Route>
            <Route path='/register' ><Register/></Route>
            <Route path='/profile/:id' ><Profile setoverlay={setoverlay} socket={socket.current}/></Route>
            <Route path='/'>{user.user?<Home socket={socket.current} setUserConnect={setUserConnect} userConnect={userConnect} chatBoxShow={chatBoxShow}  setChatBoxShow={setChatBoxShow}  setoverlay={setoverlay}/>:<Redirect to='/login'/>}</Route>
          </Switch>
       </Router>
       
    </div>
  );
}

export default App;
