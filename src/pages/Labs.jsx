import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Skeleton , {SkeletonTheme} from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

import {GetChapiter,GetChapiters, GetChapiterItem} from '../service/ChapiterService';
import {findIdChapiter, formatDate, msToTime} from '../helpers/helper';

import courseIcon from '../data/course-18.png'
const Empty = "This is an empty description as there is no decription in the db, this will be replaced if the decription for this item is available in db."

const LabsBoxes = ({labs, isLoading}) => {
    return(
    <div className="ch_card-content" style={{display: "none"}}>
    <div className="ch_card_lab getstarted">
        <div className="ch_card-info">
            <div className="ch_card_title my-3">
                <h3><a href="#">Objectifs de Ce Cours</a></h3>
            </div>
            <div className="lab_duration my-2">
                <span><i className="icon-clock-o mr-1"></i> 1 minutes</span>
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
        <div className="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">Objectifs de Ce Cours</h5>
                    <button type="button" className="close ch_btn" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <ol className="px-3">
                        <li>Create and use variables in Kotlin</li>
                        <li>Créer et utiliser des variables dans Kotlin</li>
                        <li>Create and use functions in Kotlin</li>
                    </ol>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn border-dark ch_btn" data-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
        </div>
        <div className="ch_card_body">
            <a href="kotlin/Introduction à Kotlin.html" className="btn border-dark ch_btn" data-toggle="modal" data-target="#exampleModalLong">voir</a>
        </div>
        
        <div className="ch_card-footer">
            <cite>06 Jun 2022, par Mohamed</cite>
        </div>
    </div>
    {!isLoading ?
    labs.map((item) => (
        <div className="ch_card_lab" key={item.id}>
            <div className="ch_card-info">
                <div className="ch_card_title my-3">
                    <h3><a href="kotlin/Introduction à Kotlin.html">{item.name}</a></h3>
                </div>
                <div className="lab_duration my-2">
                    <span><i className="icon-clock-o mr-1"></i> {msToTime(item.duration)}</span>
                </div>
                <div className="ch_card_description my-3">
                    <p>{item.description || Empty}</p>
                </div>
            </div>
            <div className="ch_card_body">
                <a href="kotlin/Introduction à Kotlin.html" className="btn border-dark ch_btn">Commencer le Lab</a>
            </div>
            
            <div className="ch_card-footer">
                <cite>{formatDate(new Date(item.createdAt))}</cite>
            </div>
        </div>
    ))
    :
    Array(6).fill(0).map((item) => {
        return(
            <SkeletonTheme baseColor="#202020" highlightColor="#444" key={item+1}>
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
)}


const Labs = () => {
    const {CategoryName, CourseName, ChapiterName} = useParams();
    const [labs, setLabs] = useState([]);
    const [chapiter, setChapiter] = useState([]);
    const [chapiters, setChapiters] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        async function fetchChapiter(){
            try{
                let res = await GetChapiter(findIdChapiter(ChapiterName, chapiters));
                if(res.ok){
                    let data = await res.json();
                    setChapiter(data);
                }
                else{
                    let err = await res.json();
                    throw err[0].message;
                }
            }
            catch (err){
                console.log(err);
                // toast.current.show({ severity: 'error', summary: 'Failed', detail: err, life: 6000 });
            };
        }

        async function fetchChapiters(){
            try{
                let res = await GetChapiters();
                if(res.ok){
                    let data = await res.json();
                    setChapiters(data);
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

        async function fetchData(ChapiterName){
            try{
                let res = await GetChapiterItem(findIdChapiter(ChapiterName, chapiters));
                if(res.ok){
                    let data = await res.json();
                    setLabs(data);
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
        !chapiters.length && fetchChapiters();
        chapiters.length && fetchData(ChapiterName);
        chapiters.length && fetchChapiter(ChapiterName)

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

    console.log("chapiters: ", JSON.stringify(chapiters))
    console.log("ChapiterName: ", JSON.stringify(ChapiterName))
    console.log("findIdChapiter(ChapiterName, chapiters)", findIdChapiter(ChapiterName, chapiters))
    console.log("labs: ", labs)
    return(
        <main>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><i className="icon-home mr-2"></i><a href="/">Accueil</a></li>
                <li className="breadcrumb-item">
                    <img width="19" src={courseIcon} className="mr-2" />
                    <a href="/categories">Cours</a>
                </li>
                <li className="breadcrumb-item"><a href={`/categories/${CategoryName}`}>{CategoryName.toUpperCase()}</a></li>
                <li className="breadcrumb-item" aria-current="page"><a href={`/categories/${CourseName}`}>{CourseName.toUpperCase()}</a></li>
                <li className="breadcrumb-item active" aria-current="page">{chapiter.name}</li>
            </ol>
        </nav>
        <div className="ch_header">
            <div className='row align-items-center'>
                <div className="col-8 py-3 px-4 text-light">
                    <h2>{chapiter.name}</h2>
                    <p>{chapiter.description || Empty}</p>
                </div>
                <div className="col-md-4 d-flex justify-content-center">
                    <div className="bg-light d-flex align-items-center justify-content-center" style={{borderRadius:"20%", width:"150px" ,height:"150px"}}>
                        <div className="row ch_progress_bar">
                        <h5>50% complété</h5>
                        <div className="progress">
                            <div className="progress-bar bg-info" role="progressbar" style={{width: "50%"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
        <div className="ch_container">
                {
                    labs.length ?  
                        <LabsBoxes isLoading={isLoading} labs={labs}/>
                    :
                    <div className="flex justify-content-center align-content-center">
                        No Labs exist!
                    </div>
                }

                {!isLoading && labs && labs.length > 0 ?
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

export default Labs;
