import React from 'react';

const AdminView = ({ properties, newOwners, handleNewOwnerChange, sellProperty, createProperty, category, setCategory, location, setLocation, area, setArea, owner, setOwner, onLogout }) => {
    return (
        <div style={{ padding: "20px" }}>
            <button onClick={onLogout}>Logout</button>
            <h2>Gerenciamento de Propriedades</h2>
            <p>Crie novas propriedades:</p>

            <input
                type="text"
                placeholder="Categoria"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />
            <input
                type="text"
                placeholder="Localização"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />
            <input
                type="number"
                placeholder="Área"
                value={area}
                onChange={(e) => setArea(e.target.value)}
            />
            <input
                type="text"
                placeholder="Proprietário"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
            />
            <button onClick={createProperty}>Criar Propriedade</button>

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

export default AdminView;