import React, { useState } from 'react';
import { userUpdateName, userUpdateEmail, userUpdatePassword, userReauthenticate } from '../../Services/Firebase';

export default function ItemUpdateProfile({ user, profile, setOpen }) {
    const [newProperty, setNewProperty] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [notice, setNotice] = useState({ error: false, success: false, msg: "" });
    const [userInfo, setUserInfo] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setNewProperty(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setConfirmPassword(e.target.value)
    }

    const handleUserInfoChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.id]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (notice.msg.includes("requires-recent-login")) {
            const { email, password } = userInfo;
            const reauthErrorResult = await userReauthenticate(user, email, password);
            return setNotice(reauthErrorResult ? { error: true, msg: reauthErrorResult } : { error: false, msg: "" });
        }

        let errorResult = null;
        switch (profile) {
            case "Name":
                errorResult = await userUpdateName(user, newProperty);
                break;
            case "Email":
                errorResult = await userUpdateEmail(user, newProperty);
                break;
            case "Password":
                if (newProperty.length < 6 || newProperty !== confirmPassword)
                    return setNotice({ ...notice, error: true, msg: "Invalid password (Min 6 chars)" });

                errorResult = await userUpdatePassword(user, newProperty);
                break;
            default:
                errorResult = "Invalid page";
                break;
        }
        if (errorResult) {
            if (!errorResult.includes("requires-recent-login"))
                return setNotice({ ...notice, error: true, msg: errorResult });

            if (user.providerData[0].providerId.includes("password"))
                return setNotice({ ...notice, error: true, msg: errorResult });

            const reauthErrorResult = await userReauthenticate(user);
            if (reauthErrorResult)
                return setNotice({ ...notice, error: true, msg: reauthErrorResult });

            switch (profile) {
                case "Name":
                    errorResult = await userUpdateName(user, newProperty);
                    break;
                case "Email":
                    errorResult = await userUpdateEmail(user, newProperty);
                    break;
                case "Password":
                    errorResult = await userUpdatePassword(user, newProperty);
                    break;
                default:
                    errorResult = "Invalid page"
                    break;
            }
        }
        setNotice({ ...notice, success: true, msg: `${profile} updated!` });
        setTimeout(() => {
            setOpen(false);
        }, 1300);
    }

    return (
        <div>
            <div className={notice.error ? "msg-error" : "msg-success"}>{notice.error || notice.success ? notice.msg : <>&nbsp;</>}</div>
            <form onSubmit={handleSubmit} className="form-grid-new">
                {notice.msg.includes("requires-recent-login") ?
                    <>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={userInfo.email}
                            onChange={handleUserInfoChange}
                            required
                        />
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={userInfo.password}
                            onChange={handleUserInfoChange}
                            required
                        />
                        <button type="submit" className="btn-new-acc">Sign in</button>
                    </>
                    :
                    profile === "Name" ?
                        <>
                            <label htmlFor="name">Enter your new name</label>
                            <input
                                type="text"
                                id="name"
                                value={newProperty}
                                onChange={handleChange}
                                required
                            />
                        </>
                        :
                        profile === "Email" ?
                            <>
                                <label htmlFor="email">Enter your new email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={newProperty}
                                    onChange={handleChange}
                                    required
                                />
                            </>
                            :
                            <>
                                <label htmlFor="password">Enter your new password</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={newProperty}
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="confirmPassword">Confirm your new password</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={handlePasswordChange}
                                    required
                                />
                            </>
                }
                {!notice.msg.includes("requires-recent-login") && <button type="submit" className="btn-new-acc">Update</button>}
            </form>
        </div>
    )
}