import React, { useState } from 'react';
import { userReauthenticate, userDeleteAccount } from '../../Services/Firebase';
import axios from "axios";
import { apiURL } from "../../util/apiURL";

const API = apiURL();

export default function ItemDeleteUser({ user, setOpen }) {
    const [notice, setNotice] = useState({ error: false, msg: "" });
    const [userInfo, setUserInfo] = useState({ email: "", password: "" });

    const handleInfoChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.id]: e.target.value });
    }

    const handleSignInSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = userInfo;
        const errorResult = await userReauthenticate(user, email, password);
        setNotice(errorResult ? { error: true, msg: errorResult } : { error: false, msg: "" });
    }

    const handleDelete = async () => {
        const errorResult = await userDeleteAccount(user);
        if (errorResult) {
            if (user.providerData[0].providerId.includes("password"))
                return setNotice({ error: true, msg: errorResult });

            const reauthErrorResult = await userReauthenticate(user);
            if (reauthErrorResult)
                return setNotice({ error: true, msg: reauthErrorResult });

            await userDeleteAccount(user);
        }
        await axios.delete(`${API}/stats/${user.uid}`);
        setNotice({ error: false, msg: "Done, goodbye!" });
        setTimeout(() => {
            setOpen(false);
        }, 1400)
    }

    return (
        <div className="page-delete">
            {notice.msg.includes("requires-recent-login") ? (
                <>
                    <form onSubmit={handleSignInSubmit} className="form-grid-new">
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
                        <button type="submit" className="btn-new-acc">Sign in</button>
                    </form>
                </>)
                :
                <>
                    <h3>Are you sure?</h3>
                    <h4>All your data will be permanently removed.</h4>
                </>
            }
            <div className={notice.error ? "msg-error" : "msg-success"}>{notice.msg ? notice.msg : <>&nbsp;</>}</div>
            {!notice.msg.includes("requires-recent-login") && <button className="btn-delete-acc" onClick={handleDelete}>CONFIRM</button>}
        </div >
    )
}