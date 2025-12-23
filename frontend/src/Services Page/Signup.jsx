import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector,useDispatch } from "react-redux";
import { closePopup } from "../redux/features/auth/popupSlice";
import { ImCross } from "react-icons/im";
import {useSignupUserMutation} from "../redux/features/auth/authApi";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
const initialValues={
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    category:"",
    address:"",
    location: {
      type: "Point",
      coordinates: []
      },
    aboutMe:"",
  }

  // validation schema-------------------------
    const validationSchema=Yup.object({
      fullName: Yup.string()
      .min(3, "Full name must be at least 3 characters")
      .required("Full name is required"),
      email:Yup.string().required("Email is required").email("Invalid email Format"),
      mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
      .required("Mobile number is required"),
      password: Yup.string()
          .required("Password is required")
          .min(8, "Password must be at least 8 characters")
          .matches(
          /[!@#$%^&*(),.?":{}|<>]/,
          "Password must contain at least one symbol"
          )
          .matches(/[0-9]/, "Password must contain at least one number")
          .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
          .matches(/[a-z]/, " Password must contain at least one lowercase letter"),
      confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
      category:Yup.string().required("Category is required"),
      address: Yup.string().when("category", {
      is: "Restaurant Partner",
      then: (schema) =>
        schema
          .min(5, "Address must be at least 5 characters")
          .required("Address is required"),
      otherwise: (schema) => schema.notRequired(),
    }),

      location: Yup.object().when("category", {
      is: "Restaurant Partner",
      then: (schema) =>
        schema.required().shape({
          type: Yup.string()
            .oneOf(["Point"], "Location type must be Point")
            .required("Location type is required"),

          coordinates: Yup.array()
            .of(Yup.number().required())
            .length(2, "Coordinates must contain latitude and longitude")
            .required("Location coordinates are required"),
        }),
      otherwise: (schema) => schema.notRequired(),
    }),

    aboutMe: Yup.string().when("category", {
      is: "Restaurant Partner",
      then: (schema) =>
        schema
          .max(300, "About me cannot exceed 300 characters")
          .required("About me is required"),
      otherwise: (schema) => schema.notRequired(),
    }),

  })

function Signup() {
  const navigate=useNavigate();
  const {user}=useSelector((state)=>state.auth);
    if(user){
      navigate(-1);
    }
  const [showPass, setShowPass] = useState(false);
  let [location, setLocation]=useState();
  const signup = useSelector((state) => state.signup);
  const [registerUser, { isLoading, data, error }] = useSignupUserMutation();

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({longitude:position.coords.longitude,latitude:position.coords.latitude})
        // alert(
        //   `Latitude: ${position.coords.latitude}\nLongitude: ${position.coords.longitude}`
        // );
      },
      (error) => {
        console.log(error);
        alert("Location access denied or unavailable.");
      }
    );
  };

   // ----------------------------------
const formik = useFormik({
  initialValues,
  validationSchema,
  onSubmit: async (values, actions) => { 
    try {
      const signupData={...values,location:
      signup.category === "Restaurant Partner"
        ? {
            type: "Point",
            coordinates: [location.longitude, location.latitude],
          }
        : undefined,}
    const res = await registerUser(signupData); 
    if (res?.data?.success === true) {
      // Reset the form data
      alert(res?.data?.message)
      actions.resetForm();
      navigate("/login");
    } else{
      alert(res?.error?.data?.message)
    }
    } catch (err) {
      console.log(err);
      console.error(err?.data?.message || "Signup Failed");
    }
  },
});

