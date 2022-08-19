import React, { useEffect, useState } from 'react';
import {GetDetailsMe} from '../service/UserService';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';
import Avatar_image from '../data/avatar.png';


export default function Avatar() {
    const [userDetails, setUseDetails] = useState({});
    const {user} = useAuthContext();
    const { logout } = useLogout();
    const [clickedAvatar, setClickedAvatar] = useState(false);
    const [logoutBtnClicked, setLogoutBtnClicked] = useState(false);

    const url = 'https://lablib-api.herokuapp.com/api/v1/image';

    useEffect(() => {
        async function fetchAvatar(){
            try{
                if(user){
                    let res = await GetDetailsMe(user.token);
                    if(res.ok){
                        let d = await res.json();
                        setUseDetails(d);
                    }
                    else{
                        let err = await res.json();
                        throw err[0].message
                    }
                }
            }
            catch(err){
                console.log("err: ", err);
            }
        }
        fetchAvatar();
    }, []) 


    const handleClick = () => {
        setTimeout(() =>{
            logout()
        }, 2000)
        setLogoutBtnClicked(true);
    }

    return (
        <>
        <div className='avatar-warrper'>
            <img src={userDetails.image ? `${url}/${userDetails.image}`: Avatar_image} className="Avatar_image" onClick={() => setClickedAvatar((preValue => !preValue))}/>
        </div>
        {clickedAvatar &&
            <div className='d-flex flex-column profile_box'>
                {user.role === 1 ? 
                <a href="https://admin-lablib.herokuapp.com" className='mr-1'>
                    <div>
                        <i className="fa fa-cog"></i>
                        <span className='ml-2'>Admin Panel</span>
                    </div>
                </a>
                :null
                }
                <a href="/profile" className='mr-1'>
                    <div>
                        <i className="fa fa-user"></i>
                        <span className='ml-2'>Profile</span>
                    </div>
                </a>
                <a href="/settings" className='mr-1'>
                    <div>
                        <i className="fa fa-cog"></i>
                        <span className='ml-2'>Settings</span>
                    </div>
                </a>
                <hr />
                {
                !logoutBtnClicked ?
                <button onClick={handleClick}>Log out</button>
                :
                <button disabled>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                </button>
                }
            </div>
        }
        </>
    )
}
