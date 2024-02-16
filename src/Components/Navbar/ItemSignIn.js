import React from 'react'

export default function ItemLogIn({ userInfo, setUserInfo, error }) {
    const handleInfoSubmit = (e) => {
        e.preventDefault();
    }

    const handleInfoChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.id]: e.target.value });
    }

    return (
        <div>
            <div className={error ? "msg-error" : "msg-success"}>{error ? error : <>&nbsp;</>}</div>
            <form onSubmit={handleInfoSubmit} className="form-grid">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={userInfo.email}
                    onChange={handleInfoChange}
                    required
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={userInfo.password}
                    onChange={handleInfoChange}
                    required
                />
            </form>
        </div>
    )
}