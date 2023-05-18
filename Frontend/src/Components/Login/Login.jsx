import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../Login/Login.css";

const Login = () => {
  let nav = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(/^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,}$/, "Password must be strong"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      axios
        .post("http://localhost:3220/accounts/login", values)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          console.log(response.data);
          nav("/usertable");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  return (
    <>
      <section
        className=" d-flex  align-items-md-center "
        style={{ height: "100vh" }}
      >
        <div className=" container  ">
          <div className="row  g-4  p-lg-5 p-md-5 d-flex justify-content-center">
            <div className=" col-md-8   d-flex justify-content-center  ">
              <div
                className=" card border   p-5 mt-5 p-sm-5  rounded-3 bg-light "
                style={{ width: "500px" }}
              >
                <h3 className="login-text pb-3  d-flex justify-content-center mt-5 fw-bold">
                  Login<i className="bi bi-box-arrow-in-right me-2"></i>
                </h3>

                <div className=" ">
                  <form className="" onSubmit={formik.handleSubmit}>
                    <div className="form-group pb-3">
                      <label htmlFor="email" className="fw-bold ">
                        Email:
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
                      <label htmlFor="password" className="fw-bold ">
                        Password:
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
                    <div className="pb-2 d-flex justify-content-center">
                      <button
                        type="submit"
                        className="login-btn   w-50 font-weight-bold mt-3"
                      >
                        {" "}
                        Login<i className="bi bi-box-arrow-in-right me-2"></i>
                      </button>
                    </div>
                  </form>
                  <div className="pt-4 mb-5  d-flex justify-content-center">
                    Don't have Account?
                    <Link to="/signup" className="text-decoration-none ">
                      Sign up
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
