import axios from 'axios';
import React from 'react';
import { useRecoilState } from 'recoil';
import PostData from '../configData/PostData';
import URL from '../constants'
const PostAPI = () => {
    const [posts,setPost]=useRecoilState(PostData)
    const getPosts=async()=>{
            axios.get(`${URL}/api/post/getpost`).
            then(res=>{

                setPost([...res.data.posts])
            }).catch(err=>console.log(err))
        
    }
    const deletePost=async(data)=>{
        console.log(data)
       await axios.post(`${URL}/api/post/delete`,data)
        .then(res=>{
            getPosts()
        }).catch(er=>console.log(er))
    }
    const getPostsByIdUser=async (id)=>{
        try {
         const res=await axios.get(`${URL}/api/post/getpostbyuserid/${id}`)

            if (res.data.success){
                console.log(res.data.list)
                return res.data.list
                }
        }
         catch (error) {
             console.log(error)
        }
    } 
    const getPostsById=async (id)=>{
        try {
         const res=await axios.get(`${URL}/api/post/getpostbyid/${id}`)

            if (res.data.success){
                console.log(res.data.post)
                return res.data.post
                }
        }
         catch (error) {
             console.log(error)
        }
    } 
    return {getPosts,deletePost,getPostsByIdUser,getPostsById};
}

export default PostAPI;
