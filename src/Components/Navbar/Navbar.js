import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { UserContext } from '../../Providers/UserProvider';
import DropdownMenu from './DropDownMenu';

import { ReactComponent as IcAccounts } from "../../Assets/icons/accounts.svg";
import { ReactComponent as IcUser } from "../../Assets/icons/user.svg";
import "./Navbar.css";

export default function Navbar() {
    const user = useContext(UserContext);
    const [open, setOpen] = useState(false);
    const [userInfo, setUserInfo] = useState({ email: "", password: "", name: "", url: "" });

    const handleInfoChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.id]: e.target.value });
    }

    return (
        <nav className='navbar'>
            <ul className="navbar-nav">
                <Link to='/'>Home</Link>
                {user && <Link to='/report'>Report</Link>}
                <div className="navbar-center-space"></div>
                <li className="msg-welcome">
                    {user ? <span className="txt-white">Hi <span className="msg-username" onClick={() => setOpen(!open)}>{user.displayName}!</span></span> : <span className="txt-white">Hello Guest.</span>}
                </li>
                {!user && (
                    <li className="msg-login" onClick={() => setOpen(!open)}>Sign In/Register</li>
                )}
                <li className="nav-item">
                    <div className="icon-button" onClick={() => setOpen(!open)}>
                        {user ? <IcAccounts /> : <IcUser />}
                    </div>
                    {open && <DropdownMenu setOpen={setOpen} handleInfoChange={handleInfoChange} user={user} />}
                </li>
            </ul>
        </nav>
    )
}