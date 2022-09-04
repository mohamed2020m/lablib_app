import React,{useEffect, useState} from 'react'

import Skeleton , {SkeletonTheme} from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import {GetCategory} from '../service/CategoryService';
import courseIcon from '../data/course-18.png'
import {RemoveWhiteSpace, fun} from '../helpers/helper'

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    const url = 'https://lablib-api.herokuapp.com/api/v1/image';
    const Empty = "Ceci est une description vide car il n'y a pas de description dans la base de données, elle sera remplacée si la description de cet article est disponible dans la base de données."

    useEffect(() => {
        async function fetchData(){
            try{
                let res = await GetCategory();
                if(res.ok){
                    let data = await res.json();
                    setCategories(data);
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
        fetchData();

        fun();

    }, [isLoading]) 

    return(
        <main>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><i className="icon-home mr-2"></i><a href="/">Accueil</a></li>
                <li className="breadcrumb-item active" aria-current="page">
                    <img width="19" src={courseIcon} className="mr-2" />
                    Cours
                </li>
            </ol>
        </nav>

        <div className="ch_container">
            <div className="ch_card-content" style={{display: "none"}}>
                { !isLoading ?
                    categories.map((item) => {
                        return(
                            <div className="ch_card" key={item.id}>
                                <div className="ch_card-image">
                                    { item.image ?
                                        <img src={`${url}/${item.image}`} style={{width:'128px', height:'128px'}} alt={item.name} />
                                    :
                                        <div className="spinner-border text-light" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>    
                                    }
                                </div>
                                <div className="ch_card-info">
                                    <div className="ch_card_title my-3">
                                        <h3><a href={`/categories/${RemoveWhiteSpace(item.name)}`}>{item.name}</a></h3>
                                    </div>
                                    <div className="ch_card_description my-3">
                                        <p>{item.description || Empty}</p>
                                    </div>
                                </div>
                                <div className="ch_card_body">
                                    <a href={`/categories/${RemoveWhiteSpace(item.name)}`} className="btn border-dark ch_btn">Explorer</a>
                                </div>
                                <div className="ch_card-footer">
                                    <span className="mx-2">{item.courses} Cours</span>
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
            
            {!isLoading && categories && categories.length > 0 ?
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

export default Categories;