import React, { useState } from 'react';

const AdminView = ({ properties, newOwners, handleNewOwnerChange, sellProperty, createProperty, category, setCategory, location, setLocation, area, setArea, owner, setOwner, onLogout }) => {
    const [searchQuery, setSearchQuery] = useState("");

    // Filtra propriedades com base na localização
    const filteredProperties = properties.filter(property =>
        property.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

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

            {/* Campo de busca */}
            <input
                type="text"
                placeholder="Buscar por localização"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ marginBottom: "10px", padding: "5px" }}
            />

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

export default AdminView;
