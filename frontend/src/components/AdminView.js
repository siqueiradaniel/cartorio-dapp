import React, { useState, useRef } from "react";

const AdminView = ({
    properties,
    createProperty,
    onLogout,
}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [showDialog, setShowDialog] = useState(false); // Dialog visibility state
    const dialogRef = useRef(null); // Reference to the dialog

    const [showForm, setShowForm] = useState(false); // State to toggle the form visibility
    const [formData, setFormData] = useState({
        category: "",
        location: "",
        area: "",
        owner: "",
    });

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const cleanFromData = () => {
        setFormData({
            category: "",
            location: "",
            area: "",
            owner: "",
        })
    }

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { category, location, area, owner } = formData;
    
        // Ensure area is a valid number
        const areaInt = parseInt(area);
        if (isNaN(areaInt)) {
        alert("Please enter a valid number for area.");
        return;
        }
    
        // Call the createProperty function from App.js
        await createProperty(category, location, areaInt, owner);
        setShowForm(false); // Hide the form after submission
        cleanFromData()
        
      };
    


    // Toggle the dialog visibility
    const toggleDialog = () => setShowDialog(!showDialog);

    const filteredProperties = properties.filter((property) =>
        property.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearchClick = () => {
        // This function can be used to perform the search when the button is clicked
        console.log("Search clicked with query:", searchQuery);
    };

    return (
        <div className="min-h-screen bg-red-300">
            {/* Top Navbar */}
            <div className="flex justify-between items-center bg-gray-200 py-6 px-24">
                <button
                    onClick={() => setShowForm(!showForm)} // Toggle form visibility
                    className="text-white bg-red-500 px-6 py-4 rounded-lg"
                    style={{ backgroundColor: "#8F4F4F" }}
                >
                    Cadastrar Propriedade
                </button>



                {/* Input with Search Icon */}
                <div className="relative w-1/2">
                    <input
                        type="text"
                        placeholder="Buscar localização..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ backgroundColor: "#8F4F4F" }}
                        className="text-white placeholder-white px-6 py-4 rounded-full w-full"
                    />
                    {/* Search Icon Button */}
                    <button
                        onClick={handleSearchClick}
                        className="absolute right-0 top-0 mt-4 mr-4 text-white"
                    >
                        <i className="fas fa-search w-6 h-6"></i>
                    </button>
                </div>

                <button 
                    onClick={onLogout} 
                    className="bg-red-500 text-white px-12 py-4 rounded-lg" 
                    style={{ backgroundColor: "#8F4F4F" }}
                >
                    Logout
                </button>
            </div>


            {/* Property Form */}
            {showForm && (
                <div className="flex justify-center mt-6">
                    <div className="w-1/3 bg-white p-6 rounded-lg shadow">
                        <form onSubmit={handleSubmit}>
                            {/* Category Field */}
                            <div className="mb-4">
                                <label className="block text-gray-700">Categoria</label>
                                <input
                                    type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border rounded-lg mt-1"
                                    required
                                />
                            </div>

                            {/* Location Field */}
                            <div className="mb-4">
                                <label className="block text-gray-700">Localização</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border rounded-lg mt-1"
                                    required
                                />
                            </div>

                            {/* Area Field */}
                            <div className="mb-4">
                                <label className="block text-gray-700">Área (m²)</label>
                                <input
                                    type="number"
                                    name="area"
                                    value={formData.area}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border rounded-lg mt-1"
                                    required
                                />
                            </div>

                            {/* Owner (Metamask Address) */}
                            <div className="mb-4">
                                <label className="block text-gray-700">Proprietário (Metamask Address)</label>
                                <input
                                    type="text"
                                    name="owner"
                                    value={formData.owner}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border rounded-lg mt-1"
                                    required
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="mt-6">
                                <button
                                    type="submit"
                                    className="w-full text-white px-6 py-4 rounded-lg"
                                    style={{ backgroundColor: "#8F4F4F" }}
                                >
                                    Cadastrar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}




            {/* Property List */}
            <div className="flex mt-24 items-center justify-center">
                <div className="w-1/2">
                    {filteredProperties.length > 0 ? (
                        <ul>
                            {filteredProperties.map((property, index) => (
                                <li key={index} className="bg-white p-4 shadow flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold">{property.category}</p>
                                        <p className="text-gray-500">{property.location} - {property.area} m²</p>
                                        <p className="text-gray-700">Proprietário: {property.owner}</p>
                                    </div>

                                    {/* Button to toggle the dialog */}
                                    <button
                                        className="text-gray-700 hover:text-red-500 px-4"
                                        onClick={toggleDialog}
                                    >
                                        <i className="fas fa-bars text-xl"></i>
                                    </button>

                                    {/* Dialog */}
                                    {showDialog && (
                                        <div
                                            ref={dialogRef}
                                            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                                        >
                                            <div className="bg-white p-6 rounded-lg w-1/3 relative">
                                                {/* Close Button (X) */}
                                                <button
                                                    onClick={() => setShowDialog(false)}
                                                    className="absolute top-0 right-0 text-2xl text-gray-500 hover:text-gray-700 p-3"
                                                >
                                                    &times;
                                                </button>

                                                <h3 className="text-xl font-semibold mb-4">Property Actions</h3>

                                                {/* Actions List */}
                                                <ul className="space-y-4">
                                                    <li className="flex justify-between items-center p-3 hover:bg-gray-100 rounded-lg cursor-pointer">
                                                        <a
                                                            href={`https://www.google.com/maps?q=${encodeURIComponent(property.location)}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex justify-between items-center w-full"
                                                        >
                                                            <span>View on Google Maps</span>
                                                            <i className="fas fa-arrow-right text-gray-500 w-5 h-5"></i>
                                                        </a>
                                                    </li>

                                                </ul>
                                            </div>
                                        </div>
                                    )}

                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-white text-center">Nenhuma propriedade encontrada.</p>
                    )}
                </div>
            </div>

        </div>


    );
};

export default AdminView;