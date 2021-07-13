import React from 'react';
import "react-multi-carousel/lib/styles.css";
import './watch.css'
import Story from '../story'
import NewsItem from '../newsItem/news';
import { useRecoilState, useRecoilValue } from 'recoil';
import PostData from '../../configData/PostData';
const Watch = ({setoverlay}) => {
    const [post,setPosts]=useRecoilState(PostData)
    const list=post.filter(item=>item.video!=null)
    return (
        <div className='container-fluid col-xl-6 col-xxl-6 col-lg-6 Feed'> 
            <div className='story-container'>
               <Story/>
            </div>
            
            {list.length>0?list.map(item=><NewsItem item={item}/>):<h1>danh sach video trong</h1>}
        </div>

    );
}

export default Watch;
