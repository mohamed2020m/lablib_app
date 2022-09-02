import React, {useState, useEffect, useRef} from 'react';
import { useParams } from 'react-router-dom';
import {GetStep} from '../service/StepsService';
import {GetLabItem, GetLabs, GetLab, MarkLabs} from '../service/LabsService';
import {findIdLab, msToTime} from '../helpers/helper'
import "../css/step.css";
import Skeleton from 'react-loading-skeleton';
import NoPage from "./nopage";
import hljs from 'highlight.js'
import 'react-quill/dist/quill.core.css'
import 'react-quill/dist/quill.bubble.css'
import '../css/dracula.css'
import ReactQuill from 'react-quill';
import { useNavigate} from "react-router-dom";


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
    const [start, setStart] = useState(false);
    const [IsValidURL, setIsValidURL] = useState(true);
    const [showSteps, setShowSteps] = useState(false);
    const countStep = useRef(0);
    const navigate = useNavigate();

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
            };
        }
        
        async function fetchStep(){
            try{
                let res = await GetStep(currentStepId);
                if(res.ok){
                    let data = await res.json();
                    setStep(data);
                    setIsLoadingContent(false);
                }
                else{
                    let err = await res.json();
                    setIsLoadingContent(true);
                    throw err[0].message;
                }
            }
            catch (err){
                console.log(err);
            };
        }

        fetchLabs();
        labs.length && fetchLab();
        labs.length && fetchSteps();
        labs.length && steps.length && currentStepId && fetchStep();

        // activate the first step

        window.addEventListener('load', () => {
            if(window.innerWidth <= 700){
                setActiveSideBar(false);
            }
        })

        window.addEventListener('resize', () => {
            if(window.innerWidth <= 700){
                setActiveSideBar(false);
            }
        })

        return () => {
            window.removeEventListener('load', () => {
                if(window.innerWidth  <= 700){
                    setActiveSideBar(false);
                }})
            }

        //     window.removeEventListener('resize', () => {
        //         if(window.innerWidth  <= 700){
        //             setActiveSideBar(false);
        //         }})
        // }
    }, [start, activeSideBar, currentStepId, loaded, isLoadingSteps, isLoadingContent, IsValidURL, showSteps])

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

    const handleNextStep = () => {
        if(countStep.current < (steps.length - 1)){
            countStep.current = countStep.current + 1;
        }
        setCurrentStepId(steps[countStep.current].id)
    }

    const handlePrevStep = () => {
        if(countStep.current){
            countStep.current = countStep.current - 1;
        }
        setCurrentStepId(steps[countStep.current].id)
    }

    const handleCompletedLab = async (step) => {
        try{
            console.log("step.lab: ",  step.lab)
            let res = await MarkLabs(step.lab);
            if(res.ok){
                let data = await res.json();
                // setStep(data);
                // setIsLoadingContent(false);
                // navigate('/')
                const link = location.href.split('/');
                link.pop();
                link.pop();
                const a = link.join('/');
                navigate(a)
            }
            else{
                let err = await res.json();
                // setIsLoadingContent(true);
                throw err[0].message;
            }
        }
        catch (err){
            console.warn(err);
        };
    
    }

    if(!IsValidURL){
        return <NoPage/>
    }

    console.log("steps: ", steps);
    console.log("current steps: ", currentStepId)
    return(
        <>
            <div className='ellipsis_btn'>
                <button onClick={() => setShowSteps(prev => !prev)}>
                    {
                    !showSteps
                    ?
                    <i className="fa fa-ellipsis-v"></i>
                    :
                    <i className="fa fa-times py-1"></i>
                    }

                </button>
            </div>

            {showSteps &&
                <div className='nav_steps d-flex justify-content-center'>
                    <div className="px-3 py-3 mr-3"> 
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
                                            onClick={(e) => (handleStepClick(e, item), setShowSteps(prev => !prev))}
                                        >
                                            {item.name}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            }

            {
            !start && lab ?
            <div className="d-flex justify-content-center align-items-center bg-dark border p-3" style={{height:'600px'}}>
                <div className='bg-light p-4 rounded' style={{width:'600px'}}>
                    <div className='StepHeader border d-flex flex-column align-items-center'>
                        <div>
                            <span style={{fontWeight: 'bold'}}>Title</span>: {lab.name}
                        </div>
                        <div>
                            <span style={{fontWeight: 'bold'}}>Chapiter</span>: {lab.$chapter}
                        </div>
                        <div>
                            <span style={{fontWeight: 'bold'}}>Duration</span>: {msToTime(lab.duration)}
                        </div>
                        <div className='mt-3 d-flex justify-content-end'>
                            <button 
                                className="border-0 px-3 py-2 my-2 text-white rounded start_btn_step"
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
                    <div className='col-12 d-flex justify-content-center'>
                        <div className='time_left'>
                            <div>
                                <i className="icon-clock-o mr-1"></i>
                            </div>
                            <div className='tm-lf_text'>
                                Temps restant:
                            </div>
                            <div className='ml-1 tm-lf'>{msToTime(lab.duration)}</div>
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
                            <div className={`${activeSideBar ? "col-8" : "col-10"} content`}>
                                <div className="row bg-white shadow border">
                                    <div className='step-content-Warraper p-3 m-2 text-justify'>
                                        {
                                            !isLoadingContent ? 
                                                <>
                                                    <div className="step_title">
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
                                <div className="row align-items-center mt-3">
                                    {/* <div className=''> */}
                                        {
                                        currentStepId !== steps[0].id ?
                                            <div className='col-6 d-flex justify-content-around'>
                                                <button onClick={handlePrevStep} className=" px-3 py-2 bg-secondary border-0 text-white">Prev</button>
                                            </div>
                                        : null
                                        }
                                        {
                                        currentStepId !== steps[steps.length - 1].id ?
                                            <div className={currentStepId === steps[0].id ? 'col-12 d-flex justify-content-end' : 'col-6 d-flex justify-content-around'}>
                                                <button onClick={handleNextStep} className=" px-3 py-2 bg-info border-0 text-white">Next</button>
                                            </div>
                                        : null
                                        }
                                        {
                                        currentStepId === steps[steps.length - 1].id ?
                                            <div className='col-6 d-flex justify-content-around'>
                                                <button onClick={() => handleCompletedLab(step)} className=" px-3 py-2 bg-success border-0 text-white">Mark As finished</button>
                                            </div>
                                        : null
                                        }
                                    {/* </div> */}
                                </div>
                                {/* <div className="row p-3 mt-3">
                                    Comments : 0
                                </div> */}
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
                <div className="pb-3 mb-3"></div>
            </div>
            }
        </>
    )
}

export default Steps;