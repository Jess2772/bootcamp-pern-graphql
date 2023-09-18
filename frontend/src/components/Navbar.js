import React from 'react';

const Navbar = ({ setCurrentPage }) => {
    return (
        <nav>
            <button onClick={() => setCurrentPage('home')}>Home</button>
            <button onClick={() => setCurrentPage('add')}>Add Restaurant</button>
        </nav>
    );
};

export default Navbar;
