import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Scroll from '../components/Scroll';
import SearchList from '../components/SearchList';

const Home = () => {

  const [homeBookData, setHomeBookData] = useState([])
  const [homeBookLoading, setHomeBookLoading] = useState(true);

  const fetchBookData = async () => {
    setHomeBookLoading(true);
    try {
      const { data: response } = await axios.get('http://localhost:8080/api/books');
      setHomeBookData(response);
      console.log(response);
    } catch (error) {
      console.error(error.message);
    }
    setHomeBookLoading(false);
  }

  useEffect(() => {
    fetchBookData();
  }, []);

  const [searchField, setSearchField] = useState("");

  const filteredPersons = homeBookData.filter(
    book => {
      return (
        book
        .title
        .toLowerCase()
        .includes(searchField.toLowerCase()) ||
        book
        .author
        .toLowerCase()
        .includes(searchField.toLowerCase())
      );
    }
  );

  const handleChange = e => {
    setSearchField(e.target.value);
  };

  function searchList() {
    return (
      <Scroll>
        <SearchList filteredPersons={filteredPersons} />
      </Scroll>
    );
  }

  return (
    <section style={{ paddingTop: '80px' }}>
      <div className="d-flex justify-content-center align-items-center ">
        <h2 className="">Search Book</h2>
      </div>
      <div className="d-flex justify-content-center align-items-center ">
        <input 
          className="form-control w-25"
          type = "search" 
          placeholder = "Search People" 
          onChange = {handleChange}
        />
      </div>
      {searchList()}
    </section>
  )
}

export default Home