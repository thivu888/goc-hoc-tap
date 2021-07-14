import React from 'react';
import axios from 'axios'
import { useRecoilState, useSetRecoilState } from 'recoil';
import UserData, { listMessUser } from '../configData/UserData'
import { useHistory } from 'react-router-dom';
const UserAPI = () => {
    const usehisory=useHistory()
    const[User,setUser] =useRecoilState(UserData)
    const[listMess,setListMess] =useRecoilState(listMessUser)

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
                
            }
        } catch (error) {
            console.log(error)
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
            console.log(res)
            if(res.data.success){
                console.log(res.data.list)
                setListMess([...res.data.list])
            }
        }
        catch(e){
            console.log(e)
        }
    }

    return {loadUser,login,register,logout,getUserById,getListMess};
}

export default UserAPI;
