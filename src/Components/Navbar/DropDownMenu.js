import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from "react-transition-group";

import { userAccountSignIn, userProviderSignIn, userSignOut } from '../../Services/Firebase';
import ItemSignIn from "./ItemSignIn";
import ItemRegister from "./ItemRegister";
import ItemForgetPassword from "./ItemForgetPassword";
import ItemUpdateProfile from './ItemUpdateProfile';
import ItemDeleteUser from './ItemDeleteUser';

import { ReactComponent as IcArrowBack } from "../../Assets/icons/arrow_back.svg";
import { ReactComponent as IcArrowForward } from "../../Assets/icons/arrow_forward.svg";
import { ReactComponent as IcLogin } from "../../Assets/icons/login.svg";
import { ReactComponent as IcLogout } from "../../Assets/icons/logout.svg";
import { ReactComponent as IcSettings } from "../../Assets/icons/settings.svg";
import { ReactComponent as IcAddAcc } from "../../Assets/icons/add_account.svg";
import { ReactComponent as IcGithub } from "../../Assets/icons/logo_github.svg";
import { ReactComponent as IcGoogle } from "../../Assets/icons/logo_google.svg";
import { ReactComponent as IcIdentity } from "../../Assets/icons/identity.svg";
import { ReactComponent as IcPassword } from "../../Assets/icons/password.svg";
import { ReactComponent as IcCloseAcc } from "../../Assets/icons/close_account.svg";
import { ReactComponent as IcReport } from "../../Assets/icons/report.svg";

