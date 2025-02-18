import React, { useEffect, useRef, useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  Divider,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getMenuList } from '../../Services/MenuServices';
import {
  orderBooking,
  getPreviousOrders,
} from '../../Services/OrderBookingServices';
import dayjs from 'dayjs';

function CustomerDash() {
  const isMounted = useRef(false);
  const userData = JSON.parse(localStorage.getItem('UserDetails'));
  const [menuList, setMenuList] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [previousOrders, setPreviousOrders] = useState([]);

  const fetchMenuList = async () => {
    const res = await getMenuList();
    if (res.isSuccess) {
      setMenuList(res.data);
    } else {
      alert('Failed to fetch menu list');
      console.log(res.error);
    }
  };

  const fetchPreviousOrders = async () => {
    const res = await getPreviousOrders(userData.userId);
    if (res.isSuccess) {
      setPreviousOrders(res.data);
    } else {
      alert('Failed to fetch previous orders');
      console.log(res.error);
    }
  };

  useEffect(() => {
    if (!isMounted.current) {
      fetchMenuList();
      fetchPreviousOrders();
      isMounted.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addMenu = (menu) => {
    const existingMenu = orderList.find(
      (order) => order.menuItemId === menu.menuItemId
    );
    if (existingMenu) {
      setOrderList(
        orderList.map((order) =>
          order.menuItemId === menu.menuItemId
            ? {
                ...order,
                quantity: order?.quantity ? order.quantity + 1 : 1,
              }
            : order
        )
      );
    } else {
      setOrderList([...orderList, { ...menu, quantity: 1 }]);
    }
  };

  const removeMenu = (menu) => {
    const newOrderList = orderList.filter((order) => order !== menu);
    setOrderList(newOrderList);
  };

  const handleCheckout = async () => {
    const totalPrice = orderList.reduce(
      (acc, cur) => acc + cur.price * cur.quantity,
      0
    );
    const data = {
      userId: userData.userId,
      orderList: orderList.map((order) => ({
        menuItemId: order.menuItemId,
        quantity: order.quantity,
      })),
      totalPrice,
    };
    const res = await orderBooking(data);
    console.log('res', res);
    if (res.isSuccess) {
      alert(`${res.data.orderID}-${res.data.message}`);
      setOrderList([]);
    } else {
      alert('Failed to place order');
      console.log(res.error);
    }
  };

  return (
    <Grid container spacing={2}>
      {menuList.map((menu, index) => (
        <Grid item xs={4} key={index}>
          <Card
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.6)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                {menu.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                gutterBottom
              >
                {menu.details}
              </Typography>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Typography variant="body2" color="text.secondary">
                    Price: {menu.price}
                    <span style={{ marginLeft: 4 }}>₹</span>
                  </Typography>
                </Grid>
                <Grid item>
                  <IconButton onClick={() => addMenu(menu)}>
                    <AddCircleOutlineIcon
                      sx={{ cursor: 'pointer' }}
                    />
                  </IconButton>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      ))}
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card
              sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}
            >
              <CardContent>
                <Typography variant="h5">Order Summary</Typography>
                <Grid item xs={12} mb={1}>
                  <Divider />
                </Grid>
                {orderList.map((order, index) => (
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                    key={index}
                  >
                    <Grid item>
                      <Typography>
                        {order.title} - ₹{order.price} x{' '}
                        {order.quantity}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <IconButton onClick={() => removeMenu(order)}>
                        <RemoveCircleOutlineIcon
                          sx={{ cursor: 'pointer' }}
                        />
                      </IconButton>
                    </Grid>
                  </Grid>
                ))}
                <Divider sx={{ mt: 2 }} />
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item>
                    <Typography variant="h6" gutterBottom>
                      Total: ₹
                      {orderList.reduce(
                        (acc, cur) => acc + cur.price * cur.quantity,
                        0
                      )}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ marginTop: '10px' }}
                      disabled={orderList.length === 0}
                      onClick={handleCheckout}
                    >
                      Proceed to Checkout
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}>
          <CardContent>
            <Typography variant="h5">Previous Orders</Typography>
            {previousOrders && previousOrders.length > 0 ? (
              previousOrders.map((order, index) => (
                <Accordion key={index}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index}-content`}
                    id={`panel${index}-header`}
                  >
                    <Typography>
                      {dayjs(order.createdAt).format('MMM D')} -
                      Total: ₹{order.totalPrice}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {order.orderList.map((item, idx) => (
                      <Typography key={idx}>
                        {item.menuItem.title} x {item.quantity} :{' '}
                        {item.menuItem.price}
                      </Typography>
                    ))}
                  </AccordionDetails>
                </Accordion>
              ))
            ) : (
              <Typography>No previous orders found.</Typography>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default CustomerDash;
