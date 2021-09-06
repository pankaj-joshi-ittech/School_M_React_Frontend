import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from "yup";
import swal from 'sweetalert';
import Spinner from '../common/Spinner';

const Login = () => {

   let [loading, setLoading] = useState(true);

   useEffect(() => {
      setTimeout(() => {
         setLoading(false);
      }, 5000)
   }, [])

   
   const initialValues = {
      email: '',
      password: ''
   };

   const Schema = Yup.object().shape({
      email: Yup.string()
         .email("Wrong email format")
         .required("Email is required"),
      password: Yup.string().required("Password is required")
   });

   const getInputClasses = (fieldname) => {
      if (formik.touched[fieldname] && formik.errors[fieldname]) {
         return "is-invalid";
      }

      if (formik.touched[fieldname] && !formik.errors[fieldname]) {
         return "is-valid";
      }

      return "";
   };

   const formik = useFormik({
      initialValues,
      validationSchema: Schema,
      onSubmit: (values, { setStatus, setSubmitting }) => {
         swal("Good job!", "You clicked the button!", "success");
      },
      onReset: (values, { resetForm }) => {
         resetForm();
      },
   });

 
   return (
      <div>
         {loading ? (<div className="sweet-loading"><Spinner /></div>) : (
            <div className="section login-pg">
               <div className="container">
                  <div className="row align-items-center justify-content-center">

                     <div className="col-md-6 col-lg-5 offset-lg-1 text-center mb-3 mb-sm-0 boxShadow">
                        <form className="form" onSubmit={formik.handleSubmit}>
                           <h3>Login to <span className="bold color-primary ">School Management</span></h3>
                           <img src="./assets/images/edulogo.jpg" height="80" width="120" />
                           <div className="form-group log-password my-4">
                              <input
                                 type="text"
                                 className={`form-control form-control-lg form-control-solid ${getInputClasses(
                                    "email"
                                 )}`}
                                 name="email"
                                 {...formik.getFieldProps("email")}
                              />
                              <label className="control-label">Email</label>
                              {formik.touched.email && formik.errors.email ? (
                                 <div className="invalid-feedback text-left">
                                    {formik.errors.email}
                                 </div>
                              ) : null}
                           </div>
                           <div className="form-group log-password my-4">
                              <input
                                 type="password"
                                 className={`form-control form-control-lg form-control-solid ${getInputClasses(
                                    "password"
                                 )}`}
                                 name="password"
                                 {...formik.getFieldProps("password")}
                              />
                              <label className="control-label">Password</label>
                              {formik.touched.password && formik.errors.password ? (
                                 <div className="invalid-feedback text-left">
                                    {formik.errors.password}
                                 </div>
                              ) : null}
                           </div>
                           <button
                              type="submit"
                              className="btn btn-success mr-2 btn-color btn-lg mb-4"
                              disabled={
                                 formik.isSubmitting || (formik.touched && !formik.isValid)
                              }
                           >
                              Sign in
                              {formik.isSubmitting}
                           </button>

                        </form>
                        <div className="form-group">
                           <Link to="/register" className="color-primary bold mt-5 mb-4" >Create New Account!</Link>
                        </div>

                     </div>
                  </div>
               </div>
            </div>

         )}
      </div>
   );
}


export default Login;