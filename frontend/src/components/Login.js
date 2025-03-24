import React from 'react';

const Login = ({ onLogin }) => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                background: 'linear-gradient(to bottom, #F58888, #8F4F4F)', // Gradient background
            }}
        >
            <div className="text-center">
                <button
                    onClick={onLogin}
                    style={{
                        backgroundColor: '#2C2C2C',
                        color: 'white',
                        padding: '16px 8px', // py-4, px-2 equivalent
                        borderRadius: '12px',
                        border: 'none',
                        fontSize: '16px',
                        cursor: 'pointer',
                    }}
                    className="transition duration-200 hover:bg-gray-800"
                >
                    Login with MetaMask
                </button>
            </div>
        </div>
    );
};

export default Login;
