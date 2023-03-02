import React,{ createContext,useContext } from "react";
import {supabase} from "./supabase"


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

export const registerUser = async (data) => {
  const {error} = await supabase
  .from('users')
  .insert(data)
  if (error) throw new Error(error.message);
}

export const loginUser = async (d) =>{
  const { data, error } = await supabase
    .from('users')
    .select('email,name')
    .eq('email',d.email)
    .eq('password',d.password)
  if (error) {
    throw new Error(error.message);
  }

  return data;
}