import axios from 'axios';
import React from 'react';
import { useRecoilState } from 'recoil';
import PostData from '../configData/PostData';
const PostAPI = () => {
    const [posts,setPost]=useRecoilState(PostData)
    const getPosts=async()=>{
            axios.get('/api/post/getpost').
            then(res=>{

                setPost([...res.data.posts])
            }).catch(err=>console.log(err))
        
    }
    const deletePost=async(data)=>{
        console.log(data)
       await axios.post('/api/post/delete',data)
        .then(res=>{
            window.location.reload()
        }).catch(er=>console.log(er))
    }
    const getPostsByIdUser=async (id)=>{
        try {
         const res=await axios.get(`/api/post/getpostbyuserid/${id}`)

            if (res.data.success){
                console.log(res.data.list)
                return res.data.list
                }
        }
         catch (error) {
             console.log(error)
        }
    } 
    return {getPosts,deletePost,getPostsByIdUser};
}

export default PostAPI;
