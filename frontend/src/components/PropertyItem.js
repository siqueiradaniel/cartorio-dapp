import React from 'react';

const PropertyItem = ({ property, newOwner, handleNewOwnerChange, sellProperty }) => {
    return (
        <li>
            <p>ID: {property.id}</p>
            <p>Categoria: {property.category}</p>
            <p>Localização: {property.location}</p>
            <p>Área: {property.area}</p>
            <p>Proprietário: {property.owner}</p>
            <input
                type="text"
                placeholder="Novo Proprietário"
                value={newOwner || ""}
                onChange={(e) => handleNewOwnerChange(property.id, e.target.value)}
            />
            <button onClick={() => sellProperty(property.id)}>Vender Propriedade</button>
        </li>
    );
};

export default PropertyItem;