import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Swal from 'sweetalert2';
import { Button } from '@mui/material';

const API_BASE = "http://localhost:8080";

const SingleBook = () => {

    const [bookData, setBookData] = useState([]);
    const [bookDataLoading, setBookDataLoading] = useState(true);
    let { id } = useParams();
    const [days, setDays] = useState(2);

    const [rentFee, setRentFee] = useState(1)


    function valuetext(value) {
        return `${value}°C`;
    }

    const handleChange = ({ target }) => {
        setDays(target.value + 1)
        console.log(days)
    }

    const fetchBookData = async () => {
        setBookDataLoading(true);
        try {
            const { data: response } = await axios.get(`http://localhost:8080/api/book/${id}`);
            setBookData(response);
            console.log(response);
        } catch (error) {
            console.error(error.message);
        }
        setBookDataLoading(false);
    }

    useEffect(() => {
        fetchBookData();
    }, []);





    useEffect(() => {
        if(days>2){
            setRentFee(Math.ceil(bookData.price / 100 * days))
        }
        
    }, [days]);

    const checkAvailibility = async () => {
        const { data: response } = await axios.get(`http://localhost:8080/api/book/availablity/${bookData._id}`);
        return response.availablity;
    }


    const addToRentedList = async () => {
        if (await checkAvailibility()>0) {
            Swal.fire({
                title: 'Are you sure want to add this to the cart?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, add it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Added!',
                        'success'
                    )
                    const bookItem = {
                        user: localStorage.getItem('username'),
                        bookId: bookData._id,
                        bookTitle: bookData.title,
                        days: days,
                        rentFee: rentFee

                    };

                    const headers = {
                        'Authorization': 'Bearer my-token',
                        'My-Custom-Header': 'foobar'
                    };
                    axios.post(API_BASE + '/api/add-book/', bookItem, { headers });

                }
            });
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'This book is not available...',
                text: 'We are sorry!',
                footer: '<a href="">Why do I have this issue?</a>'
            })

        }


    }


    return (
        <div style={{ paddingTop: '80px' }}>
            <section class="vh-100" style={{ paddingTop: '80px' }}>
                <h1 class="mb-3 d-flex justify-content-center align-items-center">{bookData.title}</h1>
                <div class="container-fluid ">
                    <div class="row d-flex justify-content-center align-items-center h-100s h-100">
                        <div class="row col-md-9 col-lg-6 col-xl-9">
                            <div className='col d-flex justify-content-center align-items-center'>
                                <div class="form-outline mb-4 d-flex justify-content-center flex-column">
                                    <div class="mb-4 d-flex justify-content-center">
                                        <img
                                            src={bookData.image}
                                            style={{ width: '300px', height: '300px' }} />
                                    </div>

                                </div>
                            </div>
                            <div className='col'>


                                <div class="form-outline mb-4">
                                    <label><b>Author</b></label>
                                    <div>{bookData.author}</div>
                                </div>

                                <div class="form-outline mb-4">
                                    <label><b>Category</b></label>
                                    <div>{bookData.category}</div>
                                </div>

                                <div class="form-outline mb-4">
                                    <label><b>ISBN</b></label>
                                    <div>{bookData.isbn}</div>
                                </div>

                                <div class="form-outline mb-4">
                                    <label><b>Availablity</b></label>
                                    <div>{bookData.availablity}</div>
                                </div>

                                <div class="form-outline mb-4">
                                    <Box sx={{ width: 300 }}>
                                        <Slider
                                            
                                            aria-label="Temperature"
                                            
                                            getAriaValueText={valuetext}
                                            valueLabelDisplay="auto"
                                            min={2}
                                            step={1}
                                            marks
                                            
                                            max={30}
                                            onChange={handleChange}
                                            value={days}
                                        />

                                    </Box>
                                </div>

                                <div class="form-outline mb-4">
                                    Rent Fee for {days} days is {rentFee}
                                </div>




                                <div class="text-center text-lg-start mt-4 pt-2">
                                    <Button variant="contained" onClick={async () => {
                                        await addToRentedList();
                                    }}>Add to Rent</Button>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>

            </section>

        </div>
    )
}

export default SingleBook