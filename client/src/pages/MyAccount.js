import React from 'react'
import { useEffect } from "react";
import { useLoaderData } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from '@mui/material/Button';
import axios from 'axios';


const API_BASE = "http://localhost:8080";


const MyAccount = ({ isAdmin }) => {

    const [confirmedData, setConfirmedData] = useState([])
    const [homeBookLoading, setHomeBookLoading] = useState(true)

    const fetchConfirmedData = async () => {
        setHomeBookLoading(true);
        try {
          const { data: response } = await axios.get(`http://localhost:8080/api/users/${localStorage.getItem('username')}`);
          setConfirmedData(response);
          console.log(response);
        } catch (error) {
          console.error(error.message);
        }
        setHomeBookLoading(false);
      }
    
      useEffect(() => {
        fetchConfirmedData();
      }, []);
    
    return (
        <div class="vh-100" style={{ paddingTop: '80px' }}>
            <h1>Notifications</h1>
            {confirmedData.map((item)=>(
                
                <div>Librarian approved your request. You can get <b>{item.bookTitle}</b> book for <b>{item.days}</b> days and the rent fee is <b>${item.rentFee}</b>.</div>
                
            ))}
        </div>
    )
}

export default MyAccount