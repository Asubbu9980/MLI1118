import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../Signup/Signup.css";

const SignUp = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(/^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,}$/, "Password must be strong"),
    mobile: Yup.number().typeError("Mobile must be a number"),
    gender: Yup.string().required("gender is required"),
    address: Yup.string().required("Address is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      mobile: "",
      gender: "",
      address: "",
    },
    validationSchema,
    onSubmit: (values) => {
      axios
        .post("http://localhost:3220/accounts/signup", values)
        .then((response) => {
          console.log(response.data);
          console.log(values);
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  return (
    <>
      <div className="container-lg ">
        <div className="row    p-lg-5 p-md-5 d-flex justify-content-center">
          <div className="col-lg-6 col-md-8 d-flex justify-content-center ">
            <div
              className=" card mt-3 p-5 p-md-4 border bg-light "
              style={{ width: "440px" }}
            >
              <h3 className="signup-text pb-3 d-flex justify-content-center fw-bold">
                Sign Up
              </h3>

              <div className="form-style">
                <form onSubmit={formik.handleSubmit}>
                  <div className="form-group pb-3">
                    <label htmlFor="name" className="fw-bold">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Name"
                      name="name"
                      className="form-control"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                    />
                    {formik.touched.name && formik.errors.name ? (
                      <div className="text-danger">{formik.errors.name}</div>
                    ) : null}
                  </div>
                  <div className="form-group pb-3">
                    <label htmlFor="email" className="fw-bold">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="Email"
                      name="email"
                      className="form-control"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <div className="text-danger">{formik.errors.email}</div>
                    ) : null}
                  </div>
                  <div className="form-group pb-3">
                    <label htmlFor="password" className="fw-bold">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="Password"
                      name="password"
                      className="form-control"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <div className="text-danger">
                        {formik.errors.password}
                      </div>
                    ) : null}
                  </div>
                  <div className="form-group pb-3">
                    <label htmlFor="mobile" className="fw-bold">
                      Number
                    </label>
                    <input
                      type="number"
                      placeholder="Number"
                      name="mobile"
                      className="form-control"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.mobile}
                    />
                    {formik.touched.mobile && formik.errors.mobile ? (
                      <div className="text-danger">{formik.errors.mobile}</div>
                    ) : null}
                  </div>
                  <div>
                    <label htmlFor="gender" className="fw-bold">Gender</label>
                    <div>
                      <label>
                        <input
                        className="m-1"
                          type="radio"
                          name="gender"
                          value="male"
                          checked={formik.values.gender === "male"}
                          onChange={formik.handleChange}
                        />
                        Male
                      </label>
                      <label>
                        <input
                        className="m-1"
                          type="radio"
                          name="gender"
                          value="female"
                          checked={formik.values.gender === "female"}
                          onChange={formik.handleChange}
                        />
                        Female
                      </label>
                      <label>
                        <input
                        className="m-1"
                          type="radio"
                          name="gender"
                          value="other"
                          checked={formik.values.gender === "other"}
                          onChange={formik.handleChange}
                        />
                        Other
                      </label>
                    </div>
                    {formik.touched.gender && formik.errors.gender ? (
                      <div className="text-danger">{formik.errors.gender}</div>
                    ) : null}
                  </div>

                  <div className="form-group pb-3">
                    <label htmlFor="address" className="fw-bold">
                      Address
                    </label>
                    <input
                      type="text"
                      placeholder="Address"
                      name="address"
                      className="form-control "
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.address}
                    />
                    {formik.touched.address && formik.errors.address ? (
                      <div className="text-danger">{formik.errors.address}</div>
                    ) : null}
                  </div>

                  <div className="pb-2 d-flex justify-content-center">
                    <button
                      type="submit"
                      className="signup-btn w-50 font-weight-bold mt-3"
                    >
                      Sign Up
                    </button>
                  </div>
                </form>
                <div className="pt-4 mb-3 d-flex justify-content-center">
                  you have Account?
                  <Link to="/" className="text-decoration-none">
                    Sign in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
