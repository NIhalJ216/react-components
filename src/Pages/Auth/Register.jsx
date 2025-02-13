import React, { useState } from "react";
import {
  Grid,
  TextField,
  IconButton,
  InputAdornment,
  Button,
  Typography,
  Container,
  Paper,
  Box,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { registerUser } from "../../Services/AuthServices";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../Routings/Paths";
import RegisterBg from "../../Assets/Images/backgrounds/RegisterBg.jpg";
import "../../Styles/Styles.scss";

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [payload, setPayload] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    password: "",
  });

  const updatePayload = (pairs) =>
    setPayload((prevPayload) => ({ ...prevPayload, ...pairs }));

  const handleChange = (event) => {
    updatePayload({ [event.target.name]: event.target.value });
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleRegister = async () => {
    const res = await registerUser(payload);
    if (res.isSuccess) {
      alert(res.data);
      updatePayload({
        firstName: "",
        lastName: "",
        email: "",
        userName: "",
        password: "",
      });
    } else {
      alert("Error occured");
      console.log("ERROR", res.error);
    }
  };

  return (
    <Grid container className="TopGridContainer">
      {/* Background Image */}
      <Box
        className="ImgBox"
        sx={{
          backgroundImage: `url(${RegisterBg})`,
        }}
      />
      <Container maxWidth="xs">
        <Paper elevation={3} className="PaperBlurr">
          <Typography variant="h5" gutterBottom>
            Register
          </Typography>
          <TextField
            name="firstName"
            value={payload.firstName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            label="First Name"
            variant="outlined"
          />
          <TextField
            name="lastName"
            value={payload.lastName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            label="Last Name"
            variant="outlined"
          />
          <TextField
            name="email"
            value={payload.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            label="Email"
            variant="outlined"
            type="email"
          />
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
          <Button
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: "1rem" }}
            onClick={handleRegister}
          >
            Register
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: "0.5rem" }}
            onClick={() => navigate(PATHS.LOGIN)}
          >
            Back to login
          </Button>
        </Paper>
      </Container>
    </Grid>
  );
}

export default Register;
