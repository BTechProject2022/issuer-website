import React , { useState } from "react";
import axios from "axios";
import classnames from "classnames";

const ResetPassword = () => {
	const [email, setEmail] = useState("");
	const [msg, setMsg] = useState("");
	const [errors, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = `http://localhost:8080/api/password-reset`;
			const { data } = await axios.post(url, { email });
			setMsg(data.message);
			setError("");
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
				setMsg("");
			}
		}
	};

	return (
        <div className="form-box">
        <form className="login-form" onSubmit={handleSubmit}>
            <h2>Reset Password</h2>
            <hr/>
            <div className="form-group">
                <input type="password" 
                       id="password"
                       placeholder="Enter new Password" 
                       value={email} 
                       error={errors}
                       onChange={e=>setEmail(e.target.value)}
                       className={classnames("form-control", {
                        invalid: errors.email || errors.emailnotfound
                      })}/>
                      <span className="red-text">
                        {errors.email}
                        {errors.emailnotfound}
                    </span>
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block btn-lg">Submit</button>
            </div>
        </form>
    </div>
	);
};

export default ResetPassword;