import React,{useEffect,useState} from 'react';
import UserAPI from '../../API/UserAPI';

const ItemMess = ({item,setChatBoxShow,setUserConnect,userCurrent}) => {
    const{getUserByUserId}=UserAPI()
    const [user,setUser]=useState(null)
    const [check,setCheck]=useState(false)
    useEffect(async()=>{
        const ur=item.members.find(item=>item.user_id!==userCurrent.user_id)
        if(ur)
        {
        const u= await getUserByUserId(ur.user_id)
        console.log(u)
        setUser(u)}
    },[item._id])
    useEffect(() => {
       const test=  item.content.length>0&&item.content[item.content.length-1].seen==false&&item.content[item.content.length-1].userSend!=userCurrent._id
       setCheck(test)
    }, [item._id]);
    let style={
        backgroudColor:'#000'
    }
    console.log(check)
    return (
        <li onClick={()=>{setChatBoxShow(true);setUserConnect({...user})}}>
            <div className={check?'d-flex m-2 p-1 fasjg':'d-flex m-2 p-1'}>
            <img style={{width:'60px',height:'60px',float:'left',borderRadius:'50%'}} src={user&&user.profilePicture} />
            <div className='d-flex flex-column align-items-start justify-content-center '>
                <span style={{color:'#050505',marginLeft:'8px',fontWeight:'600'}}>{user&&user.username}</span>
                <span className='ml-2' style={{fontSize:'0.9375rem',lineHeight:'1.333',color:'rgb(0.5,0.5,0.5)'}}>{item&&item.content&&item.content&&item.content.length>0?item.content[item.content.length-1].content:''}</span>
            </div>
            </div>
        </li>
    );
}

export default ItemMess;
