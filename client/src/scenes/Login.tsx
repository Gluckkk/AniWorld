import { Box, Typography, Button, TextField } from "@mui/material";
import { useTheme } from "@mui/material";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useGetKpisQuery } from "../state/api";
import { StateContext, StateProviderType } from "../state/stateContext";

interface Values {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { data } = useGetKpisQuery();

  const [error, setError] = useState<boolean>(false);
  const [helperText, setHelperText] = useState<string>("");
  const { updateUser } = useContext(StateContext) as StateProviderType;
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values: Values) => {
      const user = data.find((user) => {
        if (user.email === values.email && user.password === values.password) {
          return user;
        }
      });
      if (user) {
        updateUser({
          loggedUser: user.username,
          email: user.email,
          password: user.password,
          bookmarks: user.bookmarks,
          watched: user.watched,
          watchLater: user.watchLater,
        });

        navigate(`/account/${user.username}`);
      } else {
        setError(true);
        setHelperText("Wrong email or password. Please try again");
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
        <Box mt="1rem" textAlign="center">
          <Typography variant="h2">Login</Typography>
          <Typography variant="h4">
            Don't you have an account?{" "}
            <Link to="/sign-up" style={{ color: theme.palette.accent.main }}>
              Just sign up
            </Link>
          </Typography>
          <Box m="3rem 1rem">
            <form onSubmit={formik.handleSubmit}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap="1rem"
              >
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
              </Box>
            </form>
          </Box>
          <Typography variant="h3" color="error" m="2rem">
            {helperText ? helperText : ""}
          </Typography>
          {/* button */}
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
            <Typography variant="h2">Log in</Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
