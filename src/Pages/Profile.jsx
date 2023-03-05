import { supabase } from '../lib/supabase';
import React,{useContext, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../lib/AuthContext';
import { setUserChanges } from '../lib/supabaseQuery';

const Profile = () => {
    const {session, setSession} = useContext(AuthContext)
    const [message , setMessage]= useState(null)
    const [id] = useState(session.user.id)
    const [uploading, setUploading] = useState(false)
    const [userdata,setUserdata] = useState({
        'name' : session.user.user_metadata.name,
        'email' : session.user.email,
        'username' : session.user.user_metadata.username,
        'avatar_url' : session.user.user_metadata.avatar_url
    })

    const handleFormChange = (e) =>{
        const {name, value} = e.target
        setUserdata((prevState) =>({
          ...prevState,
          [name] : value
        }))
      }

    const handleSave = ()=>{
        setUserChanges(id,userdata)
        setMessage("Berhasil diupdate, jika email diganti cek email kamu untuk verifikasi perubahan.")
        
        setTimeout(() => {
            setMessage('')
        }, 3000);
    }
    
    useEffect(() => {
        if (userdata.avatar_url) {
            downloadImage(userdata.avatar_url)
        }
      }, [userdata.avatar_url])
    
    const downloadImage = async (path) => {
          const { data, error } = await supabase.storage.from('avatars').download(path)
          if (error) {
            throw error
          }
          const url = URL.createObjectURL(data)
          
          setUserdata({...userdata, avatar_url : url})
      }

    const uploadAvatar = async (event) => {
        try {
          setUploading(true)
    
          if (!event.target.files || event.target.files.length === 0) {
            throw new Error('You must select an image to upload.')
          }
    
          const file = event.target.files[0]
          const fileExt = file.name.split('.').pop()
          const fileName = `${Math.random()}.${fileExt}`
          const filePath = `${fileName}`
    
          let { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)
    
          if (uploadError) {
            throw uploadError
          }
          
          const modifiedData = {...userdata, avatar_url : fileName}
          setUserdata(modifiedData)
          setUserChanges(id,modifiedData)

        
    
        } catch (error) {
          alert(error.message)
        } finally {
          setUploading(false)
        }
      }
    return (
        
        <div className='md:container mx-auto flex  flex-col items-center bg-yellow-100-300 h-full border-4 my-5' >
                {message ? 
                <div className="alert alert-success shadow-lg mt-2 w-96">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>{message}</span>
                    </div>
                </div> 
                : ''}
                <div className="my-5">
                    <div className="avatar flex justify-center">
                        <div className="w-52 rounded-xl border-4 border-blue-400">
                            <img src={userdata.avatar_url == '' ? `https://place-hold.it/400x400/666/fff/000?text=${userdata.username}&fontsize=23` : userdata.avatar_url } />
                        </div>
                    </div>
                    <div className='set-avatar-btn justify-center flex my-2'>
                         <input type="file" onChange={uploadAvatar} disabled = {uploading} className="file-input file-input-bordered file-input-info w-full max-w-xs" accept='image/*' />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Your Name</span>
                        </label>
                            <input type="text" name='name' defaultValue={userdata.name} className="input input-bordered" onChange={handleFormChange}/>
                    </div>
                    
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Your Email</span>
                        </label>
                            <input type="text" name='email' defaultValue={userdata.email} onChange={handleFormChange} className="input input-bordered" />
                    </div>
                    
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Your Username</span>
                        </label>
                            <input type="text" name='username' defaultValue={userdata.username} className="input input-bordered" onChange={handleFormChange}  />
                    </div>
                    
                    <div className='flex flex-row gap-2 justify-center my-4'>
                        <button className='btn btn-outline btn-error' onClick={handleSave}>Save Changes</button>
                        <Link to={'/'} className='btn btn-info btn-outline'>Back</Link>
                    </div>
                    <div className='flex justify-center'>
                        <button className='btn btn-link'>Change Password?</button>
                    </div>
                </div>
        </div>
    );
};

export default Profile;