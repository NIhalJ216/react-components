import React, { useState } from "react";
import {
  Grid,
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import LoginBg from "../../Assets/Images/backgrounds/LoginBg.png"; // Ensure correct path
import { loginUser } from "../../Services/AuthServices";
import { PATHS } from "../../Routings/Paths";
import "../../Styles/Styles.scss";

const LoginPage = () => {
  const navigate = useNavigate();
  const [payload, setPayload] = useState({ userName: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    const res = await loginUser(payload);
    if (res.isSuccess) {
      const data = {
        userId: res.data.userId,
        userName: res.data.userName,
        role: res.data.role,
        authToken: "AUTH_TOKEN",
      };
      localStorage.setItem("UserDetails", JSON.stringify(data));
      navigate(PATHS.DASHBOARD);
    } else {
      alert("ERROR");
    }
  };

  return (
    <Grid container className="TopGridContainer">
      {/* Background Image */}
      <Box
        className="ImgBox"
        sx={{
          backgroundImage: `url(${LoginBg})`,
        }}
      />

      {/* Centered Login Form */}
      <Container maxWidth="xs">
        <Paper elevation={3} className="PaperBlurr">
          <Typography variant="h5" gutterBottom>
            Jadhav Tiffin Services
          </Typography>
          <TextField
            name="userName"
            value={payload.userName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            label="Username"
            variant="outlined"
          />
          <TextField
            name="password"
            value={payload.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Grid
            container
            justifyContent="space-between"
            sx={{ marginTop: "8px" }}
          >
            <Link
              to="/forgot-password"
              style={{ textDecoration: "none", fontSize: "0.9rem" }}
            >
              Forgot Password?
            </Link>
            <Link
              to="/register"
              style={{ textDecoration: "none", fontSize: "0.9rem" }}
            >
              Register
            </Link>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ marginTop: "1.5rem" }}
            onClick={handleLogin}
          >
            Login
          </Button>
        </Paper>
      </Container>
    </Grid>
  );
};

export default LoginPage;
