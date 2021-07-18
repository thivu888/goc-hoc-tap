import React from 'react';
import Carousel from "react-multi-carousel";
import StoryItem from '../story/storyItem'
import "react-multi-carousel/lib/styles.css";
import CreateStory from './createStory';
import { useRecoilValue } from 'recoil';
import StoryData from '../../configData/StoryData';
const Index = () => {
  const storyList=useRecoilValue(StoryData)
  
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 5
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 5
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 3
        }
      };
    return (
        <div className='row'>
        <div style={{width:'100%'}}>
        <Carousel responsive={responsive} itemClass={'col'} swipeable={true} draggable={true} ssr={true} >
            <CreateStory/>
            {storyList.length>0?storyList.map(item=><StoryItem key={item._id} item={item}/>):null}
        </Carousel>
        </div>
    </div>
    );
}

export default Index;
