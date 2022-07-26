import React, {useState, useEffect}from 'react'
import { useParams } from 'react-router-dom'
import Skeleton , {SkeletonTheme} from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

import {GetCategory, GetCategoryItem} from '../service/CategoryService';
import {findIdCategory, levelStr, RemoveWhiteSpaceNameFromURL} from '../helpers/helper';

import img404 from '../data/Img404.png'

const Courses = () => {
    const {CategoryName} = useParams();
    const [categories, setCategories] = useState([]);
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [loaded, setLoaded] = useState(false)

    const url = 'https://lablib-api.herokuapp.com/api/v1/image';

    useEffect(() => {
        console.log("categories")
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
                    throw err[0].message;
                    setLoaded(false);
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
                let res = await GetCategoryItem(findIdCategory(CategoryName, categories));
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
        categories.length && fetchData(CategoryName);
        
        function getPageList(totalPages, page, maxLength){
            function range(start, end){
                return Array.from(Array(end - start + 1), (_, i) => i + start);
            }
            
            var sideWidth = maxLength < 9 ? 1 : 2;
            var leftWidth = (maxLength - sideWidth * 2 - 3) >> 1;
            var rightWidth = (maxLength - sideWidth * 2 - 3) >> 1;
            
            if(totalPages <= maxLength){
                return range(1, totalPages);
            }
            
            if(page <= maxLength - sideWidth - 1 - rightWidth){
                return range(1, maxLength - sideWidth - 1).concat(0, range(totalPages - sideWidth + 1, totalPages));
            }
            
            if(page >= totalPages - sideWidth - 1 - rightWidth){
                return range(1, sideWidth).concat(0, range(totalPages- sideWidth - 1 - rightWidth - leftWidth, totalPages));
            }
            
            return range(1, sideWidth).concat(0, range(page - leftWidth, page + rightWidth), 0, range(totalPages - sideWidth + 1, totalPages));
        }
        
        function fun(){
            var numberOfItems = $(".ch_card-content .ch_card").length;
            var limitPerPage = 6; //How many card items visible per a page
            var totalPages = Math.ceil(numberOfItems / limitPerPage);
            var paginationSize = 7; //How many page elements visible in the pagination
            var currentPage;
            
            function showPage(whichPage){
                if(whichPage < 1 || whichPage > totalPages) return false;
            
                currentPage = whichPage;
            
                $(".ch_card-content .ch_card").hide().slice((currentPage - 1) * limitPerPage, currentPage * limitPerPage).show();
            
                $(".ch_pagination li").slice(1, -1).remove();
            
                getPageList(totalPages, currentPage, paginationSize).forEach(item => {
                $("<li>").addClass("ch_page-item").addClass(item ? "ch_current-page" : "ch_dots")
                .toggleClass("ch_active", item === currentPage).append($("<a>").addClass("ch_page-link")
                .attr({href: "javascript:void(0)"}).text(item || "...")).insertBefore(".ch_next-page");
                });
            
                $(".ch_previous-page").toggleClass("ch_disable", currentPage === 1);
                $(".ch_next-page").toggleClass("ch_disable", currentPage === totalPages);
                return true;
            }
            
            $(".ch_pagination").append(
                $("<li>").addClass("ch_page-item").addClass("ch_previous-page").append($("<a>").addClass("ch_page-link").attr({href: "javascript:void(0)"}).text("Prev")),
                $("<li>").addClass("ch_page-item").addClass("ch_next-page").append($("<a>").addClass("ch_page-link").attr({href: "javascript:void(0)"}).text("Next"))
            );
            
            $(".ch_card-content").show();
            showPage(1);
            
            $(document).on("click", ".ch_pagination li.ch_current-page:not(.ch_active)", function(){
                return showPage(+$(this).text());
            });
            
            $(".ch_next-page").on("click", function(){
                return showPage(currentPage + 1);
            });
            
            $(".ch_previous-page").on("click", function(){
                return showPage(currentPage - 1);
            });
        };
        fun();

    }, [isLoading, loaded]) 

    console.log("findIdCategory(programmation-c/s, categories): ", findIdCategory("programmation-c/s", categories))
    return(
        <main>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><i className="icon-home mr-2"></i><a href="./../index.html">Accueil</a></li>
                <li className="breadcrumb-item">
                    <img width="19" src="./../assets/images/new/course-18.png" className="mr-2" />
                    <a href="./../cours.html">Cours</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">Développement Mobile</li>
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
                                        <h3><a href="Développement Mobile/kotlin.html">{item.name}</a></h3>
                                    </div>
                                    <div className="ch_card_description my-3">
                                        <p>{item.description || "Empty"}</p>
                                    </div>
                                </div>
                                <div className="ch_card_body">
                                    <a href="Développement Mobile/kotlin.html" className="btn border-dark ch_btn">Commencer le cours</a>
                                </div>
                                <div className="ch_card-footer">
                                    <span className="mx-2">Niveau: <strong className={`text-${levelStr(item.level)[0]}`}>{levelStr(item.level)[1]}</strong></span> 
                                    | <span className="mx-2">{item.chapters} Chapitres</span>
                                </div>
                            </div>
                        )
                    })
                    :
                    Array(6).fill(0).map((item) => {
                        return(
                            <SkeletonTheme baseColor="#202020" highlightColor="#444">
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