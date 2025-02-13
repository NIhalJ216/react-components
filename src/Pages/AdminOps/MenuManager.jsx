import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Grid, Typography, TextField } from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { addMenu, getMenuById } from "../../Services/MenuServices";
import { PATHS } from "../../Routings/Paths";

function MenuManager() {
  const navigate = useNavigate();
  const location = useLocation();
  const [payload, setPayload] = useState({
    title: "",
    details: "",
    price: "",
  });

  const updatePayload = (pairs) => {
    setPayload((prevPayload) => ({
      ...prevPayload,
      ...pairs,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    updatePayload({ [name]: value });
  };

  const handleAddMenu = async () => {
    const res = await addMenu(payload);
    if (res.isSuccess) {
      alert("Menu Added Successfully");
      updatePayload({
        title: "",
        details: "",
        price: "",
      });
    } else {
      alert("Failed to add menu");
      console.log(res.error);
    }
  };

  useEffect(() => {
    const fetchMenuItem = async (menuItemId) => {
      const res = await getMenuById(menuItemId);
      if (res.isSuccess) {
        updatePayload({
          title: res.data[0].title,
          details: res.data[0].details,
          price: res.data[0].price,
        });
      } else {
        alert("Failed to fetch menu");
        console.log(res.error);
      }
    };

    if (location.state) {
      fetchMenuItem(location.state.menuItemId);
    }
  }, [location]);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} mt={1}>
        <Typography variant="h5" align="center">
          Create Menu
        </Typography>
      </Grid>
      <Grid item xs={12} container justifyContent="center">
        <Grid item xs={4}>
          <TextField
            label="Title"
            variant="outlined"
            size="small"
            fullWidth
            margin="normal"
            name="title"
            value={payload.title}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} container justifyContent="center">
        <Grid item xs={4}>
          <TextField
            label="Details"
            variant="outlined"
            size="small"
            fullWidth
            margin="normal"
            name="details"
            value={payload.details}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} container justifyContent="center">
        <Grid item xs={4}>
          <TextField
            label="Price"
            variant="outlined"
            size="small"
            fullWidth
            margin="normal"
            name="price"
            value={payload.price}
            onChange={handleChange}
            InputProps={{
              endAdornment: <CurrencyRupeeIcon />,
            }}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} container justifyContent="center" mt={2}>
        <Grid item xs={4} textAlign="center">
          <Button variant="contained" color="primary" onClick={handleAddMenu}>
            Add
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(PATHS.ADMIN_DASHBOARD)}
            sx={{ ml: 2 }}
          >
            Back
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default MenuManager;
