import React, { useState } from 'react'
import {SearchAll, SearchCategory, SearchCourse, SearchChapter} from '../service/SearchService'
import '../css/Search.css'
import {RemoveWhiteSpace} from '../helpers/helper'

const url = "https://lablib-api.herokuapp.com/api/v1/image";


export default function Search() {
    const [seachSection, setSearchSection] = useState("tous")
    const [searchBody, serSeachBody] = useState("")
    const [searchBoxResult,  setSearchBoxResult] = useState(null);
    const [loading, setLoading] = useState(false);

    async function handleClick(e){
        e.preventDefault();
        let data;
        setLoading(true);

        if(searchBody){
            data = {
                search: {text : searchBody}
            }
        }

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(data),
        };
        
        try{
            let res;
            switch (seachSection){
                case "tous":
                    res = await SearchAll(requestOptions);
                    break;
                case "category" :
                    res = await SearchCategory(requestOptions);
                    break;
                case "course" :
                    res = await SearchCourse(requestOptions);
                    break;
                case "chapter" : 
                    res = await SearchChapter(requestOptions);
                    break;
                default:
                    console.log("No a valid choice!");
                    setSearchBoxResult(null);
            }
            if (res.ok){
                let d = await res.json();
                setSearchBoxResult(d);  
                setLoading(false);
            }
            else{
                let r = await res.json()
                throw r[0].message;
            }
        }
        catch (err){
            console.warn("err: ", err);        
        } 
    }
    return (
        <>
            <form className="form-inline form_search_container">
                <div className="mbl">
                    <select value={seachSection ? seachSection : "tous"} className="form-control rounded-0" id="select_btn" onChange={(e) => {setSearchSection(e.target.value)}}>
                        <option value="tous">Tous</option>
                        <option value="category">Categories</option>
                        <option value="course">Cours</option>
                        <option value="chapter">Chapiters</option>
                    </select>
                </div>
                <div className='d-flex align-items-center mbl-search'>
                    <div className='search'>
                        <input className="form-control mx-2 rounded-0" id="search" type="search" placeholder="Chercher..." aria-label="Search" onChange={(e) => {serSeachBody(e.target.value)}} value={searchBody}/>
                    </div>
                    {searchBody ? <button className="btn my-2 my-0 search_btn rounded-0" type="button" onClick={handleClick} data-toggle="modal" data-target="#searchbar">
                        <div className='d-flex align-items-center'>
                            <div>
                                <i className='bx bx-search mr-2'></i>
                            </div>
                            <div>Search</div>
                        </div>
                    </button>
                    :
                    <button className="btn my-2 my-0 search_btn" disabled>
                        <div className='d-flex align-items-center'>
                            <div>
                                <i className='bx bx-search mr-2'></i>
                            </div>
                            <div>Search</div>
                        </div>
                    </button>
                    }
                </div>
            </form>

            <div className="modal fade" id="searchbar" tabIndex="-1" role="dialog" aria-labelledby="searching" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="searching"><i className='fa fa-search mr-2'></i>Résultat de la recherche</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setSearchBoxResult(null)}>
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            
                            {
                            loading ? 
                            
                            <div className='d-flex justify-content-center'><h3>searching...</h3></div> 
                            
                            : 
                            <>
                                {seachSection === 'tous' && searchBoxResult && searchBoxResult.categories.length && searchBoxResult.courses.length && searchBoxResult.chapters.length ? 
                                    <>
                                        <div>
                                            {searchBoxResult.categories.length ? <h3>Categories</h3> : null}
                                            { searchBoxResult.categories.length ?
                                            searchBoxResult.categories.map(item => {
                                                return (
                                                    <>
                                                    <div className="row result" key={item.id}>
                                                        <div className='col-3'>
                                                            <img className="searchImg" src={`${url}/${item.image}`} alt={`${item.image}`}/>
                                                        </div>
                                                        <div className='col-9 d-flex align-items-center'>
                                                            <div className="">
                                                                <h4><a href={`/categories/${RemoveWhiteSpace(item.name)}`}>{item.name}</a></h4>
                                                                {/* <div>Categorie: {item.category}</div> */}
                                                            </div>
                                                        </div>                                                
                                                    </div>
                                                    </>
                                                )
                                            })
                                            :
                                            null
                                            }
                                        </div>
                                        <div>
                                            {searchBoxResult.courses.length ? <h3>Cours</h3> : null }
                                            {searchBoxResult.courses.length ?
                                            searchBoxResult.courses.map(item => {
                                                return (
                                                    <>
                                                    <div className="row result" key={item.id}>
                                                        <div className='col-3'>
                                                            <img className="searchImg" src={`${url}/${item.image}`} alt={`${item.image}`}/>
                                                        </div>
                                                        <div className='col-9 d-flex align-items-center'>
                                                            <div className="">
                                                                <h4><a href={`/categories/${RemoveWhiteSpace(item.$category)}/cours/${RemoveWhiteSpace(item.name)}`}>{item.name}</a></h4>
                                                                <div>Categorie: {item.$category}</div>
                                                            </div>
                                                        </div>                                                
                                                    </div>
                                                    </>
                                                )
                                            })
                                            :
                                            null
                                            }
                                        </div>
                                        <div>
                                            {searchBoxResult.chapters.length ? <h3>Chapiters</h3> : null }
                                            {searchBoxResult.chapters.length ?
                                            searchBoxResult.chapters.map(item => {
                                                return (
                                                    <div className="row result" key={item.id}>
                                                        <div className='col-3'>
                                                            <img className="searchImg" src={`${url}/${item.image}`} alt={`${item.image}`}/>
                                                        </div>
                                                        <div className='col-9 d-flex align-items-center'>
                                                            <div>
                                                                <h4><a href={`/categories/${RemoveWhiteSpace(item.category)}/cours/${RemoveWhiteSpace(item.$course)}/chapiter/${RemoveWhiteSpace(item.name)}`}>{item.name}</a></h4>
                                                                <div>Categorie: {item.category}</div>
                                                                <div>Course : {item.$course}</div>
                                                            </div>
                                                        </div>                                                
                                                    </div>
                                                )
                                            })
                                            :
                                            null
                                            }
                                        </div>
                                    </>
                                : 
                                    seachSection === 'tous' &&  "Aucun résultat trouvé" 
                                }

                                {seachSection !== 'tous' && searchBoxResult && Object.keys(searchBoxResult).length ? 
                                    <>
                                        <div>
                                            {searchBoxResult.length ?
                                                <>
                                                    {seachSection === 'course' && <h3>Cours</h3>}
                                                    {seachSection === 'chapter' && <h3>Chapiters</h3>} 
                                                </> 
                                            : null
                                            }
                                            { searchBoxResult.length ?
                                            searchBoxResult.map(item => {
                                                return (
                                                    <div className="row result" key={item.id}>
                                                        <div className='col-3'>
                                                            <img className="searchImg" src={`${url}/${item.image}`} alt={`${item.image}`}/>
                                                        </div>
                                                        <div className='col-9 d-flex align-items-center'>
                                                            <div className="">
                                                                {seachSection === 'category' ? 
                                                                    <h4><a href={`/categories/${RemoveWhiteSpace(item.name)}`}>{item.name}</a></h4>
                                                                    : null
                                                                }
                                                                {seachSection === 'course' ? 
                                                                    <>
                                                                    <h4><a href={`/categories/${RemoveWhiteSpace(item.$category)}/cours/${RemoveWhiteSpace(item.name)}`}>{item.name}</a></h4>
                                                                    <div>Categorie : {item.$category}</div>
                                                                    </>
                                                                    : null
                                                                }
                                                                {seachSection === 'chapter' ? 
                                                                    <>
                                                                    <h4><a href={`categories/${RemoveWhiteSpace(item.$category)}/cours/${RemoveWhiteSpace(item.$course)}/chapiter/${RemoveWhiteSpace(item.name)}`}>{item.name}</a></h4>
                                                                        <div>Categorie : {item.category}</div>
                                                                        <div>Course : {item.$course}</div>
                                                                    </>
                                                                    : null
                                                                }
                                                            </div>
                                                        </div>                                                
                                                    </div>
                                                )
                                            })
                                            :
                                            null
                                            }
                                        </div>
                                    </>
                                : 
                                    seachSection !== 'tous' && "Aucun résultat trouvé" 
                                }
                            </>
                        }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
