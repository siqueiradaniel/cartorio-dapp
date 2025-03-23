import React from 'react';

const UserView = ({ properties, newOwners, handleNewOwnerChange, sellProperty, onLogout }) => {
    return (
        <div style={{ padding: "20px" }}>
            <button onClick={onLogout}>Logout</button>
            <h2>Gerenciamento de Propriedades</h2>
            <h3>Propriedades Implantadas</h3>
            <ul>
                {properties.length > 0 ? (
                    properties.map((property, index) => (
                        <li key={index}>
                            <p>ID: {property.id}</p>
                            <p>Categoria: {property.category}</p>
                            <p>Localização: {property.location}</p>
                            <p>Área: {property.area}</p>
                            <p>Proprietário: {property.owner}</p>
                            <input
                                type="text"
                                placeholder="Novo Proprietário"
                                value={newOwners[property.id] || ""}
                                onChange={(e) => handleNewOwnerChange(property.id, e.target.value)}
                            />
                            <button onClick={() => sellProperty(property.id)}>Vender Propriedade</button>
                        </li>
                    ))
                ) : (
                    <p>Nenhuma propriedade implantada ainda.</p>
                )}
            </ul>
        </div>
    );
};

export default UserView;