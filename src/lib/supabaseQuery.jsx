import React,{ createContext,useContext } from "react";
import {supabase} from "./supabase"
import generateUsernameFromEmail from "generate-username-from-email"; 


export const newUserProfile = (email)=>{
  const username = generateUsernameFromEmail(email) + Math.floor(100000 + Math.random() * 900000)
  return username
}

export const getUserProfile = async (id)=>{
  const {data,error,status} = await supabase
  .from('profiles')
  .select('id_user,username')
  .single()
  if(error && status != 406){
    return error
  }
  return data
}

export const getAllPosts = async () =>{
  const { data, error } = await supabase
    .from('posts')
    .select('*, users(raw_user_meta_data)')
  if (error) {
    throw new Error(error.message);
  }
  return data;
}



export const getPostsByCategory = async (category) =>{
  const { data, error } = await supabase
    .from('posts')
    .select('*,users(name)')
    .ilike('category', `%${category.category}%`);
  if (error) {
    throw new Error(error.message);
  }

  return data;
}


export const setUserChanges = async (id,data) =>{
  console.log(data)
  const {user,error} = await supabase.auth.updateUser(
    {
      email : data.email,
      data : {
        name : data.name,
        username : data.username,
        avatar_url : data.avatar_url
      }}
    )
    
    if(error) throw new Error(error.message)
    return user
}

// export const deleteAvatarsIfExist = async (url) =>{

//   const { data, error } = await supabase
//   .storage
//   .deleteBucket(url)

//   if(error) throw new Error(error.message)
//   return data
// }

// export const setUserChangePub = async (id,d)=>{
//   const {error} = await supabase.from('users').update(d).eq('id',id)
//   if(error && error.message=='') throw new Error(error.message)
// }