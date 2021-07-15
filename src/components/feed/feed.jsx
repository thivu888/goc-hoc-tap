import React,{useEffect} from 'react';
import "react-multi-carousel/lib/styles.css";
import './feed.css'
import Story from '../story'
import CreateStatus from '../createStatus'
import NewsItem from '../newsItem/news';
import { useRecoilState, useRecoilValue } from 'recoil';
import PostData from '../../configData/PostData';
import UserData from '../../configData/UserData';
const Feed = ({setoverlay,socket,setShowAlertCreated,setShowAlert}) => {
    const [post,setPosts]=useRecoilState(PostData)
    const user=useRecoilValue(UserData)
  
    
    
  

    
    return (
        <div className='container-fluid col-xl-6 col-xxl-6 col-lg-6 Feed'> 
            <div className='story-container'>
               <Story/>
            </div>
            <CreateStatus setoverlay={setoverlay} setShowAlertCreated={setShowAlertCreated} setShowAlert={setShowAlert}/>
            {post.map(item=><NewsItem key={item._id} item={item} media={true} socket={socket}/>)}
        </div>

    );
}

export default Feed;
