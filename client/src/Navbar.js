import React, { useEffect, useState } from 'react'
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const { Link } = require("react-router-dom");

const API_BASE = "http://localhost:8080";

const Navbar = ({ logOut, status, isAdmin }) => {

    const navigate = useNavigate();

    return (
        <nav className="navbar text-white bg-dark d-flex justify-content-center align-items-center"
            style={{ position: 'fixed', width: '100%', height: '50px' }}
        >
            <div className='w-40 d-flex justify-content-left'>
                <a class="navbar-brand text-white p-1" href="#">Hidden brand</a>
            </div>
            <div className='w-60 d-flex flex-row'>
                <Link className='nav-link mx-4' to="/" >
                    Home
                </Link>
                <Link className='nav-link mx-4' to="/my-account" >
                    My Account
                </Link>


                <Link className='nav-link mx-4' to="/register">
                    Register
                </Link>
                {(!status) ? (
                    <Link className='nav-link mx-4' to="/login">
                        Login
                    </Link>
                ) : (
                    <span className='nav-link d-flex justify-content-center align-items-center'>

                        {(isAdmin) ? (
                            <Link className='nav-link mx-4' to="/add-book">
                                Add Book
                            </Link>

                        ) : null}

                        {(isAdmin) ? (
                            <Link className='nav-link mx-4' to="/rented-books">
                                Rented Books
                            </Link>

                        ) : null}

                        <Link className='nav-link mx-4' to="/login" onClick={logOut}>
                            Logout
                        </Link>


                    </span>
                )}
            </div>

        </nav>
    )
}

export default Navbar