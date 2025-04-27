// Importing necessary libraries and components
import React, { useState } from 'react';
import styles from './SimpleAuthPage.module.css';
import { USER_API } from '../../../config';
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
        confirmPassword: '',
    });

    // This function handles the change in input fields and updates the state accordingly.
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // This function validates if password meets the strength criteria
    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        return passwordRegex.test(password);
    };

    // This function validates if phone number starts with 6,7,8,9 and is exactly 10 digits
    const validatePhone = (phone) => {
        const phoneRegex = /^[6-9]\d{9}$/;
        return phoneRegex.test(phone);
    };

    // This function handles user login
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

                // 👇 ADD THIS LINE to trigger Navbar update
                window.dispatchEvent(new Event('storage'));

                alert('Login successful!');
                navigate("/"); // Redirect to home page
            } else {
                alert('Login successful, but no tokens returned.');
            }
        } catch (error) {
            alert('Login error: ' + error.message);
            console.error(error);
        }
    };

    // This function handles user signup and switches to the login view after successful signup
    const signupUser = async () => {
        try {
            const response = await fetch(USER_API.SIGNUP, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // Only sending password (not confirm password) to backend
                body: JSON.stringify({
                    firstName: form.firstName,
                    lastName: form.lastName,
                    phone: form.phone,
                    password: form.password,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(Object.values(errorData).join(' ') || 'Signup failed');
            }

            await response.json();
            alert('Signup successful! Now please login.');
            setIsLogin(true);
        } catch (error) {
            alert('Signup error: ' + error.message);
            console.error(error);
        }
    };

    // This function handles form submission and validates input before sending to backend
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validatePhone(form.phone)) {
            alert('Phone number must start with 6/7/8/9 and be 10 digits.');
            return;
        }

        if (!validatePassword(form.password)) {
            alert('Password must be at least 8 characters and include at least one special character (!@#$%^&*).');
            return;
        }

        if (!isLogin && form.password !== form.confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        isLogin ? loginUser() : signupUser();
    };

    return (
        // The main component rendering the form and handling user authentication
        <div className={styles.container}>
            <h2 className={styles.title}>{isLogin ? 'Login' : 'Sign Up'}</h2>

            {/* Form for user login/signup */}
            <form onSubmit={handleSubmit} className={styles.form}>
                {/* Input fields for first name and last name during signup */}
                {!isLogin && (
                    <>
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
                {/* Input fields for phone number */}
                <input
                    className={styles.input}
                    name="phone"
                    placeholder="Phone Number"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    required
                />
                {/* Input fields for password */}
                <input
                    className={styles.input}
                    name="password"
                    placeholder="Password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                />
                {/* Input field for confirm password during signup */}
                {!isLogin && (
                    <input
                        className={styles.input}
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        type="password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                )}
                {/* Button for login and register */}
                <button className={styles.button} type="submit">
                    {isLogin ? 'Login' : 'Sign Up'}
                </button>
            </form>

            {/* This section handles switching between login and signup */}
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
