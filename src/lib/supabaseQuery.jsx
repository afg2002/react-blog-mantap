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
    .select('*, users(name)')
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
