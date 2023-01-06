import axios from 'axios';
import React, { useEffect } from 'react'
import FormData from 'form-data';

import { useState, } from "react";
import Swal from 'sweetalert2';

const API_BASE = "http://localhost:8080";

const AddBook = () => {


    const [newBook, setNewBook] = useState(
        {
            title: '',
            author: '',
            price: '',
            category: 'Fairy Tales',
            isbn: '',
            availablity: '',
            image: '',

        }
    );

    const [file, setFile] = useState(null);


    const handleChange = ({ target }) => {
        setNewBook({ ...newBook, [target.name]: target.value });
    }

    const handlePhoto = ({ target }) => {
        setFile(URL.createObjectURL(target.files[0]));
        setNewBook({ ...newBook, image: target.files[0] });
        console.log(newBook.image);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', newBook.title);
        formData.append('author', newBook.author);
        formData.append('price', newBook.price);
        formData.append('category', newBook.category);
        formData.append('isbn', newBook.isbn);
        formData.append('availablity', newBook.availablity);
        formData.append('image', newBook.image);


        console.log(formData.image);

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
                axios.post('http://localhost:8080/api/upload', formData)
                    .then(res => {
                        console.log(formData);
                    })
                    .catch(err => {
                        console.log(err);
                    });

            }
        });



    }

    const categories = [
        {
            label: "Fairy Tales",
            value: "Fairy Tales",
        },
        {
            label: "Fantasy",
            value: "Fantasy",
        },
        {
            label: "Horror",
            value: "Horror",
        }
    ];

    return (
        <section class="vh-100" style={{ paddingTop: '80px' }}>
            <h1 class="mb-3 d-flex justify-content-center align-items-center">Add Book</h1>
            <div class="container-fluid ">
                <div class="row d-flex justify-content-center align-items-center h-100s h-100">
                    <div class="row col-md-9 col-lg-6 col-xl-9">
                        <div className='col d-flex justify-content-center align-items-center'>
                            <div class="form-outline mb-4 d-flex justify-content-center flex-column">
                                <div class="mb-4 d-flex justify-content-center">
                                    <img
                                        src={file}
                                        style={{ width: '300px', height: '300px' }} />
                                </div>
                                <div class="btn btn-primary btn-rounded">

                                    <label class="form-label text-white m-1" for="customFile1">Choose file</label>
                                    <input
                                        className='form-control d-none'
                                        type="file"
                                        name="image"
                                        onChange={handlePhoto}
                                        id="customFile1"
                                    />

                                </div>
                            </div>
                        </div>
                        <div className='col'>
                            <form className='' onSubmit={handleSubmit} encType="multipart/form-data">


                                <div class="form-outline mb-4">
                                    <label class="form-label" for="form3Example3">Enter book name</label><br />
                                    <input
                                        class="form-control"
                                        placeholder="Enter Book Name"
                                        name="title"
                                        value={newBook.title}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div class="form-outline mb-4">
                                    <label class="form-label" for="form3Example3">Enter book author</label><br />
                                    <input
                                        class="form-control"
                                        placeholder="Enter Book Author"
                                        name="author"
                                        value={newBook.author}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="select-container">
                                    <label className="form-label" for="form3Example3">Select Book Category</label><br />
                                    <select className="form-select" name="category" value={newBook.category} onChange={handleChange}>
                                        {categories.map((option) => (
                                            <option value={option.value}>{option.label}</option>
                                        ))}
                                    </select>
                                </div><br />

                                <div className='row'>

                                    <div class="col form-outline mb-4">
                                        <label class="form-label" for="form3Example3">Enter book price</label><br />
                                        <input
                                            class="form-control"
                                            placeholder="Enter Food Price"
                                            name="price"
                                            value={newBook.price}
                                            onChange={handleChange}
                                        />

                                    </div>

                                    <div class="col form-outline mb-4">
                                        <label class="form-label" for="form3Example3">Available</label><br />
                                        <input
                                            class="form-control"
                                            placeholder="Enter Availablity"
                                            name="availablity"
                                            value={newBook.availablity}
                                            onChange={handleChange}
                                        />

                                    </div>


                                    <div class="col form-outline mb-4">
                                        <label class="form-label" for="form3Example3">Enter ISBN</label><br />
                                        <input
                                            class="form-control"
                                            placeholder="Enter Book Description"
                                            name="isbn"
                                            value={newBook.isbn}
                                            onChange={handleChange}
                                        />

                                    </div>

                                </div>

                                <div class="text-center text-lg-start mt-4 pt-2">
                                    <button type="submit" class="btn btn-primary">Submit</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </section>

    )
}

export default AddBook