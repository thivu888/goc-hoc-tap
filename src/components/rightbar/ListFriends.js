import React from 'react';

const ListFriends = ({user,setChatBoxShow,setUserConnect}) => {
    return (
        <li  style={{width:'100%',borderRadius:'8px'}} className='ml-3 p-2' >
                <div onClick={()=>{setChatBoxShow(true);setUserConnect(user)}} className='d-flex item-user cursor-pointer align-items-center '  style={{width:'100%',height:"100%"}}>
                    <div className={user.isOnline?'list-user-das align-items-center  list-user-das-rightbar d-flex list-user-das-rightbar-online':'list-user-das align-items-center  list-user-das-rightbar d-flex'}style={{cursor:'pointer',borderRadius:'12px',flex:'0'}}>
                        <img  style={{width:'40px',height:'40px',borderRadius:'50%'}} src={user.profilePicture}/>
                    </div>
                    <div className='align-items-center d-flex justify-content-between' style={{flex:'2'}}>
                        <span style={{color:'#050505',marginLeft:'8px',fontWeight:'500'}}>{user.username}</span>
                    </div>
                </div>
                
        </li>
    );
}

export default ListFriends;
