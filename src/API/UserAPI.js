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
import ErrorLogin from '../configData/ErrorLogin';
import URL from '../constants'
const UserAPI = () => {
    const usehisory=useHistory()
    const[User,setUser] =useRecoilState(UserData)
    const[listMess,setListMess] =useRecoilState(listMessUser)
    const [listStory,setListStory]=useRecoilState(StoryData)
    const[listnotify,setListNotify]=useRecoilState(NotifyData)
    const[RequestAddFriend,setListRequestAddFriend]=useRecoilState(ListRequestAddFriend)
    const[RequestAddFriendSent,setListRequestAddFriendSent]=useRecoilState(ListRequestAddFriendSent)
    const [listfriends,setListFriends]=useRecoilState(Friends)
    const [errorLogin,setErrorLogin]=useRecoilState(ErrorLogin)
    const loadUser=async ()=>{
        if(localStorage.getItem('token_user'))
        {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('token_user');
        }
        else{
           delete axios.defaults.headers.common['Authorization'] ;
        }
        try {
            const res=await axios.get(`${URL}/api/user`)
            if(res.data.success)
            {
                setUser({user:res.data.user})
                setListNotify([...res.data.user.notify])
                 setListRequestAddFriend([...res.data.user.RequestAddfriend])
                setListRequestAddFriendSent([...res.data.user.RequestAddfriendSent])
                setListFriends([...res.data.user.friends])
                setErrorLogin('')

            }
        } catch (error) {
            console.log('loi khi get user')
            setUser({user:null})
            localStorage.removeItem('token_user')
        }
    }
    const login=async(data)=>{
        try {
            const res = await axios.post(`${URL}/api/user/login`,data)
            console.log(`${URL}/api/user/login`)
            if(res.data.success)
            {
               usehisory.push('/')
               localStorage.setItem('token_user',res.data.accesstoken) ;
               loadUser();
            }
        } catch (error) {
            setErrorLogin('có vấn đề về tài khoản và mật khẩu,vui lòng đăng nhập lại')
        }
    }
    const logout=async()=>{
        localStorage.removeItem('token_user')
        window.location.reload()
    }
    const register=async(data)=>{
        try {
            const res=await axios.post(`${URL}/api/user/register`,data)
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
        const user=await axios.get(`${URL}/api/user/getuserbyid/${id}`);
           if(user.data.success) return user.data.user
        } catch (error) {
            console.log(error)
        }
        
    }
    const getUserByUserId=async(id)=>{
        try {
        const user=await axios.get(`${URL}/api/user/getuserbyuserid/${id}`);
           if(user.data.success) return user.data.user
        } catch (error) {
            console.log(error)
        }
        
    }
    
    const getListMess=async(id)=>{
        try{
            const res= await axios.get(`${URL}/api/user/getlistmess/${id}`)
            if(res.data.success){
                setListMess([...res.data.list])
            }
        }
        catch(e){
            console.log(e)
        }
    }
    const createStory=async(data)=>{
        try{
            const res= await axios.post(`${URL}/api/story/create`,data,
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
    }
    const getStorys=async(data)=>{
        try{
            const res= await axios.get(`${URL}/api/story`)
            if(res.data.success){
                console.log(res.data.storys)
                setListStory([...res.data.storys])
            }
        }
        catch(e){
            console.log(e)
        }
    }



    return {loadUser,login,register,logout,getUserById,getListMess,createStory,getStorys,getUserByUserId};
}

export default UserAPI;
