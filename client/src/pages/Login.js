import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "./../redux/store";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // state
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  // handle input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/user/login", {
        email: inputs.email,
        password: inputs.password,
      });

      if (data?.success) {
        localStorage.setItem("userId", data?.user._id);
        dispatch(authActions.login());
        toast.success("User Logged In Successfully!");
        navigate("/");
      }
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={450}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          margin={"auto"}
          marginTop={5}
          boxShadow={"10px 10px 20px #ccc "}
          padding={3}
          borderRadius={5}
        >
          <Typography
            variant="h4"
            padding={3}
            textAlign={"center"}
            sx={{ textTransform: "uppercase" }}
          >
            Login
          </Typography>

          <TextField
            placeholder="Email"
            name="email"
            margin="normal"
            value={inputs.email}
            type="email"
            required
            onChange={handleChange}
          />
          <TextField
            placeholder="Password"
            name="password"
            margin="normal"
            type="password"
            value={inputs.password}
            required
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Login
          </Button>
          <Button
            onClick={() => navigate("/register")}
            sx={{ borderRadius: 3, marginTop: 3 }}
            color="primary"
          >
            Not a User? Please Register
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Login;
