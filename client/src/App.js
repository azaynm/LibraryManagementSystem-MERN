import { Routes, Route, BrowserRouter, useNavigate, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Context } from './Context';
import Swal from 'sweetalert2'
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import Protected from "./Protected";



import MyAccount from "./pages/MyAccount";
import AddBook from "./pages/AddBook";
import SingleBook from "./pages/SingleBook";
import AdminProtected from "./AdminProtected";
import RentedBooks from "./pages/RentedBooks";


const API_BASE = "http://localhost:8080";

function App() {

  const [status, setStatus] = useState(false);
  const token = localStorage.getItem('rfkey');


  const checkLogin = async () => {
    const user = {
      refreshToken: token,
    };

    const { data: response } = await axios.post('http://localhost:8080/api/refreshToken', user)
    console.log(response.error);
    if (response.error === false) {
      setStatus(true);
      console.log("setted true");
    }
    else {
      setStatus(false);
      console.log("setted false");
    }
  }

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (status === true) {
      axios.get(`http://localhost:8080/api/users/getId/${localStorage.getItem("username")}`).then(resp => {
        console.log(resp.data);
        if (resp.data.isAdmin === true) {
          setIsAdmin(true);
          console.log(isAdmin)
        }
        else {
          setIsAdmin(false);
        }
      });
    }
  }, [status, setStatus]);

  useEffect(() => {
    if (status === true) {
      const { data: response } = axios.get(`http://localhost:8080/api/users/getId/${localStorage.getItem("username")}`);
        console.log(response);
        if (response.isAdmin === true) {
          setIsAdmin(true);
          console.log(isAdmin)
        }
        else {
          setIsAdmin(false);
        }

    }
  }, []);



  useEffect(() => {
    checkLogin();
  }, []);

  const logOut = async () => {


    await fetch(API_BASE + "/api/refreshToken", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        refreshToken: localStorage.getItem("rfkey"),
      })
    }).then((res) => {
      if (res.ok) {
        localStorage.setItem("rfkey", "");
        console.log("logged out successfully");
        window.location.reload(false);
        setStatus(false);
        console.log(status);
      }
      else {
        console.log("Cannot logout");

      }

    })
    localStorage.removeItem("isLogged");
  };



  return (
    <Context.Provider>
      <BrowserRouter>
        <div>
          <Navbar logOut={logOut} status={status} isAdmin={isAdmin}/>
          <Routes>

            <Route path='/' element={<Home />} />

            <Route path='/book/:id' element={<SingleBook />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/my-account' element={<MyAccount />} />

            <Route path='/rented-books' element={<RentedBooks />} />
            
            <Route path='/add-book' element={
              <AdminProtected isAdmin={isAdmin}>
                <AddBook />
              </AdminProtected>
            } />

            <Route path='/profile' element={
              <Protected isLoggedIn={status}>
                <MyAccount />
              </Protected>
            } />

          </Routes>
        </div>

      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
