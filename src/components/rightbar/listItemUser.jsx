import React from 'react';

const listItemUser = ({user,setChatBoxShow,setUserConnect}) => {
    return (
        <li  style={{width:'100%'}} className='ml-3 p-2' onClick={()=>{setChatBoxShow(true);setUserConnect(user)}}>
                <div className='d-flex item-user cursor-pointer' style={{width:'100%',height:"100%"}}>
                    <div className='list-user-das list-user-das-rightbar d-flex 'style={{cursor:'pointer',borderRadius:'12px',}}>
                        <img  style={{width:'36px',height:'36px',borderRadius:'50%'}} src={user.profilePicture}/>
                    </div>
                    <span style={{color:'#050505',marginLeft:'8px',fontWeight:'500'}}>{user.username}</span>
                </div>
        </li>
    );
}

export default listItemUser;
