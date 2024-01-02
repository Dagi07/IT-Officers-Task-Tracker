import React, { useEffect, useState } from "react";

const serverUrl = import.meta.env.VITE_API_serverUrl;

const ITOfficer = () => {
  const [addOfficer, setAddOfficer] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    jobTitle: "",
  });

  const [responseData, setResponseData] = useState("");
  const [itGuysList, setItGuysList] = useState([]);
  

  useEffect(() => {
    const fetchItGuys = async () => {
      try {
        const backendResponse = await fetch(`${serverUrl}/fetch-itofficer`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        setItGuysList(await backendResponse.json());
      } catch (err) {
        console.log(err);
      }
    }
    fetchItGuys()
  }, [])
  console.log(itGuysList)
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
      if(backendResponse.ok) {
        setAddOfficer({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          jobTitle: "",
        })
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async(itGuyId) => {
    try {
      const backendResponse = await fetch(`${serverUrl}/delete-itofficer/${itGuyId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      })
      backendResponse.ok && setItGuysList(await backendResponse.json());
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
    <div className="add_itofficer">
      <div className="container">
        <h1 className="mt-5 mb-4 text-center">Add Employee</h1>

        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>

            <input
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              required
              onChange={handleChange}
              value={addOfficer.firstName}
              
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>

            <input
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
              onChange={handleChange}
              value={addOfficer.lastName}
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="email" className="form-label">
              Email
            </label>

            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              onChange={handleChange}
              value={addOfficer.email}
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="phone" className="form-label">
              Phone Number
            </label>

            <input
              type="tel"
              className="form-control"
              id="phone"
              name="phone"
              onChange={handleChange}
              value={addOfficer.phone}
            />
          </div>

          <div className="col-12">
            <label htmlFor="jobTitle" className="form-label">
              Job Title
            </label>

            <input
              type="text"
              className="form-control"
              id="jobTitle"
              name="jobTitle"
              required
              onChange={handleChange}
              value={addOfficer.jobTitle}
            />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Add Employee
            </button>
          </div>
        </form>
      </div>
      
        <div
        className={`alert mt-1${responseData &&
          (responseData.status !== "success"
            ? " alert-danger"
            : " alert-success text-center")
          }`}
        role="alert"
      >
        {responseData.message}
      </div>
      
    </div>
    <div

    className="container pb-5">
    <h1 className="mt-5 mb-4">Employees</h1>

    <table className="table table-hover table-bordered">


      <thead>


        <tr>


          <th

            scope="col">First Name</th>


          <th

            scope="col">Last Name</th>


          <th

            scope="col">Email</th>


          <th

            scope="col">Phone No.</th>
          <th scope="col">Job Title</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
      {itGuysList.map(itGuy => {
return( <tr key={itGuy.id}>
  <td>{itGuy.first_name}</td>
  <td>{itGuy.last_name}</td>
  <td>{itGuy.email}</td>
  <td>{itGuy.phone}</td>
  <td>{itGuy.job_title}</td>
  <td>
    <button className="btn btn-sm btn-danger" onClick={handleClick}>Delete</button>
  </td>
</tr>)

})}
{/* { (tbody.insertAdjacentHTML('beforeend', row))} */}
      </tbody>
    </table>
  </div>
  </>
  );
};

export default ITOfficer;
