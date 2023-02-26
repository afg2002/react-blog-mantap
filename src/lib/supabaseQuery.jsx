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
  console.log(category)
  const { data, error } = await supabase
    .from('posts')
    .select('*,users(name)')
    .ilike('category', `%${category.category}%`);
  if (error) {
    throw new Error(error.message);
  }

  return data;
}