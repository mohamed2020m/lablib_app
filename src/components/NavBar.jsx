import React, { useEffect, useState } from 'react';

import {GetCategory, GetCategoryItem} from '../service/CategoryService';
import logo from '../data/logo.png'
import '../css/navBar.css'

const Header = () => {
    const [categories, setCategories] = useState([]);
    const [courses, setCourses] = useState([]);
    const [id, setId] = useState("");

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
        fetchCategories();
        id &&  fetchCourses();

    }, [id]) 

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
        <header className="site-navbar js-sticky-header site-navbar-target container_top_progress_bar" role="banner">
            <div className="container-fluid header_Should_be_on_top">
                <nav className="site-navigation d-flex justify-content-between align-items-center" role="navigation">
                    <div className='d-flex align-items-center'>
                        <a href="/">
                            <img src={logo} width="48" height="45" alt="logo" />
                        </a>
                        <ul className="site-menu js-clone-nav m-0 d-none d-lg-block">
                            <li><a href="index.html" className="nav-link"><i className="icon-home"></i> Accueil</a></li>
                            <li className="has-children">
                                <a href="#" className="nav-link">Cours</a>
                                {categories.length ?
                                <ul className="dropdown arrow-top">
                                    {categories.map((category) => (
                                        <li className="has-children" key={category.id}>
                                            <a href="#" onMouseOver={() => setId(category.id)}>{category.name}</a>
                                            <ul className="dropdown">
                                                {id ? 
                                                    courses.map((course) => (
                                                        <li key={course.id}><a href="#">{course.name}</a></li>
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
                            <li><a href="contatct.html" className="nav-link">Contact</a></li>
                        </ul>
                    </div>
                    <form className="js-clone-formSerach navbar-form form-inline ml-auto searchbar">
                        <div className="input-group search-box">								
                            <input type="text" id="search" className="form-control" aria-label="Search" placeholder="Chercher ici..." />
                            <div className="input-group-append">
                                <button type="submit" className="border-0 px-3"><i className="icon-search text-white"></i></button>
                            </div>
                        </div>
                    </form>
                    <div className="navbar-nav ml-auto">
                        <ul className="site-menu js-clone-nav m-0 d-none d-lg-block">
                            <li><a href="login.html" className="nav-link">Login</a></li>
                            <li><a href="signup.html" className="nav-link"><span className="signup-btn">Sign Up</span></a></li>
                        </ul>
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