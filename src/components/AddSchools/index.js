import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./index.css";

const AddForm = () => {
  const [imageUrl, setImageURL] = useState("");
  const [imageError, setImageError] = useState("");
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    data.urlOfImg = imageUrl;
    const { name, address, city, state, contact, email, urlOfImg } = data;
    const formData = { name, address, city, state, contact, email, urlOfImg };
    const response = await fetch("http://localhost:5000/schools", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const result = await response.json();
    if (response.ok) {
      alert("School added successfully!");
      navigate("/")

    } else {
      alert("Error: " + result.error);
    }
  };

  const validateImage = (file) => {
    if (!file) {
      setImageError("Image is required*");
      return false;
    }
    setImageError("");
    return true;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (validateImage(file)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageURL(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="form-bg-container">
      <h1 className="heading">ADD SCHOOL</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form-el">
        <div className="input-container">
          <label>Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="error">{errors.name.message}*</p>}
        </div>
        <div className="input-container">
          <label>Address</label>
          <input
            type="text"
            {...register("address", { required: "Address is required" })}
          />
          {errors.address && <p className="error">{errors.address.message}*</p>}
        </div>
        <div className="input-container">
          <label>City</label>
          <input
            type="text"
            {...register("city", { required: "City is required" })}
          />
          {errors.city && <p className="error">{errors.city.message}*</p>}
        </div>
        <div className="input-container">
          <label>State</label>
          <input
            type="text"
            {...register("state", { required: "State is required" })}
          />
          {errors.state && <p className="error">{errors.state.message}*</p>}
        </div>
        <div className="input-container">
          <label>Contact</label>
          <input
            type="number"
            {...register("contact", {
              required: "Contact is required",
              pattern: {
                value: /^[0-9]+$/,
                message: "Contact must be a number",
              },
            
            })}
          />
          {errors.contact && <p className="error">{errors.contact.message}*</p>}
        </div>
        <div className="input-container">
          <label>Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {imageError && <p className="error">{imageError}</p>}
        </div>
        <div className="input-container">
          <label>Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email",
              },
            })}
          />
          {errors.email && <p className="error">{errors.email.message}*</p>}
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddForm;
