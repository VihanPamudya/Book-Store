import React from 'react'

const Header = () => {
    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div>
                    <img src="https://img.icons8.com/external-wanicon-lineal-color-wanicon/64/000000/external-bookstore-shop-and-store-wanicon-lineal-color-wanicon.png" style={{marginLeft:"15px"}}/>
                        <a href="/" className="navbar-brand" style={{marginLeft:"10px", fontSize:"30px",position: "relative",top: "10px",}}>
                            Books Store Management Application
                        </a>
                    </div>

                </nav>
            </header>
        </div>
    )
}

export default Header
