import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from "yup";
import swal from 'sweetalert';
import Spinner from '../common/Spinner';
import auth, { signup } from '../helper/auth';


const Register = () => {

   let [loading, setLoading] = useState(true);

   useEffect(() => {
      setTimeout(() => {
         setLoading(false);
      }, 5000)
   }, [])

   const initialValues = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirm_password:''
   };

   const Schema = Yup.object().shape({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      email: Yup.string()
         .email("Wrong email format")
         .required("Email is required"),
         password: Yup.string().required("Password is required"),
      confirm_password: Yup.string()
      .required("Password confirmation is required")
      .when("password", {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Password and Confirm Password didn't match"
        ),
      }),
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
         handleSignupSubmit(values,setSubmitting);
      },
      onReset: (values, { resetForm }) => {
         resetForm();
      },
   });


   const handleSignupSubmit = (formValue,setSubmitting) =>{
      signup(formValue).then((response)=>{
         if(response.status=='succss'){
            setSubmitting(false);
            swal("Registration Completed!", "Registration!", "success");
         }
      })
    }

   

   return (
      (loading ? (<div className="sweet-loading"><Spinner /></div>):(
         <div className="section login-pg pt-5">
         <div className="container">
            <div className="row align-items-center  justify-content-center">
               <div className="col-md-6  text-center mt-3 mt-sm-0 boxShadow" >
                  <form className="form" onSubmit={formik.handleSubmit}>
                     <h3>Sign Up For <span className="bold color-primary">School Management</span></h3>
                     <img src ="./assets/images/edulogo.jpg" height="80" width="120"/>
                     <div className="form-group log-password my-4">
                        <input
                           type="text"
                           className={`form-control form-control-lg form-control-solid ${getInputClasses(
                              "firstName"
                           )}`}
                           name="firstName"
                           {...formik.getFieldProps("firstName")}
                        />
                        <label className="control-label">First Name</label>
                        {formik.touched.firstName && formik.errors.firstName ? (
                           <div className="invalid-feedback text-left">
                              {formik.errors.firstName}
                           </div>
                        ) : null}
                     </div>
                     <div className="form-group log-password my-4">
                        <input
                           type="text"
                           className={`form-control form-control-lg form-control-solid ${getInputClasses(
                              "lastName"
                           )}`}
                           name="lastName"
                           {...formik.getFieldProps("lastName")}
                        />
                        <label className="control-label">Last Name</label>
                        {formik.touched.lastName && formik.errors.lastName ? (
                           <div className="invalid-feedback text-left">
                              {formik.errors.lastName}
                           </div>
                        ) : null}
                     </div>
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
                     <div className="form-group log-password my-4">
                        <input
                           type="password"
                           className={`form-control form-control-lg form-control-solid ${getInputClasses(
                              "confirm_password"
                           )}`}
                           name="confirm_password"
                           {...formik.getFieldProps("confirm_password")}
                        />
                        <label className="control-label">Confirm Password</label>
                        {formik.touched.confirm_password && formik.errors.confirm_password ? (
                           <div className="invalid-feedback text-left">
                              {formik.errors.confirm_password}
                           </div>
                        ) : null}
                     </div>

                     {/* <input type="submit" value="Login" className="btn btn-primary btn-color btn-lg mb-4" /> */}
                     <button
                        type="submit"
                        className="btn btn-success mr-2 btn-color btn-lg mb-4"
                        disabled={
                           formik.isSubmitting || (formik.touched && !formik.isValid)
                        }
                     >
                        Sign up
                        {formik.isSubmitting}
                     </button>
                    

                  </form>
                  <div className="form-group">
                        <Link to="/login" className="color-primary bold mt-4">Already Have an Account! Please Sign in</Link>
                     </div>

               </div>
            </div>
         </div>
      </div>
      ))

     


   );
}


export default Register;
