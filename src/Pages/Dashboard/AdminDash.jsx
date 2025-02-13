import React, { useEffect, useState } from "react";
import {
  Button,
  Divider,
  Grid,
  Typography,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { PATHS } from "../../Routings/Paths";
import { getMenuList } from "../../Services/MenuServices";

function AdminDash() {
  const navigate = useNavigate();
  const [menuList, setMenuList] = useState([]);

  const fetchMenuList = async () => {
    const res = await getMenuList();
    if (res.isSuccess) {
      setMenuList(res.data);
    } else {
      alert("Failed to fetch menu list");
      console.log(res.error);
    }
  };

  useEffect(() => {
    fetchMenuList();
  }, []);

  const handleUpdateMenu = (menuItemId) => {
    navigate(PATHS.MENU_MANAGER, { state: { menuItemId } });
  };

  return (
    <Grid container spacing={2} mt={2}>
      <Grid item xs={6}>
        <Typography variant="h5">Menu list</Typography>
      </Grid>
      <Grid item xs={6} style={{ textAlign: "right" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(PATHS.MENU_MANAGER)}
        >
          Add Menu
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      {menuList.map((menuItem) => (
        <Grid item xs={12} sm={4} key={menuItem.menuItemId}>
          <Card
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(10px)",
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div">
                {menuItem.title}
                <IconButton
                  aria-label="edit"
                  onClick={() => handleUpdateMenu(menuItem.menuItemId)}
                  sx={{ float: "right" }}
                >
                  <EditIcon />
                </IconButton>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {menuItem.details}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ display: "flex", alignItems: "center" }}
              >
                Price: {menuItem.price}
                <span style={{ marginLeft: 4 }}>₹</span>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default AdminDash;
