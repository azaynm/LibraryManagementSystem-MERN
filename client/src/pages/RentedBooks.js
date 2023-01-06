import axios from 'axios';
import React, { useEffect, useState } from 'react'


const RentedBooks = () => {

    const [rentedBookDataLoading, setRentedBookDataLoading] = useState(true);
    const [rentedBookData, setRentedBookData] = useState([]);

    const [bookId, setBookId] = useState("");
    const [rentId, setRentId] = useState("");

    useEffect(() => {
        fetchRentedBookData();
    }, [rentedBookData]);

    useEffect(() => {
        fetchRentedBookData();
    }, []);

    const setConfirm = async (bookId, rentId) => {

        const formData = new FormData();

        await axios.put(`http://localhost:8080/api/books/setConfirmed/${rentId}`)
            .then(async (res) => {
                await axios.put(`http://localhost:8080/api/books/decreaseAvailability/${bookId}`)
                    .then(res => {

                    })
                    .catch(err => {
                        console.log(err);
                    });
            })
            .catch(err => {
                console.log(err);
            });

    }

    const setCancel = async (bookId, rentId) => {

        await axios.put(`http://localhost:8080/api/books/setCancel/${rentId}`)
            .then(async(res) => {
                await axios.put(`http://localhost:8080/api/books/increaseAvailability/${bookId}`)
                    .then(res => {

                    })
                    .catch(err => {
                        console.log(err);
                    });
            })
            .catch(err => {
                console.log(err);
            });

    }

    const fetchRentedBookData = async () => {
        setRentedBookDataLoading(true);
        try {
            const { data: response } = await axios.get(`http://localhost:8080/api/books/rented-books`);
            setRentedBookData(response);

        } catch (error) {
            console.error(error.message);
        }
        setRentedBookDataLoading(false);
    }

    useEffect(() => {
        fetchRentedBookData();
    }, []);


    return (
        <div style={{ paddingTop: '80px' }}>

            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Book Id</th>
                        <th scope="col">Book Name</th>
                        <th scope="col">User</th>
                        <th scope="col">Days</th>
                        <th scope="col">Rent Fee</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {rentedBookData.map((bookItem, index) => (
                        <tr>
                            <th scope="row">{index + 1}</th>
                            <td>{bookItem.bookId}</td>
                            <td>{bookItem.bookTitle}</td>
                            <td>{bookItem.user}</td>
                            <td>{bookItem.days}</td>
                            <td>{bookItem.rentFee}</td>
                            <td>{
                                (!bookItem.isConfirmed) ? (
                                    <button type="button" class="btn btn-primary" 
                                    onClick={() => {
                                        setConfirm(bookItem.bookId, bookItem._id);

                                    }} >Confirm</button>
                                ) : (
                                    <button type="button" class="btn btn-danger" 
                                        onClick={()=>{
                                            setCancel(bookItem.bookId, bookItem._id);
                                        }
                                        } name={bookItem._id}>Cancel</button>
                                )
                            }


                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>

        </div>
    )
}

export default RentedBooks