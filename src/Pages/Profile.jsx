import React,{useContext} from 'react';
import ThemeContext from '../lib/ThemeContext'



const Profile = () => {
    const {theme} = useContext(ThemeContext)
    return (
        <>{theme}</>
    );
};

export default Profile;