export default function DropdownMenu(props) {
    const [activeMenu, setActiveMenu] = useState("main");
    const [menuHeight, setMenuHeight] = useState(null);
    const dropdownRef = useRef(null);
    const [userInfo, setUserInfo] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
    }, [])

    const calcHeight = (el) => {
        const height = el.offsetHeight;
        setMenuHeight(height);
    }

    const goToReport = () => {
        navigate("/report")
        props.setOpen(false);
    }

    const signInWithEmail = async () => {
        const { email, password } = userInfo;
        const errorResult = await userAccountSignIn(email, password);
        if (errorResult)
            return setError(errorResult);

        props.setOpen(false);
    }

    const signInWithProvider = async (provider) => {
        await userProviderSignIn(provider);
        props.setOpen(false);
    }

    const signOut = async () => {
        await userSignOut();
        props.setOpen(false);
    }

    function DropdownItem(props) {
        return (
            <div className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
                <span className="icon-button">{props.leftIcon}</span>
                <span className="menu-item-name" onClick={props.clickAction}>{props.children}</span>
                <span className="icon-right">{props.rightIcon}</span>
            </div>
        )
    }

    return (
        <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}   onMouseLeave={() => props.setOpen(false)} >
            <CSSTransition
                in={activeMenu === "main"}
                unmountOnExit
                timeout={100}
                classNames="menu-primary"
                onEnter={calcHeight}
            >
                <div className="menu">
                    {props.user ? <>
                        <DropdownItem leftIcon={<IcReport />} clickAction={goToReport}>Report</DropdownItem>
                        <hr className="nav-hr" />
                        <DropdownItem goToMenu="update-name" leftIcon={<IcIdentity />} rightIcon={<IcArrowForward />}><h5 className="dropdown-h5">Update Name</h5></DropdownItem>
                        <DropdownItem goToMenu="update-email" leftIcon={<IcSettings />} rightIcon={<IcArrowForward />}><h5 className="dropdown-h5">Update Email</h5></DropdownItem>
                        <DropdownItem goToMenu="update-password" leftIcon={<IcSettings />} rightIcon={<IcArrowForward />}><h5 className="dropdown-h5">Update Password</h5></DropdownItem>
                        <hr className="nav-hr" />
                        <DropdownItem leftIcon={<IcLogout />} clickAction={signOut}>Sign Out</DropdownItem>
                        <hr className="nav-hr" />
                        <DropdownItem goToMenu="delete-account" leftIcon={<IcCloseAcc />} rightIcon={<IcArrowForward />}>DELETE ACCOUNT</DropdownItem>
                    </> : <>
                        <ItemSignIn userInfo={userInfo} setUserInfo={setUserInfo} error={error} />
                        <DropdownItem leftIcon={<IcLogin />} clickAction={signInWithEmail}>Sign In</DropdownItem>
                        <DropdownItem goToMenu="forget-password" leftIcon={<IcPassword />} rightIcon={<IcArrowForward />}><h5 className="dropdown-h5">Forget Password</h5></DropdownItem>
                        <hr className="nav-hr" />
                        <DropdownItem leftIcon={<IcGoogle />} clickAction={() => signInWithProvider("google")}>Sign In with Google</DropdownItem>
                        <DropdownItem leftIcon={<IcGithub />} clickAction={() => signInWithProvider("github")}>Sign In with GitHub</DropdownItem>
                        <hr className="nav-hr" />
                        <DropdownItem goToMenu="sign-up" leftIcon={<IcAddAcc />} rightIcon={<IcArrowForward />}>Create New Account</DropdownItem>
                    </>}
                </div>
            </CSSTransition >

            <CSSTransition
                in={activeMenu === "sign-up"}
                timeout={250}
                classNames="menu-secondary"
                unmountOnExit
                onEnter={calcHeight}
            >
                <div className="menu">
                    <ItemRegister {...props} />
                    <DropdownItem goToMenu="main" leftIcon={<IcArrowBack />}>
                        <h4 className="dropdown-h4">Go Back</h4>
                    </DropdownItem>
                </div>
            </CSSTransition>

            <CSSTransition
                in={activeMenu === "forget-password"}
                timeout={250}
                classNames="menu-secondary"
                unmountOnExit
                onEnter={calcHeight}
            >
                <div className="menu">
                    <ItemForgetPassword {...props} />
                    <DropdownItem goToMenu="main" leftIcon={<IcArrowBack />}>
                        <h4 className="dropdown-h4">Go Back</h4>
                    </DropdownItem>
                </div>
            </CSSTransition>

            <CSSTransition
                in={activeMenu === "update-name"}
                timeout={250}
                classNames="menu-secondary"
                unmountOnExit
                onEnter={calcHeight}
            >
                <div className="menu">
                    <ItemUpdateProfile user={props.user} setOpen={props.setOpen} profile="Name" />
                    <DropdownItem goToMenu="main" leftIcon={<IcArrowBack />}>
                        <h4 className="dropdown-h4">Go Back</h4>
                    </DropdownItem>
                </div>
            </CSSTransition>

            <CSSTransition
                in={activeMenu === "update-email"}
                timeout={250}
                classNames="menu-secondary"
                unmountOnExit
                onEnter={calcHeight}
            >
                <div className="menu">
                    <ItemUpdateProfile user={props.user} setOpen={props.setOpen} profile="Email" />
                    <DropdownItem goToMenu="main" leftIcon={<IcArrowBack />}>
                        <h4 className="dropdown-h4">Go Back</h4>
                    </DropdownItem>
                </div>
            </CSSTransition>

            <CSSTransition
                in={activeMenu === "update-password"}
                timeout={250}
                classNames="menu-secondary"
                unmountOnExit
                onEnter={calcHeight}
            >
                <div className="menu">
                    <ItemUpdateProfile user={props.user} setOpen={props.setOpen} profile="Password" />
                    <DropdownItem goToMenu="main" leftIcon={<IcArrowBack />}>
                        <h4 className="dropdown-h4">Go Back</h4>
                    </DropdownItem>
                </div>
            </CSSTransition>

            <CSSTransition
                in={activeMenu === "delete-account"}
                timeout={250}
                classNames="menu-secondary"
                unmountOnExit
                onEnter={calcHeight}
            >
                <div className="menu">
                    <ItemDeleteUser user={props.user} setOpen={props.setOpen} />
                    <DropdownItem goToMenu="main" leftIcon={<IcArrowBack />}>
                        <h4 className="dropdown-h4">Go Back</h4>
                    </DropdownItem>
                </div>
            </CSSTransition>
        </div >
    )
}