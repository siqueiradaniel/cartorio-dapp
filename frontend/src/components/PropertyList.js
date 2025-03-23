import React from 'react';
import PropertyItem from './PropertyItem';

const PropertyList = ({ properties, newOwners, handleNewOwnerChange, sellProperty }) => {
    return (
        <div>
            <h3>Propriedades Implantadas</h3>
            <ul>
                {properties.length > 0 ? (
                    properties.map((property, index) => (
                        <PropertyItem
                            key={index}
                            property={property}
                            newOwner={newOwners[property.id]}
                            handleNewOwnerChange={handleNewOwnerChange}
                            sellProperty={sellProperty}
                        />
                    ))
                ) : (
                    <p>Nenhuma propriedade implantada ainda.</p>
                )}
            </ul>
        </div>
    );
};

export default PropertyList;