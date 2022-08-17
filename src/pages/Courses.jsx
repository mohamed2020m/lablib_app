import React, {useState, useEffect} from 'react'
import {useParams } from 'react-router-dom'
import Skeleton , {SkeletonTheme} from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import {Navigate } from "react-router-dom";
import {GetCategory, GetCategoryItem} from '../service/CategoryService';
import {findIdCategory, levelStr, RemoveWhiteSpace, fun} from '../helpers/helper';

import img404 from '../data/Img404.png'
import courseIcon from '../data/course-18.png'

import NoPage from "./nopage";

const Courses = () => {
    const {CategoryName} = useParams();
    const [categories, setCategories] = useState([]);
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [loaded, setLoaded] = useState(false)
    const [IsValidURL, setIsValidURL] = useState(true);

    const url = 'https://lablib-api.herokuapp.com/api/v1/image';
    const Empty = "This is an empty description as there is no decription in the db, this will be replaced if the decription for this item is available in db."

    useEffect(() => {
        async function fetchCategories(){
            try{
                let res = await GetCategory();
                if(res.ok){
                    let data = await res.json();
                    setCategories(data);
                    setLoaded(true);
                }
                else{
                    let err = await res.json();
                    setLoaded(false);
                    throw err[0].message;
                }
            }
            catch (err){
                console.log(err);
                // toast.current.show({ severity: 'error', summary: 'Failed', detail: err, life: 6000 });
            };
        }
        !categories.length && fetchCategories();
        async function fetchData(CategoryName){
            try{
                let Category_id = findIdCategory(CategoryName, categories); 
                if(Category_id){
                    let res = await GetCategoryItem(Category_id);
                    if(res.ok){
                        let data = await res.json();
                        setCourses(data);
                        setIsLoading(false);
                    }
                    else{
                        let err = await res.json();
                        throw err[0].message
                    }
                    setIsValidURL(true);
                }
                else{
                    setIsValidURL(false);
                }
            }
            catch (err){
                console.log(err);
                // toast.current.show({ severity: 'error', summary: 'Failed', detail: err, life: 6000 });
            };
        }
        categories.length && fetchData(CategoryName);
        fun();
    }, [isLoading, loaded, IsValidURL]) 

    if(!IsValidURL){
        return <NoPage/>
    }

    return(       
        <main>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><i className="icon-home mr-2"></i><a href="/">Accueil</a></li>
                    <li className="breadcrumb-item">
                        <img width="19" src={courseIcon} className="mr-2" />
                        <a href="/categories">Cours</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">{CategoryName.toUpperCase()}</li>
                </ol>
            </nav>
            <div className="ch_container">
                <div className="ch_card-content" style={{display: "none"}}>
                    {
                        !isLoading ?
                        courses.map((item) => {
                            return(
                                <div className="ch_card" key={item.id}>
                                    <div className="ch_card-image"><img src={item.image ? `${url}/${item.image}` : `${img404}`} width="100" alt="item.name" /></div>
                                    <div className="ch_card-info">
                                        <div className="ch_card_title text-center my-3">
                                            <h3><a href={`/categories/${RemoveWhiteSpace(CategoryName)}/cours/${RemoveWhiteSpace(item.name)}`}>{item.name}</a></h3>
                                        </div>
                                        <div className="ch_card_description my-3">
                                            <p>{item.description || Empty}</p>
                                        </div>
                                    </div>
                                    <div className="ch_card_body">
                                        <a href={`/categories/${RemoveWhiteSpace(CategoryName)}/cours/${RemoveWhiteSpace(item.name)}`} className="btn border-dark ch_btn">Commencer le cours</a>
                                    </div>
                                    <div className="ch_card-footer">
                                        <span className="mx-2">Niveau: <strong className={`text-${levelStr(item.level)[0]}`}>{levelStr(item.level)[1]}</strong></span> 
                                        | <span className="mx-2">{item.chapters} Chapitres</span>
                                    </div>
                                </div>
                            )
                        })
                        :
                        [1,2,3,4,5,6].map((item) => {
                            return(
                                <SkeletonTheme baseColor="#202020" highlightColor="#444" key={item}>
                                <div className="ch_card">
                                    <div className="ch_card-image">
                                        <Skeleton circle={true}/>
                                    </div>
                                    <div className="ch_card-info">
                                        <div className="ch_card_title my-3">
                                            <Skeleton/>
                                        </div>
                                        <Skeleton count={3} height={25}/>
                                    </div>
                                    <div className="ch_card_body">
                                        <Skeleton/>
                                    </div>
                                    <div className="ch_card-footer">
                                        <span className="mx-2"><Skeleton/></span>
                                    </div>
                                </div>
                                </SkeletonTheme>
                            )
                        })
                    }
                </div>
                {!isLoading && courses && courses.length > 0 ?
                    <div className="ch_pagination">
                        <li className="ch_page-item ch_previous-page ch_disable"><a className="ch_page-link" href="#">Prev</a></li>
                        <li className="ch_page-item ch_current-page ch_active"><a className="ch_page-link" href="#">1</a></li>
                        <li className="ch_page-item ch_dots"><a className="ch_page-link" href="#">...</a></li>
                        <li className="ch_page-item ch_current-page"><a className="ch_page-link" href="#">5</a></li>
                        <li className="ch_page-item ch_current-page"><a className="ch_page-link" href="#">6</a></li>
                        <li className="ch_page-item ch_dots"><a className="ch_page-link" href="#">...</a></li>
                        <li className="ch_page-item ch_current-page"><a className="ch_page-link" href="#">10</a></li>
                        <li className="ch_page-item ch_next-page"><a className="ch_page-link" href="#">Next</a></li>
                    </div>
                : null}
            </div>
        </main>
    )
}

export default Courses;