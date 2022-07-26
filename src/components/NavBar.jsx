import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext'
import {GetCategory, GetCategoryItem} from '../service/CategoryService';
import {RemoveWhiteSpace} from '../helpers/helper'
import logo from '../data/logo.png'
import '../css/navBar.css'

import Avatar from '../components/Avatar';

const Header = () => {
    const [categories, setCategories] = useState([]);
    const [courses, setCourses] = useState([]);
    const [id, setId] = useState("");
    const {user} = useAuthContext();
    const [isErrorCategory, setErrorCategory] = useState(false);
    const [isErrorCourse, setErrorCourses] = useState(false);

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
                console.warn(err);
                setErrorCategory(true)
            };
        }

        async function fetchCourses(){
            try{
                let res = await GetCategoryItem(id);
                if(res.ok){
                    let data = await res.json();
                    setCourses(data);
                }
                else{
                    let err = await res.json();
                    throw err[0].message
                }
            }
            catch (err){
                console.warn(err);
                setErrorCourses(true)
            };
        }

        !categories.length && fetchCategories();
        
        id &&  fetchCourses();

    }, [id, isErrorCategory, isErrorCourse]) 


    return (
        <>
        <header className='js-sticky-header' role="banner"> 
            <div>
                <nav className='d-flex align-itmes-center top_nav'>
                    <div className="navbar">
                        <i className='bx bx-menu'></i>
                        <div className="logo">
                            <a href={user?.token ? "/home" : "/"}>
                                <img src={logo} width="48" height="45" alt="logo" />
                            </a>
                        </div>
                        
                        <div className="nav-links">
                            <div className="row align-items-center sidebar-logo">
                                <div className='col-10 d-flex justify-content-center'>
                                    <a href={user?.token ? "/home" : "/"}>
                                        <img src={logo} width="60" height="60" alt="logo" />
                                    </a>
                                </div>
                                <div className="col-2 d-flex justify-content-center">
                                    <i className='bx bx-x close_btn'></i>
                                </div>
                            </div>
                            <ul className="links">
                                <li><a href={user?.token ? "/home" : "/"} ><i className="icon-home"></i> Accueil</a></li>
                                { user?.token &&
                                <li>
                                    <a href="/categories"><i className="fa fa-list-alt mr-1"></i>Cours</a>
                                    <i className='bx bxs-chevron-down categories-arrow arrow'></i>
                                    {
                                        isErrorCategory ? 
                                        <ul className="categories-sub-menu sub-menu">
                                            <li>
                                                <span>Oops, Sth went wrong</span>
                                            </li>
                                        </ul>
                                        :
                                        <>
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
                                                    {
                                                        isErrorCourse ?
                                                            <ul className="more-sub-menu sub-menu">
                                                                <li>
                                                                    <span>Sth went wrong</span>
                                                                </li>
                                                            </ul>
                                                        :
                                                        <>
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
                                                        </>
                                                    }
                                                </li>
                                            ))}
                                        </ul>
                                        : null
                                        }
                                        </>
                                    }
                                </li>
                                }
                                <li><a href="/about"><i className="fa fa-users mr-1"></i> Equipe</a></li>
                                <li><a href="/contact" ><i className="fa fa-address-book mr-1"></i> Contactez Nous</a></li>
                            </ul>
                        </div>
                        
                        <div>
                            <div className="d-flex">
                                {!user?.token ?
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
                                :
                                <div>
                                    <Avatar />
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