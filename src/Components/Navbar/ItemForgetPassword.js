import React, { useState } from 'react';
import { userResetPassword } from '../../Services/Firebase';

export default function ItemForgetPassword(props) {
    const [email, setEmail] = useState("");
    const [notice, setNotice] = useState({ error: false, success: false, msg: "" });

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errorResult = await userResetPassword(email);
        if (errorResult)
            return setNotice({ ...notice, error: true, msg: errorResult });

        setNotice({ ...notice, success: true, msg: "Email sent!" });
        setTimeout(() => {
            props.setOpen(false);
        }, 1600);
    }

    return (
        <div>
            <div className={notice.error ? "msg-error" : "msg-success"}>{notice.error || notice.success ? notice.msg : <>&nbsp;</>}</div>
            <form onSubmit={handleSubmit} className="form-grid-new">
                <label htmlFor="email">Enter your email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                />
                <button type="submit" className="btn-new-acc">Reset Password</button>
            </form>
        </div>
    )
}