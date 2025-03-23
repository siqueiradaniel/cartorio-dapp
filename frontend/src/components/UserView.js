import React, { useState } from 'react';

const UserView = ({ properties, newOwners, handleNewOwnerChange, sellProperty, onLogout }) => {
    const [searchQuery, setSearchQuery] = useState("");

    // Filter properties based on the search query
    const filteredProperties = properties.filter(property =>
        property.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div style={{ padding: "20px" }}>
            <button onClick={onLogout}>Logout</button>
            <h2>Gerenciamento de Propriedades</h2>

            {/* Search Input */}
            <input
                type="text"
                placeholder="Buscar por localização"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ marginBottom: "10px", padding: "5px" }}
            />

            <h3>Propriedades Implantadas</h3>
            <ul>
                {filteredProperties.length > 0 ? (
                    filteredProperties.map((property, index) => (
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
                    <p>Nenhuma propriedade encontrada.</p>
                )}
            </ul>
        </div>
    );
};

export default UserView;
