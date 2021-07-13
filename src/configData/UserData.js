import { atom, selector } from "recoil";

const UserData=atom({
    key:'user',
    default:{
        user:null
    }
})


export const listMessUser=atom({
    key:'listMessUser',
    default:[]
})

export const listUser=atom({
    key:'listuser',
    default:[]
})

export default UserData