import React from 'react';
import './storyItem.css'
import { Link } from 'react-router-dom';
const storyItem = () => {
    const name='Phan Quang Vũ'
    const img="https://scontent-hkt1-2.xx.fbcdn.net/v/t15.5256-10/s280x280/205220956_914252756024072_3479381210767069568_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=1055be&_nc_ohc=vZ2ptYT_mRYAX9OORCO&_nc_ht=scontent-hkt1-2.xx&tp=7&oh=a7f31984d994e1916346f232c5a52ab6&oe=60E1FC74"
    const avt='https://scontent-hkt1-2.xx.fbcdn.net/v/t1.6435-1/cp0/p40x40/182959904_882555435860471_4207845362847974669_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=7206a8&_nc_ohc=CnnIEK2X0dMAX_597Z0&_nc_ht=scontent-hkt1-2.xx&tp=27&oh=ffeb8b76209b43080a3e386436efec68&oe=60E1990B'
    return (
        <Link>
            <div className='story-item'>
                <img className='story-item-avt' src={avt}/>
                <img className='story-item-img' src={img} />
                <span className='story-item-name'>{name}</span>
            </div>
        </Link>
    );
}

export default storyItem;
