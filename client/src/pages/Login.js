import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';
// import reportWebVitals from '../reportWebVitals';

const Login = (props) => {
    const [formState, setFormState] = useState({ username: '', password: ''});
    const [login, {error, data}] = useMutation(LOGIN_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;
        // console.log(name, value);
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault(); 
        console.log(formState);
        try {
            console.log("Goodbye");
            const { data } = await login({
                variables: { ...formState}
            });
            console.log(formState);
            console.log(data, "Hello");
            Auth.login(data.login.token)
        } catch (err) {
           
            console.error(err);
        }

        setFormState({
            username: '',
            password: '',
        })
    };

    return(
        <main>
            <div className="card">
                <h3>Login Page</h3>
                <div className='card-body'>
                    {data ? (
                        // <Link to="User"/>
                        <p>Success!</p>
                    ): (
                        <form onSubmit={handleFormSubmit}>
                            <input
                            className="form-input"
                            placeholder="Username:"
                            name="username"
                            type="username"
                            value={formState.username}
                            onChange={handleChange}
                            />
                            <input
                            className="form-input"
                            placeholder="Password:"
                            name="password"
                            type="password"
                            value={formState.password}
                            onChange={handleChange}
                            />
                            <button
                              className="btn"
                              style={{ cursor: 'pointer'}}
                              type="submit"
                              >
                            Submit
                            </button>
                            <Link to="/SignUp">
                                <button className="btn" style={{ cursor: 'pointer' }}>Sign Up</button>
                            </Link>
                        </form>
                    )}

                    {error && (
                        <div>
                            {error.message}
                        </div>
                    )}
                </div>
            </div>
        </main>
    )

}

export default Login