import React from "react";
import './Header.css'


function Header(){
    return(
        <header className="header">
            <h1>❤️ Wedding Invitation Generator</h1>
            <nav className="nav-links">
                <a href="#">Create</a>
                <a href="#">Preview</a>
                <a href="#">Download</a>
            </nav>
        </header>
    );
}

export default Header;

