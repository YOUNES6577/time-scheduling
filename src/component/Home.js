import React from 'react';
import {Link} from "react-router-dom";

import logo from '../Img/logomark.svg';
import '../Stylesheets/build/reset.css';
import '../Stylesheets/build/mainStyle.css';
import '../Scripts/config/main' 


const Logo =()=> <a className="logo" href='/'><img alt='logo' width='125px' height='125px' src={logo}/></a>;
function Header (){
    return <header>
            <Logo />
            <button className="nav-trigger">
                <span aria-hidden="true" className="icon"></span>
            </button>
        </header> ;
}   
const Navigation =()=>{
    return  <nav className='primary-nav'>
            <ul>
                    <li className="label">Navigation</li>
                    <li><Link className='nav-link' to="/timeline">Timeline</Link></li>  
                    <li><Link className='nav-link' to="/dailywork">DailyWork</Link></li>  
                    <li><Link className='nav-link' to="/notes">Notes</Link></li>  
                    <li><Link className='nav-link' to="/task">Task</Link></li>  
                    <li><Link className='nav-link' to="/archive">Archive</Link></li>  
                    <li><Link className='nav-link' to="/history">History</Link></li>
            </ul>
    </nav>  
};

const SinglePage=(props)=>{
    return <li className="single-page">
                <div className="page-title">
                    <h2>{props.title}</h2>
                </div>
                <div className="page-info">
                    <button className="scroll-down">Scroll down</button>
                    <div className="content-wrapper">
                        <p></p>
                    </div>
                </div>
            </li>
} 

const MainContent=()=>{
    return <div className='page-container'>
            <ul>
                <SinglePage title='Time Table'/>
                <SinglePage title='Daily Work'/>
                <SinglePage title='Historique'/>
            </ul>
        </div>
}

export default function Home(){
    return <> 
        <Header />
        <Navigation />
        <MainContent />
    </>
}
