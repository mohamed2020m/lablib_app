import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'
import {GetCategory, GetCategoryItem} from '../service/CategoryService';
import {GetDetailsMe} from '../service/UserService';
import {RemoveWhiteSpace} from '../helpers/helper'
import logo from '../data/logo.png'
import avatar from '../data/avatar.jpg'
import '../css/navBar.css'

const Header = () => {
    const [categories, setCategories] = useState([]);
    const [courses, setCourses] = useState([]);
    const [id, setId] = useState("");
    const [onOver, setOnOver] = useState(false);
    const [clickedAvatar, setClickedAvatar] = useState(false);
    const [userDetails, setUseDetails] = useState({});
    const [reload, setReload] = useState(false);
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
                else{
                    setReload(true);
                }
            }
            catch(err){
                console.log("err: ", err);
            }
        }
        !categories.length && fetchCategories();
        id &&  fetchCourses();
        fetchAvatar();

    }, [id, reload]) 
    console.log("categories: ", categories);

    const handleClick = () => {
        setTimeout(() =>{
            logout()
        }, 2000)
    }

    const hanldeOver = () => {
        setOnOver(true)
    }

    const hanldeOut = () => {
        setOnOver(false)
    }

    
    return (
        <>
        <div className="site-mobile-menu site-navbar-target">
            <div className="site-mobile-menu-header">
                <div className="site-mobile-menu-close mt-3">
                    <span className="icon-close2 js-menu-toggle"></span>
                </div>
            </div>
            <div className="site-mobile-menu-body"></div>
        </div>
        
        <header className="site-navbar js-sticky-header site-navbar-target container_top_progress_bar bg-white" role="banner">
            <div className="container-fluid header_Should_be_on_top">
                <nav className="site-navigation d-flex justify-content-between align-items-center" role="navigation">
                    <div className='d-flex justify-content-center align-items-center'>
                        <a href="/">
                            <img src={logo} width="48" height="45" alt="logo" />
                        </a>
                        <ul className="site-menu js-clone-nav m-0 d-none d-lg-block">
                            <li><a href="/" className="nav-link"><i className="icon-home"></i> Accueil</a></li>
                            <li className="has-children">
                                <a href="/categories" className="nav-link">Cours</a>
                                {categories.length ?
                                <ul className="dropdown arrow-top">
                                    {categories.map((category) => (
                                        <li className="has-children" key={category.id}>
                                            <a href={`/categories/${RemoveWhiteSpace(category.name)}`} onMouseOver={() => setId(category.id)} onClick={() => setId(category.id)}>{category.name}</a>
                                            <ul className="dropdown">
                                                {id ? 
                                                    courses.map((course) => (
                                                        <li key={course.id}><a href={`/categories/${RemoveWhiteSpace(category.name)}/cours/${RemoveWhiteSpace(course.name)}`}>{course.name}</a></li>
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
                            <li><a href="/contact" className="nav-link">Contact</a></li>
                        </ul>
                    </div>

                    <div className="d-flex my-2 mx-3 py-2 px-3">
                        <div className="d-flex align-items-center">
                            <div className='searchBar mr-3'>
                                <form>
                                    <div className="inner-form">
                                    <div className="row">
                                        <div className="input-field second">
                                            <input type="search" placeholder="Recherche" />
                                        </div>
                                    </div>
                                    </div>
                                </form>
                            </div>
                            {!user ?
                            <div className='d-flex  singUpLoginBtns'>
                                <a 
                                    className="ml-2 py-2 px-3 text-dark" 
                                    style={{border:"1px solid #0AB1CE"}}
                                    href="/login"
                                    >Login
                                </a>
                                <a 
                                    className="mx-2 py-2 px-3 text-white" 
                                    style={onOver ? {backgroundColor:"#4cd0e7"} : {backgroundColor:"#0AB1CE"}}
                                    href="/register"
                                    onMouseOver={hanldeOver}
                                    onMouseOut={hanldeOut}
                                    >Sign UP
                                </a>
                            </div>

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
                </nav>
                <div className="toggle-button d-inline-block d-lg-none">
                    <a href="#" className="site-menu-toggle py-5 js-menu-toggle text-black">
                        <span className="icon-menu h3"></span>
                    </a>
                </div>
            </div>
            <div className="top_progress_container">
                <div className="top_progress_bar" id="myBar"></div>
            </div> 
        </header>
    </>
    )
}

export default Header;