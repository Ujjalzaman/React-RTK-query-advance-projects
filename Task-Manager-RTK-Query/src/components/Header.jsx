import React, { useEffect, useState } from 'react'
import LogoSvg from '../assets/svg/logo.svg'
import { useDispatch } from 'react-redux';
import { searchTask } from '../features/filter/filterSlice';

const Header = () => {
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(searchTask(search))
    }, [search, dispatch])

    return (
        <nav className="container relative py-3">
            <div className="flex items-center justify-between">
                <a href="#">
                    <img src={LogoSvg} />
                </a>
                <div className="flex-1 max-w-xs search-field group">
                    <i className="fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500"></i>
                    <input type="text" placeholder="Search Task" className="search-input" id="lws-searchTask" onChange={(e) => setSearch(e.target.value)}/>
                </div>
            </div>
        </nav>
    )
}

export default Header