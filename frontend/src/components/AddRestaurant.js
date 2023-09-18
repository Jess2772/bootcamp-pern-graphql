import React, { useState } from 'react';

const AddRestaurant = () => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        type: '',
        budget: '',
        description: '',
        rating: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isValid, setIsValid] = useState(false); // For form validation

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));

        // Validate form
        setIsValid(Object.values({ ...formData, [name]: value }).every(field => field));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setIsSuccess(false);

        // ...existing GraphQL mutation logic here
        const query = `
          mutation AddRestaurant($name: String!, $address: String, $type: String, $budget: Budget, $description: String, $rating: Int) {
            createRestaurant(name: $name, address: $address, type: $type, budget: $budget, description: $description, rating: $rating) {
              id
            }
          }
        `;

        const convertedFormData = {
            ...formData,
            rating: parseInt(formData.rating, 10)
        };

        try {
            const response = await fetch('http://localhost:5000/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    query,
                    variables: convertedFormData,
                }),
            });

            const result = await response.json();

            if (result.errors) {
                setError(result.errors[0].message);
            } else {
                setIsSuccess(true);
                // After submitting form, reset validation
                setIsValid(false);
                setFormData({
                    name: '',
                    address: '',
                    type: '',
                    budget: '',
                    description: '',
                    rating: '',
                });
            }
            setIsLoading(false);
        } catch (err) {
            setError('An error occurred while adding the restaurant.');
            setIsLoading(false);
        }


    };

    return (
        <div style={{ margin: 'auto', width: '50%', padding: '10px' }}>
            <h2 style={{ textAlign: 'center' }}>Add New Restaurant</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    style={{ padding: '10px', fontSize: '16px', borderRadius: '5px' }}
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    onChange={handleChange}
                    style={{ padding: '10px', fontSize: '16px', borderRadius: '5px' }}
                />
                <input
                    type="text"
                    name="type"
                    placeholder="Type"
                    onChange={handleChange}
                    style={{ padding: '10px', fontSize: '16px', borderRadius: '5px' }}
                />
                <select
                    name="budget"
                    onChange={handleChange}
                    style={{ padding: '10px', fontSize: '16px', borderRadius: '5px' }}
                >
                    <option value="">Select Budget</option>
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                </select>
                <textarea
                    name="description"
                    placeholder="Description"
                    onChange={handleChange}
                    style={{ padding: '10px', fontSize: '16px', minHeight: '100px', borderRadius: '5px' }}
                ></textarea>
                <input
                    type="number"
                    name="rating"
                    placeholder="Rating (0-5)"
                    min="0"
                    max="5"
                    onChange={handleChange}
                    style={{ padding: '10px', fontSize: '16px', borderRadius: '5px' }}
                />
                <button
                    type="submit"
                    disabled={!isValid}
                    style={{ backgroundColor: isValid ? '#007BFF' : 'grey', color: 'white', padding: '10px 20px', fontSize: '16px', cursor: 'pointer', borderRadius: '5px' }}
                >
                    Add
                </button>
            </form>
            {isLoading && <p style={{ color: 'orange' }}>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {isSuccess && <p style={{ color: 'green' }}>Restaurant successfully added!</p>}
        </div>
    );
};

export default AddRestaurant;