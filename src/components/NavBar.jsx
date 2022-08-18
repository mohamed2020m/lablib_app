import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'
import {GetCategory, GetCategoryItem} from '../service/CategoryService';
import {GetDetailsMe} from '../service/UserService';
import {RemoveWhiteSpace} from '../helpers/helper'
import logo from '../data/logo.png'
import '../css/navBar.css'

const Header = () => {
    const [categories, setCategories] = useState([]);
    const [courses, setCourses] = useState([]);
    const [id, setId] = useState("");
    const [clickedAvatar, setClickedAvatar] = useState(false);
    const [userDetails, setUseDetails] = useState({});
    const {user} = useAuthContext();
    const { logout } = useLogout()
    
    const url = 'https://lablib-api.herokuapp.com/api/v1/image';

    useEffect(() => {
        async function fetchCategories(){
            try{
                let res = await GetCategory();
                if(res.ok){
                    let data = await res.json();
                    setCategories(data);
                }
                else{
                    let err = await res.json();
                    throw err[0].message
                }
            }
            catch (err){
                console.log(err);
                // toast.current.show({ severity: 'error', summary: 'Failed', detail: err, life: 6000 });
            };
        }

        async function fetchCourses(){
            try{
                let res = await GetCategoryItem(id);
                if(res.ok){
                    let data = await res.json();
                    setCourses(data);
                    setIsLoading(false);
                }
                else{
                    let err = await res.json();
                    throw err[0].message
                }
            }
            catch (err){
                console.log(err);
                // toast.current.show({ severity: 'error', summary: 'Failed', detail: err, life: 6000 });
            };
        }
        async function fetchAvatar(){
            try{
                console.log("user: ", user);
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
        !categories.length && fetchCategories();
        id &&  fetchCourses();
        fetchAvatar();

    }, [id]) 

    const handleClick = () => {
        setTimeout(() =>{
            logout()
        }, 2000)
    }
 
    return (
        <>
        <header className='js-sticky-header' role="banner"> 
            <div>
                <nav className='d-flex align-itmes-center'>
                    <div className="navbar">
                        <i className='bx bx-menu'></i>
                        <div className="logo">
                            <a href="/">
                                <img src={logo} width="48" height="45" alt="logo" />
                            </a>
                        </div>
                        
                        <div className="nav-links">
                            <div className="row align-items-center sidebar-logo">
                                <div className='col-10 d-flex justify-content-center'>
                                    <a href="/">
                                        <img src={logo} width="48" height="45" alt="logo" />
                                    </a>
                                </div>
                                <div className="col-2 d-flex justify-content-center">
                                    <i className='bx bx-x close_btn'></i>
                                </div>
                            </div>
                            <ul className="links">
                                <li><a href="/" ><i className="icon-home"></i> Accueil</a></li>
                                <li>
                                    <a href="/categories"><i className="fa fa-list-alt mr-1"></i>Cours</a>
                                    <i className='bx bxs-chevron-down categories-arrow arrow'></i>
                                    {categories.length ?
                                    <ul className="categories-sub-menu sub-menu">
                                        {categories.map((category) => (
                                            <li className="more" key={category.id}>
                                                <span>
                                                    <a href={`/categories/${RemoveWhiteSpace(category.name)}`} onMouseOver={() => setId(category.id)} onClick={() => setId(category.id)}>
                                                        {category.name}
                                                        <i className='bx bxs-chevron-right arrow more-arrow'></i>
                                                    </a>
                                                </span>
                                                <ul className="more-sub-menu sub-menu">
                                                    {id ? 
                                                        courses.map((course) => (
                                                            <li key={course.id}>
                                                                <a href={`/categories/${RemoveWhiteSpace(category.name)}/cours/${RemoveWhiteSpace(course.name)}`}>{course.name}</a>
                                                            </li>
                                                        ))
                                                        : null
                                                    }
                                                </ul>
                                            </li>
                                        ))}
                                    </ul>
                                    : null
                                    }
                                </li>
                                <li><a href="/about"><i className="fa fa-info-circle mr-1"></i> à propos</a></li>
                                <li><a href="/contact" ><i className="fa fa-address-book mr-1"></i> Contactez Nous</a></li>
                            </ul>
                        </div>
                        
                        <div>
                            <div className="d-flex">
                                {!user ?
                                <>  
                                <div className="search-box">
                                    <i className='bx bx-search'></i>
                                    <div className="input-box">
                                        <input type="text" placeholder="Search..." />
                                    </div>
                                </div>

                                <div className='d-flex singUpLoginBtns'>
                                    <a 
                                        className="ml-2 py-2 px-3 text-dark login_btn" 
                                        href="/login"
                                        >Login
                                    </a>
                                    <a 
                                        className="mx-2 py-2 px-3 text-white singup_btn" 
                                        href="/register"
                                        >Sign UP
                                    </a>
                                </div>
                                </>
                                :
                                <div className=''>
                                    <div className='avatar-warrper'>
                                        <img src={`${url}/${userDetails.image}`} className="Avatar_image" alt="avatar" onClick={() => setClickedAvatar((preValue => !preValue))}/>
                                    </div>
                                    {clickedAvatar &&
                                        <div className='d-flex flex-column profile_box'>
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
                                            <button onClick={handleClick}>Log out</button>
                                        </div>
                                    }
                                </div>
                                }
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            <div className="top_progress_container">
                <div className="top_progress_bar" id="myBar"></div>
            </div> 
        </header>
    </>
    )
}

export default Header;