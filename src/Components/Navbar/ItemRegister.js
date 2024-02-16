import React, { useState } from 'react';
import { userSignUp } from '../../Services/Firebase';

export default function ItemRegister(props) {
    const [userInfo, setUserInfo] = useState({ name: "", email: "", password: "", confirmPassword: "" });
    const [error, setError] = useState("");

    const handleInfoSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, confirmPassword } = userInfo;
        if (password !== confirmPassword || password.length < 6)
            return setError("Invalid password");

        const errorResult = await userSignUp(name, email, password);
        if (errorResult)
            return setError(errorResult);

        props.setOpen(false);
    }

    const handleInfoChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.id]: e.target.value });
    }

    return (
        <div>
            <div className={error ? "msg-error" : "msg-success"}>{error ? error : <>&nbsp;</>}</div>
            <form onSubmit={handleInfoSubmit} className="form-grid-new">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={userInfo.email}
                    onChange={handleInfoChange}
                    required
                />
                <label htmlFor="password">Password (Min 6 chars)</label>
                <input
                    type="password"
                    id="password"
                    value={userInfo.password}
                    onChange={handleInfoChange}
                    required
                />
                <label htmlFor="confirmPassword">
                    Confirm Password {userInfo.confirmPassword && (userInfo.password !== userInfo.confirmPassword) && <span className="msg-error">does not match</span>}
                </label>
                <input
                    type="password"
                    id="confirmPassword"
                    value={userInfo.confirmPassword}
                    onChange={handleInfoChange}
                    required
                />
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    value={userInfo.name}
                    onChange={handleInfoChange}
                    required
                />
                <button type="submit" className="btn-new-acc">Create Account</button>
            </form>
        </div>
    )
}