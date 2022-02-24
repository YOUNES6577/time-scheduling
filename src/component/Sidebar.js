import React from 'react';
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import logo from '../Img/logomark.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faArchive,
    faBars, faCalendarMinus,
    faChartLine,
    faClock, faCog,
    faHistory, faLightbulb,
    faProcedures, faRoad,
    faSearch, faShapes, faSignOutAlt,
    faSyncAlt, faUserAlt
} from '@fortawesome/free-solid-svg-icons'
import {
    AccountCircleTwoTone, Sync,
    Settings, PowerSettingsNew
} from '@mui/icons-material';
import { Link } from "react-router-dom";
import {
    Divider, Chip,
    Box, Autocomplete,
    TextField, ButtonBase
} from '@mui/material';
import Clock from './Clock';
import useToken from '../useToken';
const Logo = (props) =>
    <a className="nav_logo" href='/'>
        <img className={props.className} alt='home' width='65px' height='auto' src={logo} />
    </a>;

const optionList = []

function SearchBar() {
    const [value, setValue] = React.useState(null);
    return <div className='d-flex flex-nowrap'>
        <Autocomplete
            value={value}
            onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
                    setValue({
                        title: newValue,
                    });
                } else if (newValue && newValue.inputValue) {
                    // Create a new value from the user input
                    setValue({
                        title: newValue.inputValue,
                    });
                } else
                    setValue(newValue);
            }}
            size='small'
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            options={optionList}
            getOptionLabel={(option) => {
                if (typeof option === 'string')
                    return option
                if (option.inputValue)
                    return option.inputValue;
                return option.title;
            }}
            renderOption={(props, option) => <li {...props}>{option.title}</li>}
            sx={{ width: 350, marginRight: '5px' }}
            freeSolo
            renderInput={(params) => <TextField {...params} label="Search" />}
        />
        <ButtonBase id='SearchBtn'><FontAwesomeIcon className='nav_icon' icon={faSearch} /></ButtonBase>
    </div>
}
const Navbar = () => {
    return (
        <header className='header' id='header'>
            <div className="header_toggle">
                <i id="header-toggle" className='nav_icon'><FontAwesomeIcon icon={faBars} /></i>
            </div>
            <div className='d-flex flex-nowrap justify-content-between w-75'>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1 },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <SearchBar />
                </Box>
                <Clock className='Clock' />
                <div className='mr5 d-flex align-content-center'>
                    <i className="nav_icon p-4"><Sync sx={{ fontSize: '2rem' }} /></i>
                    <i className="nav_icon p-4"><Settings sx={{ fontSize: '2rem' }} /></i>
                    <i className="nav_icon p-4"><AccountCircleTwoTone sx={{ fontSize: '2rem' }} /></i>
                </div>
            </div>
        </header>
    )
}
function ActiveLink(Links) {
    if (Links.length) {
        Links.forEach(l => l.classList.remove('active'))
        this.classList.add('active')
    }
}
function showNavbar(toggleId, navId, bodyId, headerId) {
    const toggle = $(toggleId), nav = $(navId), bodypd = $(bodyId), headerpd = $(headerId)

    if (toggle.length && nav.length && bodypd.length && headerpd.length) {
        toggle.on('click', () => {// show navbar
            nav.toggleClass('show')// change icon
            toggle.toggleClass('bx-x')// add padding to body
            bodypd.toggleClass('body-pd')// add padding to header
            headerpd.toggleClass('body-pd')
        })
    }
}
export default function Sidebare(props) {
    showNavbar('#header-toggle', '#nav-bar', '#body-pd', '#header')
    var Links = document.querySelectorAll('.nav_link');
    Links.forEach(l => l.addEventListener('click', () => { ActiveLink(Links) }))
    const chipstyel = {
        'color': '#C2C7D0',
    }
    const {logout}=useToken();
    return (
        <>
            <Navbar />
            <div className='l-navbar' id='nav-bar'>
                <nav className="nav">
                    <Logo className='nav_logo-icon' />
                    <div className='nav_list'>
                        <Link className='nav_link active' to='/timeline'>
                            <i className='nav_icon'><FontAwesomeIcon icon={faClock} /></i>
                            <span className='nav_name'>TimeLine</span>
                        </Link>
                        <Link className='nav_link' to='/dailywork'>
                            <i className='nav_icon'><FontAwesomeIcon icon={faCalendarMinus} /></i>
                            <span className='nav_name'>Dailywork</span>
                        </Link>
                        <Link className='nav_link' to='/Roadmap'>
                            <i className='nav_icon'><FontAwesomeIcon icon={faRoad} /></i>
                            <span className='nav_name'>Roadmap</span>
                        </Link>
                        <Link className='nav_link' to='/Notes'>
                            <i className='nav_icon'><FontAwesomeIcon icon={faLightbulb} /></i>
                            <span className='nav_name'>Notes</span>
                        </Link>
                        <Divider >
                            <Chip label="Ohter" style={chipstyel} />
                        </Divider>
                        <Link className='nav_link' to='/archive'>
                            <i className='nav_icon'><FontAwesomeIcon icon={faArchive} /></i>
                            <span className='nav_name'>Archive</span>
                        </Link>
                        <Link className='nav_link' to='/history'>
                            <i className='nav_icon'><FontAwesomeIcon icon={faClock} /></i>
                            <span className='nav_name'>History</span>
                        </Link>
                        <Link className='nav_link' to='/history'>
                            <i className='nav_icon'><FontAwesomeIcon icon={faChartLine} /></i>
                            <span className='nav_name'>Statiscs</span>
                        </Link>
                    </div>
                    <Link to="/login" className='nav_link'>
                        <i className='nav_icon'><PowerSettingsNew /></i>
                        <span className='nav_name' onClick={logout}>Sign-Out</span>
                    </Link>
                </nav>
            </div>
        </>
    )
}