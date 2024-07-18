import { useNavigate } from "react-router-dom";
import "./index.css";
import { useState, useEffect } from "react";

const LandingPage = () => {
  const [schools, setSchools] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredSchools, setFilteredSchools] = useState([]);
  const navigate = useNavigate();

  console.log(schools)

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await fetch("http://localhost:5000/getSchools");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setSchools(data);
      } catch (error) {
        console.error("Error fetching schools:", error);
      }
    };

    fetchSchools();
  }, []);

  useEffect(() => {
    setFilteredSchools(
      schools.filter((school) =>
        school.name.replace(" ","").toLowerCase().includes(searchInput.replace(" ","").toLowerCase())
      )
    );
  }, [schools, searchInput]);

  const toAddForm = () => {
    navigate("/add-form");
  };

  const handleUserInput = (e) => {
    setSearchInput(e.target.value);
  };

  const renderSchoolsList = () => {
    const listToRender = searchInput === "" ? schools : filteredSchools;
    return (
      <ul className="school-list">
        {listToRender.map((school) => (
          <li key={school.id} className="list-item">
            <img
              src={school.urlOfImg}
              alt={school.name}
              className="school-img"
            />
            <div className="school-description">
              <p>
                <span className="details-heading">School Name: </span>
                {school.name}
              </p>
              <p>
                <span className="details-heading">Address: </span>
                {school.address}
              </p>
              <p>
                <span className="details-heading">City: </span>
                {school.city}
              </p>
              <p>
                <span className="details-heading">State: </span>
                {school.state}
              </p>
              <p>
                <span className="details-heading">Email: </span>
                {school.email}
              </p>
              <p>
                <span className="details-heading">Contact: </span>
                {school.contact}
              </p>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="bg-container">
      <nav className="navbar">
        <p className="logo">School Searcher</p>
        <button className="add-btn" onClick={toAddForm}>
          Add Schools
        </button>
      </nav>
      <div className="schools-container">
        <h1 className="heading">School Searcher</h1>
        <input
          type="search"
          className="search-input"
          placeholder="Search school Name..."
          onChange={handleUserInput}
        />
        {renderSchoolsList()}
      </div>
    </div>
  );
};

export default LandingPage;
