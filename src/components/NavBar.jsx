import React, { useEffect, useState } from 'react';

import {GetCategory, GetCategoryItem} from '../service/CategoryService';
import logo from '../data/logo.png'
import '../css/navBar.css'
import {RemoveWhiteSpace} from '../helpers/helper'

const Header = () => {
    const [categories, setCategories] = useState([]);
    const [courses, setCourses] = useState([]);
    const [id, setId] = useState("");
    const [onOver, setOnOver] = useState(false);
    const [activeLogin, setActiveLogin] =  useState(true);

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

    const handleClick = () => {
        window.body.style.color = '#333'
        setActiveLogin(true);
    }

    const closeLoginPg = () => {
        window.body.style.color = '#fff'
        setActiveLogin(false);
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
                                    <div class="inner-form">
                                    <div class="row">
                                        <div class="input-field second">
                                            <input type="search" placeholder="Recherche" />
                                        </div>
                                    </div>
                                    </div>
                                </form>
                            </div>
                            <div className='d-flex js-clone-singUpLoginBtns singUpLoginBtns'>
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