import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { closePopup } from "../redux/features/auth/popupSlice";
import { ImCross } from "react-icons/im";
// import { updateLoginField, resetLoginForm } from "../redux/features/auth/loginSlice";
import { setCredentials } from "../redux/features/auth/authSlice";
import { useLoginUserMutation } from "../redux/features/auth/authApi";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

function Login() {
  const {user}=useSelector((state)=>state.auth);
  const dispatch = useDispatch();
  const navigate=useNavigate();
  if(user){
    navigate(-1);
  }
  const [showPass, setShowPass] = useState(false);
  const [loginUser, { isLoading, data, error }] = useLoginUserMutation();
  // validation schema-------------------------
  const validationSchema = Yup.object({
    email:Yup.string().required("Email is required").email("Invalid email Format"),
    password: Yup.string().required("Password is required"),
  });

const formik = useFormik({
  initialValues: {
    email: "",
    password: "",
  },
  validationSchema,
  onSubmit: async (values, actions) => {
    try {
      const res = await loginUser(values);
      if (res?.data?.success === true) {
        dispatch(setCredentials({
        accessToken: res.accessToken,
        user: res.data.user,
      }));
      // Reset the form data
      alert(res?.data?.message)
      actions.resetForm();
      navigate(-1);
      } else{
        alert(res?.error?.data?.message)
      }
      actions.resetForm();
    } catch (err) {
      console.error(err?.data?.message || "Login failed");
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
          <h2 className="text-2xl font-bold text-white text-center mb-4">Login</h2>

            {/* Google */}
            <button className="w-full py-3 rounded-xl bg-white text-gray-800 font-semibold flex items-center justify-center gap-3 shadow">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-6 h-6"
              />
              Login with Google
            </button>

            <div className="flex items-center mt-6">
              <div className="flex-grow h-px bg-gray-700" />
              <span className="text-gray-400 px-3">or</span>
              <div className="flex-grow h-px bg-gray-700" />
            </div>

            <div className="relative">
              {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="current-password"
              className="w-full mt-5 px-4 py-3 bg-gray-800 text-white rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.email && touched.email ? (
            <div className="text-red-500 text-sm">{errors.email}</div>
          ) : null}
            {/* Password */}
            <input
              type={showPass?"text":"password"}
              name="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="current-password"
              className="w-full mt-4 px-4 py-3 bg-gray-800 text-white rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {showPass ?
              <BiSolidShow
                onClick={() => {
                  setShowPass(false);
                }}
                className="absolute text-white text-2xl bottom-4 right-2"
              />:
              <BiSolidHide
                onClick={() => {
                  setShowPass(true);
                }}
                className="absolute text-white text-2xl bottom-4 right-2"
              />
            }
            </div>
            {errors.password && touched.password? <div className="text-red-500 text-sm">{errors.password}</div>:null}
            <button type="submit" className="w-full mt-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-white font-semibold shadow-lg transition">
              Login
            </button>

            <button
              className="w-full mt-4 py-2 text-gray-400 hover:text-white text-sm"
            >
              Don't have an account?{" "}
              <span className="text-indigo-400 cursor-pointer">Signup</span>
            </button>
            </form>
        </div>
  );
}

export default Login;
