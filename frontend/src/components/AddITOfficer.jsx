import React from 'react'

const AddITOfficer = () => {
    return (
        <div><div

            class="container">
            <h1 class="mt-5 mb-4">Add Employee</h1>



            <form

                class="row g-3">


                <div

                    class="col-md-6">


                    <label

                        for="firstName"

                        class="form-label">First Name</label>


                    <input

                        type="text"

                        class="form-control"

                        id="firstName"

                        name="firstName" />


                </div>


                <div

                    class="col-md-6">


                    <label

                        for="lastName"

                        class="form-label">Last Name</label>


                    <input

                        type="text"

                        class="form-control"

                        id="lastName"

                        name="lastName" />


                </div>


                <div

                    class="col-md-6">


                    <label

                        for="email"

                        class="form-label">Email</label>


                    <input

                        type="email"

                        class="form-control"

                        id="email"

                        name="email" />


                </div>


                <div

                    class="col-md-6">


                    <label

                        for="phone"

                        class="form-label">Phone Number</label>


                    <input

                        type="tel"

                        class="form-control"

                        id="phone"

                        name="phone" />


                </div>


                <div

                    class="col-12">


                    <label

                        for="jobTitle"

                        class="form-label">Job Title</label>


                    <input

                        type="text"

                        class="form-control"

                        id="jobTitle"

                        name="jobTitle" />


                </div>


                <div

                    class="col-12">
                    <button type="submit" class="btn btn-primary">Add Employee</button>
                </div>
            </form>
        </div></div>
    )
}

export default AddITOfficer