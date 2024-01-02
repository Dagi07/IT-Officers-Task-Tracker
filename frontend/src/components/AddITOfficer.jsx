import React, { useState } from "react";

const serverUrl = import.meta.env.VITE_API_serverUrl;

const AddITOfficer = () => {
  const [addOfficer, setAddOfficer] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    jobTitle: "",
  });

  const [responseData, setResponseData] = useState("");

  const handleChange = (e) => {
    setAddOfficer({
      ...addOfficer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const backendResponse = await fetch(`${serverUrl}/add-itofficer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addOfficer),
      });
      setResponseData(await backendResponse.json());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add_itofficer">
      <div class="container">
        <h1 class="mt-5 mb-4 text-center">Add Employee</h1>

        <form class="row g-3" onSubmit={handleSubmit}>
          <div class="col-md-6">
            <label for="firstName" class="form-label">
              First Name
            </label>

            <input
              type="text"
              class="form-control"
              id="firstName"
              name="firstName"
              required
              onChange={handleChange}
            />
          </div>

          <div class="col-md-6">
            <label for="lastName" class="form-label">
              Last Name
            </label>

            <input
              type="text"
              class="form-control"
              id="lastName"
              name="lastName"
              onChange={handleChange}
            />
          </div>

          <div class="col-md-6">
            <label for="email" class="form-label">
              Email
            </label>

            <input
              type="email"
              class="form-control"
              id="email"
              name="email"
              onChange={handleChange}
            />
          </div>

          <div class="col-md-6">
            <label for="phone" class="form-label">
              Phone Number
            </label>

            <input
              type="tel"
              class="form-control"
              id="phone"
              name="phone"
              onChange={handleChange}
            />
          </div>

          <div class="col-12">
            <label for="jobTitle" class="form-label">
              Job Title
            </label>

            <input
              type="text"
              class="form-control"
              id="jobTitle"
              name="jobTitle"
              required
              onChange={handleChange}
            />
          </div>

          <div class="col-12">
            <button type="submit" class="btn btn-primary">
              Add Employee
            </button>
          </div>
        </form>
      </div>
      <div
        className={`alert mt-1${
          responseData &&
          (responseData.status !== "success"
            ? " alert-danger"
            : " alert-success text-center")
        }`}
        role="alert"
      >
        {responseData.message}
      </div>
    </div>
  );
};

export default AddITOfficer;
