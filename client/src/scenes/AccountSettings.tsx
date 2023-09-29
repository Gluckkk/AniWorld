import { Box, Typography, Button, TextField } from "@mui/material";
import { useTheme } from "@mui/material";

import { useFormik } from "formik";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { StateContext, StateProviderType } from "../state/stateContext";
import Loading from "../components/loading";
import Error from "../components/error";
interface Values {
  username: string;
  email: string;
  password: string;
  newPassword: string;
}

const AccountSettings = () => {
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { state, updateUser } = useContext(StateContext) as StateProviderType;
  const navigate = useNavigate();
  const theme = useTheme();
  const [helperText, setHelperText] = useState<string>("");

  if (state.loggedUser === "") {
    navigate("/");
  }

  const formik = useFormik({
    initialValues: {
      username: state.loggedUser,
      email: state.email,
      password: state.password,
      newPassword: "",
    },
    onSubmit: async (values: Values) => {
      if (
        (values.username === state.loggedUser &&
          values.email === state.email &&
          values.password === values.newPassword) ||
        (values.username === state.loggedUser &&
          values.email === state.email &&
          values.newPassword === "")
      ) {
        setHelperText("You haven't changed anything");
        setError(true);
        return;
      }
      //password
      if (values.newPassword !== "" && values.newPassword.length < 8) {
        setHelperText(
          "This password is too short. Please make it at least 8 characters long"
        );
        setError(true);
        return;
      }

      try {
        setIsLoading(true);

        updateUser({
          loggedUser: values.username,
          email: values.email,
          password: `${
            values.newPassword !== "" ? values.newPassword : values.password
          }`,
          bookmarks: state.bookmarks,
          watched: state.watched,
          watchLater: state.watchLater,
        });
        await axios.post("http://localhost:1337/updateUser", {
          oldUsername: state.loggedUser,
          username: values.username,
          email: values.email,
          password: values.password,
        });
        navigate(`/account/${values.username}`);
      } catch (error: any) {
        <Error message={error.message} />;
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
        {/* settings box */}
        {isLoading ? (
          <Loading />
        ) : (
          <Box mt="1rem" textAlign="center" width="20rem">
            <Typography variant="h2">Settings</Typography>
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
                    type="text"
                    label="password"
                    InputProps={{
                      readOnly: true,
                    }}
                    value={formik.values.password}
                    name="password"
                    error={error}
                  />
                  <TextField
                    color="accent"
                    fullWidth
                    variant="outlined"
                    type="text"
                    label="create new password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.newPassword}
                    name="newPassword"
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
              <Typography variant="h2">Save settings</Typography>
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AccountSettings;
