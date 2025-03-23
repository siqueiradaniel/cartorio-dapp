import React from 'react';

const Login = ({ onLogin }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div>
                <h2>Login</h2>
                <button onClick={onLogin}>Login with MetaMask</button>
            </div>
        </div>
    );
};

export default Login;