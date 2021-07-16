import React from 'react';
import like from '../../assets/gif/like.gif'
import angry from '../../assets/gif/angry.gif'
import love from '../../assets/gif/love.gif'
import sad from '../../assets/gif/sad.gif'
import wow from '../../assets/gif/wow.gif'
import haha from '../../assets/gif/haha.gif'
import './style.css'
const index = ({displayListGifFeel,socket,setdisplayListGifFeel,likePost}) => {
    return (
        <div onMouseLeave={()=>setdisplayListGifFeel(false)} onMouseMove={()=>setdisplayListGifFeel(true)} className={displayListGifFeel?'list-gif-feel d-flex':'list-gif-feel d-none'}>
            <img className='gif-feel' src={like} onClick={()=>likePost('LIKE')} />
            <img className='gif-feel' src={love} onClick={()=>likePost('LOVE')}/>
            <img className='gif-feel' src={haha} onClick={()=>likePost('HAHA')}/>
            <img className='gif-feel' src={wow} onClick={()=>likePost('WOW')}/>
            <img className='gif-feel' src={sad} onClick={()=>likePost('SAD')}/>
            <img className='gif-feel' src={angry} onClick={()=>likePost('ANGRY')}/>
        </div>
    );
}

export default index;
