import React from 'react';
import TopTools from './TopTools';
import PropertyList from './PropertyList';
import CreatePropertyForm from './CreatePropertyForm';

const AdminView = ({ properties, newOwners, handleNewOwnerChange, sellProperty, createProperty, onLogout }) => {
    return (
        <div>
            <TopTools onLogout={onLogout} />
            <CreatePropertyForm createProperty={createProperty} />
            <PropertyList
                properties={properties}
                newOwners={newOwners}
                handleNewOwnerChange={handleNewOwnerChange}
                sellProperty={sellProperty}
            />
        </div>
    );
};

export default AdminView;