const {
  values,
  touched,
  errors,
  handleBlur,
  handleChange,
  handleSubmit,
} = formik;

  return (
        <div className="flex justify-center">
          <form onSubmit={handleSubmit} className="w-[40%] bg-gray-900 p-8 rounded-2xl mb-5">
            <h2 className="text-2xl font-bold text-white text-center mb-4">Create Account</h2>

            {/* Google */}
            <button className="w-full py-3 rounded-xl bg-white text-gray-800 font-semibold flex items-center justify-center gap-3 shadow">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-6 h-6"
              />
              Signup with Google
            </button>

            <div className="flex items-center mt-6">
              <div className="flex-grow h-px bg-gray-700" />
              <span className="text-gray-400 px-3">or</span>
              <div className="flex-grow h-px bg-gray-700" />
            </div>

            {/* Name */}
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={values.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full mt-5 px-4 py-3 bg-gray-800 text-white rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.fullName  && touched.fullName?<div className="text-red-500 text-sm" >{errors.fullName}</div>:null}
            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full mt-4 px-4 py-3 bg-gray-800 text-white rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.email && touched.email?<div className="text-red-500 text-sm" >{errors.email}</div>:null}
             <input
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              value={values.mobile}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full mt-4 px-4 py-3 bg-gray-800 text-white rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              maxLength={10}
            />
            {errors.mobile && touched.mobile?<div className="text-red-500 text-sm" >{errors.mobile}</div>:null}
            <select 
              name="category"
              value={values.category}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full mt-5 px-4 py-3 bg-gray-800 text-white rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Category</option>
              <option value="Customer">Customer</option>
              <option value="Restaurant Partner">Restaurant Partner</option>
              <option value="Delivery Partner">Delivery Partner</option>
            </select>
            {errors.category && touched.category?<div className="text-red-500 text-sm" >{errors.category}</div>:null}
            {values.category === "Restaurant Partner" && (
                <div className="mt-4 space-y-4">

                  {/* Restaurant Name */}
                  <input
                    type="text"
                    name="address"
                    placeholder="Restaurant Address"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full px-4 py-3 bg-gray-800 text-white rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />

                  {/* Restaurant Full Address */}
                  <textarea
                    name="aboutMe"
                    placeholder="About Restaurant"
                    value={values.aboutMe}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-800 text-white rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  ></textarea>

                  {/* Location Button */}
                  <button
                    type="button"
                    onClick={() => handleGetLocation()}
                    className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
                  >
                    Get Restaurant Location
                  </button>
                  {location && <p className="text-white text-center">{location?.longitude} , {location?.latitude}</p>}
                </div>
              )}

            <div className="relative">
               {/* Password */}
            <input
              type={showPass?"text":"password"}
              name="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
               autoComplete="new-password"
              className="w-full mt-4 px-4 py-3 bg-gray-800 text-white rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {showPass ?
              <BiSolidShow
                onClick={() => {
                  setShowPass(false);
                }}
                className="absolute text-2xl text-white bottom-4 right-2"
              />:
              <BiSolidHide
                onClick={() => {
                  setShowPass(true);
                }}
                className="absolute text-2xl text-white bottom-4 right-2"
              />
            }
            </div>
            {errors.password && touched.password?<div className="text-red-500 text-sm" >{errors.password}</div>:null}

            {/* Confirm Password */}
            <div className="relative">
            <input
              type={showPass?"text":"password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
               autoComplete="new-password"
              className="w-full mt-4 px-4 py-3 bg-gray-800 text-white rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {showPass ?
              <BiSolidShow
                onClick={() => {
                  setShowPass(false);
                }}
                className="absolute text-2xl text-white bottom-4 right-2"
              />:
              <BiSolidHide
                onClick={() => {
                  setShowPass(true);
                }}
                className="absolute text-2xl text-white bottom-4 right-2"
              />
            }
            </div>
            {errors.confirmPassword && touched.confirmPassword?<div className="text-red-500 text-sm" >{errors.confirmPassword}</div>:null}
            <button type="submit" className="w-full mt-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-white font-semibold shadow-lg transition">
              Create Account
            </button>
            <button
              className="w-full mt-4 py-2 text-gray-400 hover:text-white text-sm"
            >
              Already have an account?{" "}
              <span className="text-indigo-400 cursor-pointer">Login</span>
            </button>
            </form>
        </div>
  );
}

export default Signup;
