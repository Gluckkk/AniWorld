import { Box, Typography, Button, TextField } from "@mui/material";
import { useTheme } from "@mui/material";
import { useGetKpisQuery } from "../state/api";
import { useFormik } from "formik";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { StateContext, StateProviderType } from "../state/stateContext";
interface Values {
  username: string;
  email: string;
  password: string;
  password2: string;
}

const SignUp: React.FC = () => {
  const { data } = useGetKpisQuery();
  const [error, setError] = useState<boolean>(false);
  const [helperText, setHelperText] = useState<string>("");
  const { updateUser } = useContext(StateContext) as StateProviderType;
  const navigate = useNavigate();
  const theme = useTheme();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      password2: "",
    },
    onSubmit: async (values: Values) => {
      // if there is no anyrhing typed
      if (
        values.username === "" ||
        values.email === "" ||
        values.password === ""
      ) {
        setHelperText("You missed something");
        setError(true);
        return;
      }
      // email is used
      if (
        data.find((user) => {
          if (user.email === values.email) {
            return user.email;
          }
        })
      ) {
        setHelperText(
          "This email has already an account. Plese try another email or login with this one"
        );
        setError(true);
        return;
      }
      // username already exists
      if (
        data.find((user) => {
          if (user.username === values.username) {
            return user.username;
          }
        })
      ) {
        setHelperText("This username already exists. Please chose another one");
        setError(true);
        return;
      }
      // password is less than 8 characters
      if (values.email.length < 8) {
        setHelperText(
          "This password is too short. Please make it at least 8 characters long"
        );
        setError(true);
        return;
      }

      // passwords don't match
      if (values.password !== values.password2) {
        setHelperText(
          "Your passwords don't match. Please write identical passwords"
        );
        setError(true);
        return;
      }
      // creating new user

      const newUser = {
        username: values.username,
        email: values.email,
        password: values.password,
        bookmarks: [],
        watched: [],
        watchLater: [],
        comments: [],
      };

      //adding new user to database and navigating to userpage
      try {
        console.log(newUser);
        await axios.post("http://localhost:1337/", newUser);
        updateUser({
          loggedUser: values.username,
          email: values.email,
          password: values.password,
          bookmarks: [],
          watched: [],
          watchLater: [],
        });
        navigate(`/account/${values.username}`);
      } catch (e) {
        console.log(e);
      }
    },
  });

  return (
    <Box display="flex" justifyContent="center">
      <Box
        p="2rem"
        display="flex"
        justifyContent="center"
        width="40rem"
        borderRadius="1rem"
        boxShadow="10px 5px 5px rgba(0, 0,0, 0.20)"
        sx={{
          backgroundColor: theme.palette.background.dark,
        }}
      >
        {/* login box */}
        <Box mt="1rem" textAlign="center" width="20rem">
          <Typography variant="h2">Sign Up</Typography>
          <Box m="3rem 1rem 1rem 1rem">
            <form onSubmit={formik.handleSubmit}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap="1rem"
                color="inherit"
              >
                <TextField
                  color="accent"
                  fullWidth
                  variant="outlined"
                  type="text"
                  label="username"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  name="username"
                  error={error}
                />
                <TextField
                  color="accent"
                  fullWidth
                  variant="outlined"
                  type="text"
                  label="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  name="email"
                  error={error}
                />
                <TextField
                  color="accent"
                  fullWidth
                  variant="outlined"
                  type="password"
                  label="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  name="password"
                  error={error}
                />
                <TextField
                  color="accent"
                  fullWidth
                  variant="outlined"
                  type="password"
                  label="repeat your password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.password2}
                  name="password2"
                  error={error}
                />
              </Box>
            </form>
          </Box>
          {/* button */}
          <Typography variant="h3" color="error" m="2rem">
            {helperText ? helperText : ""}
          </Typography>
          <Button
            variant="contained"
            color="inherit"
            sx={{
              textTransform: "none",
              backgroundColor: theme.palette.accent.main,
              transition: "all 0.3s",
              "&:hover": {
                backgroundColor: theme.palette.accent.main,
                transform: "translateY(2px)",
              },
            }}
            onClick={formik.submitForm}
          >
            <Typography variant="h2">Create an account</Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;
