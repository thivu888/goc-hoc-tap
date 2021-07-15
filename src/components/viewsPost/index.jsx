import React,{useEffect,useState,useRef} from 'react';
import { useHistory, useParams, } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import PostData from '../../configData/PostData';
import News from '../newsItem/news';
import CloseIcon from '@material-ui/icons/Close';

const Index = ({socket}) => {
    const videoRef=useRef()
    const params=useParams()
    const [item,setItem]=useState(null)
    const posts=useRecoilValue(PostData)
    useEffect(() => {
       const post= posts.find(item=>item._id===params.id)
       setItem(post)
       
    }, [params.id]);
    const history=useHistory()
    return (
        <div className='container-fluid' style={{position:'fixed',top:'0',left:'0',bottom:'0',overflow:'hidden'}}>
            <div className='row'>
                <div className='col-xl-8 col-xxl-8 col-lg-8' style={{margin:'0',padding:'0'}}>
                    <div style={{width:'100%',height:'100%',backgroundColor:'#000'}}>
                        {item&&item.img!=""?<img className='d-inline-block' style={{objectFit:'contain',maxHeight:'100vh'}}  src={item&&item.img}/>:null}
                        {item&&item.video!=''?<video ref={videoRef} controls autoPlay={true} style={{maxHeight:'100vh',width:'100%'}}  >
                            <source src={item.video}/>
                        </video>:null
                        }
                    </div>
                    <div style={{position:'absolute',top:'80px',left:'30px',color:'#fff',cursor:'pointer'}} onClick={()=>history.goBack()}><CloseIcon/></div>
                </div>

                <div className='col-xl-4 col-xxl-4 col-lg-4 mb-5' style={{margin:'0',padding:'0',maxHeight:'100vh',overflowY:'scroll'}}>
                    <div  style={{width:'100%',height:'100%',marginTop:'50px'}}>
                        { item&&<News item={item} view={true} media={false} socket={socket} />}
                    </div>
                </div>   
            </div>             
        </div>
    );
}

export default Index;
