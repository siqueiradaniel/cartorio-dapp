import React from 'react';

const TopTools = ({ onLogout }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
            <button onClick={onLogout}>Logout</button>
            <button>Create Property</button>
        </div>
    );
};

export default TopTools;