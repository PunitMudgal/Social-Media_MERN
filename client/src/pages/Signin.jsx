import { useFormik } from "formik";
import styles from "../styles/register.module.css";
import { Link, useNavigate } from "react-router-dom";
import { loginVerify } from "../helper/validation.js";
import { Toaster, toast } from "react-hot-toast";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Login } from "../helper/helper";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../store/authSlice";

function Signin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.auth.user);

  const { values, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: "nothing@gmail.com",
      password: "@password",
    },
    validate: loginVerify,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values, action) => {
      let loginPromise = Login(values);

      toast.promise(loginPromise, {
        loading: "Loging In...",
        success: "login Successful",
        error: "Couldn't Login",
      });
      loginPromise.then((res) => {
        let { user, token } = res.data;
        // console.log(user, token);
        dispatch(setLogin(user));
        localStorage.setItem("token", token);
      });
      action.resetForm();
      // navigate("/home");
    },
  });

  return (
    <div
      className={`${styles.full_registration} container flex flex-col items-center justify-center bg-gray-200`}
    >
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex flex-col items-center min-w-full">
        <h2 className="text-center text-4xl font-semibold mb-2 md:text-2xl text-gray-200">
          SIGNIN HERE
        </h2>
        <div className={styles.form_div}>
          <h3 className={styles.logo}>SOCIAL</h3>
          <Box
            onSubmit={handleSubmit}
            className={styles.register_form}
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "40ch" },
            }}
            noValidate
            autoComplete="on"
          >
            <TextField
              label="Email"
              value={values.email}
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              variant="outlined"
              required
            />
            <TextField
              label="Password"
              value={values.password}
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              variant="outlined"
              type="password"
              required
            />

            <button
              type="submit"
              variant="outlined"
              className={styles.form_btn}
            >
              Submit
            </button>
          </Box>
          <div className="text-center py-4 md:py-2">
            <span className="text-teal-800">
              Don't have an account?{" "}
              <Link
                className="text-red-500 font-semibold underline"
                to="/register"
              >
                Register
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
