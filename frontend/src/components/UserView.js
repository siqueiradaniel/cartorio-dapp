import React from 'react';
import TopTools from './TopTools';
import PropertyList from './PropertyList';

const UserView = ({ properties, newOwners, handleNewOwnerChange, sellProperty, onLogout }) => {
    return (
        <div>
            <TopTools onLogout={onLogout} />
            <PropertyList
                properties={properties}
                newOwners={newOwners}
                handleNewOwnerChange={handleNewOwnerChange}
                sellProperty={sellProperty}
            />
        </div>
    );
};

export default UserView;