// Importing necessary libraries and components
import React, { useState } from 'react';
import styles from './SimpleAuthPage.module.css';
import { USER_API, API_URL } from '../../../config';
import { useNavigate } from 'react-router-dom';

// This component handles user authentication (login/signup) using a simple form.
const SimpleAuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        password: '',
    });

    // This function handles the change in input fields and updates the state accordingly.
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // This function handles user login and signup based on the isLogin state.
    const loginUser = async () => {
        try {
            const response = await fetch(USER_API.LOGIN, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phone: form.phone, password: form.password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Login failed');
            }

            const data = await response.json();

            if (data.tokens?.access && data.tokens?.refresh) {
                localStorage.setItem('access', data.tokens.access);
                localStorage.setItem('refresh', data.tokens.refresh);
                alert('Login successful!');
                navigate("/"); // 👈 Redirect to home page
            } else {
                alert('Login successful, but no tokens returned.');
            }
        } catch (error) {
            alert('Login error: ' + error.message);
            console.error(error);
        }
    };

    // This function handles user signup and switches to the login view after successful signup.
    const signupUser = async () => {
        try {
            const response = await fetch(USER_API.SIGNUP, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Signup failed');
            }

            await response.json();
            alert('Signup successful! Now please login.');
            setIsLogin(true); // Switch to login view
        } catch (error) {
            alert('Signup error: ' + error.message);
            console.error(error);
        }
    };
    // This function handles form submission and calls the appropriate function based on the isLogin state.
    const handleSubmit = (e) => {
        e.preventDefault();
        isLogin ? loginUser() : signupUser();
    };

    return (
        // The main component rendering the form and handling user authentication
        <div className={styles.container}>
            <h2 className={styles.title}>{isLogin ? 'Login' : 'Sign Up'}</h2>
            
            {/* // Form for user login/signup */}
            <form onSubmit={handleSubmit} className={styles.form}>
                {!isLogin && (
                    <>
                        {/* // Input fields for first name and last name during signup */}
                        <input
                            className={styles.input}
                            name="firstName"
                            placeholder="First Name"
                            value={form.firstName}
                            onChange={handleChange}
                            required
                        />
                        <input
                            className={styles.input}
                            name="lastName"
                            placeholder="Last Name"
                            value={form.lastName}
                            onChange={handleChange}
                            required
                        />
                    </>
                )}
                {/* // Input fields for phone number and password */}
                <input
                    className={styles.input}
                    name="phone"
                    placeholder="Phone Number"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    required
                />
                <input
                    className={styles.input}
                    name="password"
                    placeholder="Password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                />
                <button className={styles.button} type="submit">
                    {isLogin ? 'Login' : 'Sign Up'}
                </button>
            </form>
                {/* // This button handles the Google login functionality */}
            <div className={styles.switchText}>
                {isLogin ? 'Don’t have an account?' : 'Already have an account?'}
                <button
                    type="button"
                    className={styles.linkButton}
                    onClick={() => setIsLogin(!isLogin)}
                >
                    {isLogin ? 'Sign up' : 'Login'}
                </button>
            </div>
        </div>
    );
};

export default SimpleAuthPage;
