import React from 'react';
import axios from 'axios'
import { useRecoilState, useSetRecoilState } from 'recoil';
import UserData, { listMessUser } from '../configData/UserData'
import { useHistory } from 'react-router-dom';
import StoryData from '../configData/StoryData';
import NotifyData from '../configData/NotifyData';
import ListRequestAddFriendSent from '../configData/ListRequestAddFriendSent';
import ListRequestAddFriend from '../configData/ListRequestAddFriend';
import Friends from '../configData/Friends';
const UserAPI = () => {
    const usehisory=useHistory()
    const[User,setUser] =useRecoilState(UserData)
    const[listMess,setListMess] =useRecoilState(listMessUser)
    const [listStory,setListStory]=useRecoilState(StoryData)
    const[listnotify,setListNotify]=useRecoilState(NotifyData)
    const[RequestAddFriend,setListRequestAddFriend]=useRecoilState(ListRequestAddFriend)
    const[RequestAddFriendSent,setListRequestAddFriendSent]=useRecoilState(ListRequestAddFriendSent)
    const [listfriends,setListFriends]=useRecoilState(Friends)
    const loadUser=async ()=>{
        if(localStorage.getItem('token_user'))
        {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('token_user');
        }
        else{
           delete axios.defaults.headers.common['Authorization'] ;
        }
        try {
            const res=await axios.get('/api/user')
            if(res.data.success)
            {
                setUser({user:res.data.user})
                setListNotify([...res.data.user.notify])
                 setListRequestAddFriend([...res.data.user.RequestAddfriend])
                setListRequestAddFriendSent([...res.data.user.RequestAddfriendSent])
                setListFriends([...res.data.user.friends])
            }
        } catch (error) {
            console.log('loi khi get user')
            setUser({user:null})
            localStorage.removeItem('token_user')
        }
    }
    const login=async(data)=>{
        try {
            const res = await axios.post('/api/user/login',data)
            if(res.data.success)
            {
               usehisory.push('/')
               localStorage.setItem('token_user',res.data.accesstoken) ;
               loadUser();
            }
        } catch (error) {
            console.log(error)
        }
    }
    const logout=async()=>{
        localStorage.removeItem('token_user')
        window.location.reload()
    }
    const register=async(data)=>{
        try {
            const res=await axios.post('/api/user/register',data)
            if(res.data.success)
            {
               localStorage.setItem('token_user',res.data.accesstoken) ;
               loadUser();
            }
        } catch (error) {
            console.log(error)
        }
    }
    const getUserById=async(id)=>{
        try {
        const user=await axios.get(`/api/user/getuserbyid/${id}`);
           if(user.data.success) return user.data.user
        } catch (error) {
            console.log(error)
        }
        
    }
    ,
    getListMess=async(id)=>{
        try{
            const res= await axios.get(`api/user/getlistmess/${id}`)
            if(res.data.success){
                setListMess([...res.data.list])
            }
        }
        catch(e){
            console.log(e)
        }
    },
    createStory=async(data)=>{
        try{
            const res= await axios.post(`/api/story/create`,data,
            {
                headers: {'content-type': 'multipart/form-data'}
            })
            if(res.data.success){
                
                setListStory([...res.data.story])
            }
        }
        catch(e){
            console.log(e)
        }
    },
    getStorys=async(data)=>{
        try{
            const res= await axios.get(`/api/story`)
            if(res.data.success){
                setListStory([...res.data.storys])
            }
        }
        catch(e){
            console.log(e)
        }
    }



    return {loadUser,login,register,logout,getUserById,getListMess,createStory,getStorys};
}

export default UserAPI;
