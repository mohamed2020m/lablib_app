import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {GetStep} from '../service/StepsService';
import {GetLabItem, GetLabs, GetLab} from '../service/LabsService';
import {findIdLab, msToTime} from '../helpers/helper'
import "../css/step.css";
import Skeleton from 'react-loading-skeleton';
import NoPage from "./nopage";
import hljs from 'highlight.js'
import 'react-quill/dist/quill.core.css'
import 'react-quill/dist/quill.bubble.css'
import '../css/dracula.css'
import ReactQuill from 'react-quill';

hljs.configure({
        languages: ['javascript', 'ruby', 'python', 'rust'],
    })
    
const modules = {
    syntax: {
        highlight: text => hljs.highlightAuto(text).value,
    },
    toolbar: [
        ['bold', 'italic', 'underline', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image', 'video'],
        ['clean'],
        ['code-block'],
    ],
    clipboard: {
        matchVisual: false,
    },
}

const Steps = () => {
    const {LabName} = useParams();
    const [steps, setSteps] = useState([]);
    const [labs, setLabs] = useState([]);
    const [lab, setLab] = useState({});
    const [step, setStep] = useState({});
    const [currentStepId, setCurrentStepId] = useState("");
    const [isLoadingSteps, setIsLoadingSteps] = useState(true)
    const [isLoadingContent, setIsLoadingContent] = useState(true)
    const [loaded, setLoaded] = useState(false);
    const [activeSideBar, setActiveSideBar] = useState(true);
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    const [start, setStart] = useState(false);
    const [IsValidURL, setIsValidURL] = useState(true);

    useEffect(() => {
        async function fetchLabs(){
            try{
                let res = await GetLabs();
                if(res.ok){
                    let data = await res.json();
                    setLabs(data);
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
        async function fetchLab(){
            try{
                let lab_id = findIdLab(LabName, labs);
                if(lab_id){
                    let res = await GetLab(lab_id);
                    if(res.ok){
                        let data = await res.json();
                        setLab(data);
                    }
                    else{
                        let err = await res.json();
                        throw err[0].message;
                    }
                }
            }
            catch (err){
                console.log(err);
                // toast.current.show({ severity: 'error', summary: 'Failed', detail: err, life: 6000 });
            };
        }
        async function fetchSteps(){
            try{
                let Lab_id = findIdLab(LabName, labs);
                if(Lab_id)
                {
                    let res = await GetLabItem(Lab_id);
                    if(res.ok){
                        let data = await res.json();
                        setSteps(data);
                        setIsLoadingSteps(false);
                    }
                    else{
                        let err = await res.json();
                        setIsLoadingSteps(true);
                        throw err[0].message;
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
        
        async function fetchStep(){
            try{
                let res = await GetStep(currentStepId);
                if(res.ok){
                    let data = await res.json();
                    setStep(data);
                    setIsLoadingContent(false);
                    console.log(isLoadingContent)
                }
                else{
                    let err = await res.json();
                    setIsLoadingContent(true);
                    throw err[0].message;
                }
            }
            catch (err){
                console.log(err);
                // toast.current.show({ severity: 'error', summary: 'Failed', detail: err, life: 6000 });
            };
        }

        fetchLabs();
        labs.length && fetchLab();
        labs.length && fetchSteps();
        labs.length && steps.length && currentStepId && fetchStep();

        window.addEventListener('resize', () => {
            if(windowSize === 700){
                setActiveSideBar(true);
            }
        })

        window.addEventListener('load', () => {
            console.log("loaded")
        }) 

        return () => window.removeEventListener('resize', () => {
            if(windowSize === 700){
                setActiveSideBar(true);
            }
        })
    }, [currentStepId, loaded, isLoadingSteps, isLoadingContent, IsValidURL])


    const handleStepClick = (e, item) => {
        const s = document.querySelector('.StepContainer').childNodes;
        for(let item of s){
            item.classList.remove('stepActive');
            item.firstChild.classList.remove('stepRang');
        }
        e.target.parentNode.classList.add('stepActive');
        e.target.parentNode.firstChild.classList.add('stepRang');
        setCurrentStepId(item.id);
    }

    const handleStart = () => {
        setCurrentStepId(steps[0].id)
        setStart(true);
    }

    if(!IsValidURL){
        return <NoPage/>
    }
    
    return(
        <>
            {
            !start && lab ?
            <div className="d-flex justify-content-center align-items-center bg-dark border p-3" style={{height:'600px'}}>
                <div className='bg-light p-4 rounded' style={{width:'600px'}}>
                    <div className='StepHeader border d-flex flex-column align-items-center'>
                        <div>
                            <span>Title</span>: {lab.name}
                        </div>
                        <div>
                            <span>Chapiter</span>: {lab.chapter}
                        </div>
                        <div>
                            <span>Duration</span>: {msToTime(lab.duration)}
                        </div>
                        <div className='mt-3 d-flex justify-content-end'>
                            <button 
                                className="border-0 px-3 py-2 text-white rounded"
                                style={{backgroundColor:"#0AB1CE"}}
                                onClick={handleStart}
                            >
                            Début
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            :
            <div>
                <div className='row mt-4 mx-3'>
                    <div className='col-2'>
                        
                    </div>
                    <div className='col-9'>
                        <div className='d-flex justify-content-center py-2 px-3'>
                            Temps restant: {msToTime(lab.duration)}
                        </div>
                    </div>
                </div>
                {
                    !isLoadingSteps ? 
                    <div className="container-fluid Step-container">
                        <div className="row m-3">
                            {activeSideBar ?
                            <div className="col-3 px-3 py-3 mr-3 StepContainer">  
                                <div className='d-flex justify-end-center activeBtn'>
                                    <button 
                                        className="border-0 rounded-circle"
                                        style={{backgroundColor:"#3498bb", width:"28px", height:"28px"}}
                                        onClick={() => {setActiveSideBar((preValue) => !preValue)}}>
                                        <i 
                                            className={"icon-arrow-left text-white"}
                                            style={{width:"20px", height:"20px"}}
                                        ></i>
                                    </button>
                                </div>
                                { 
                                    steps.map((item, id ) => {
                                        return(
                                            <div className={'d-flex flex-nowrap align-itmes-center bg-white py-2 px-3 mb-2 rounded stepWrap '} key={item.id}>
                                                <div className='py-2 px-3 text-white rounded-circle' style={{backgroundColor:"#3498db",width:"40px", height:"40px"}}>{id+1}</div>
                                                <div 
                                                    className='py-2 px-3' 
                                                    style={{textOverflow: "ellipsis", 
                                                        whiteSpace: "nowrap", 
                                                        overflow: "hidden", 
                                                        width:"100%"
                                                    }}
                                                    onClick={(e) => handleStepClick(e, item)}
                                                >
                                                    {item.name}
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            : 
                            <div className="col-1 py-3 mr-3 StepContainer">
                                <div className='d-flex justify-end-center activeBtn'>
                                    <button 
                                        className="border-0 rounded-circle"
                                        style={{backgroundColor:"#3498bb", width:"28px", height:"28px"}}
                                        onClick={() => {setActiveSideBar((preValue) => !preValue)}}>
                                        <i 
                                            className={"icon-arrow-right text-white"}
                                            style={{width:"20px", height:"20px"}}
                                        ></i>
                                    </button>
                                </div>  
                                { 
                                    steps.map((item, id ) => {
                                        return(
                                            <div className={'d-flex flex-nowrap align-itmes-center bg-white py-2 px-3 mb-2 rounded stepWrap'} key={item.id}>
                                                <div 
                                                    className='py-2 px-3 text-white rounded-circle' 
                                                    style={{backgroundColor:"#3498db",width:"40px", height:"40px"}}
                                                    onClick={(e) => handleStepClick(e, item)}
                                                >
                                                    {id+1}
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            }
                            <div className={activeSideBar ? "col-8" : "col-10" }>
                                <div className="row bg-white shadow border">
                                    <div className='step-content-Warraper p-3 m-2 text-justify'>
                                        {
                                            !isLoadingContent ? 
                                                <>
                                                    <div>
                                                        <h2>{step.rang}. {step.name}</h2>
                                                    </div>
                                                    <ReactQuill
                                                        value={step.content}
                                                        theme="bubble"
                                                        modules={modules}
                                                        readOnly={true}
                                                    />
                                                </>
                                            : 
                                            <div>Loading Content ...</div>
                                        }
                                    </div>
                                </div>
                                <div className="row p-3 mt-3">
                                    Comments : 0
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="container-fluid Step-container">
                        <div className="row m-3">
                            {activeSideBar ?
                            <div className="col-3 px-3 py-3 mr-3 StepContainer">  
                                <div className='d-flex justify-end-center activeBtn'>
                                    <Skeleton circle={true}/>
                                </div>
                                { 
                                    steps.map((item, id ) => {
                                        return(
                                            <div className={'d-flex flex-nowrap align-itmes-center bg-white py-2 px-3 mb-2 rounded stepWrap'} key={item.id}>
                                                <div 
                                                    className='py-2 px-3 text-white rounded-circle' 
                                                    style={{backgroundColor:"#3498db",width:"40px", height:"40px"}}>
                                                    <Skeleton circle={true}/>
                                                </div>
                                                <div 
                                                    className='py-2 px-3' 
                                                    style={{textOverflow: "ellipsis", 
                                                        whiteSpace: "nowrap", 
                                                        overflow: "hidden", 
                                                        width:"100%"
                                                    }}
                                                >
                                                    <Skeleton/>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            : 
                            <div className="col-1 py-3 mr-3 StepContainer">
                                <div className='d-flex justify-end-center activeBtn'>
                                    <Skeleton circle={true}/>
                                </div>  
                                { 
                                    steps.map((item, id ) => {
                                        return(
                                            <div className={'d-flex flex-nowrap align-itmes-center bg-white py-2 px-3 mb-2 rounded stepWrap'} key={item.id}>
                                                <div 
                                                    className='py-2 px-3 text-white rounded-circle' 
                                                    style={{backgroundColor:"#3498db",width:"40px", height:"40px"}}
                                                >
                                                    <Skeleton/>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            }
                            <div className={activeSideBar ? "col-8" : "col-10" }>
                                <div className="row bg-white shadow border">
                                    <div className='step-content-Warraper p-3 m-2 text-justify'>
                                        <Skeleton count={10}/>
                                    </div>
                                </div>
                                <div className="row p-3 mt-3">
                                    <Skeleton count={3}/>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
            }
        </>
    )
}

export default Steps;