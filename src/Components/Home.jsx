import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const loadData = async () => {
      var response = await axios.get("https://money-manger--backend.herokuapp.com/get");
      setData(response.data);
    };
    loadData();
  }, []);
  let income = 0;
  let expense = 0;
  data.map((i) => (income = income + parseInt(i.income)));
  data.map((i) => (expense = expense + parseInt(i.expense)));
  const useStyles = makeStyles({
    root: {
      
      border: 0,
      borderRadius: 15,
      boxShadow: "0 3px 5px 2px rgba(242, 197, 153, .3)",
      color: "blue",
      height: 48,
      padding: "0 30px",
     
    },
    root1: {
     
      border: 0,
      borderRadius: 15,
      boxShadow: "0 3px 5px 2px rgba(124, 122, 204, .3)",
      color: "red",
      height: 48,
      padding: "0 30px",
     
    },
  });
  const classes = useStyles();
  return (
    <>
      <Box sx={{ flexGrow: 1}}>
        <AppBar position="static" sx={{ p: 0.5 ,bgcolor:"darkcyan"}}>
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, ml: 2.5, fontWeight: "600" }}
            >
              Welcome to Home Page
            </Typography>
            <Link
              to="/dashboard"
              style={{ color: "black", textDecoration: "none" }}
            >
              <Button color="inherit" style={{backgroundColor: "limegreen"}}>
                Go To DashBoard  &nbsp; &nbsp; <DashboardIcon/>
              </Button>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ mx: "10%" }}>
        <Box
          className={classes.root}
          sx={{
            textAlign: "center",
            minWidth: "200px",
            minHeight: "100px",
            borderRadius: "10px",
            marginLeft:"100px",
            border: 1,
            marginTop:"40px",
            float: "left",
          }}
        >
          <Typography
            sx={{
              px: 2,
              m: 1,
              fontWeight: "600",
              textAlign: "center",
              fontSize: "20px",

            }}
          >
            Total Income Added
          </Typography>
          <Typography
            sx={{
              px: 2,
              m: 1,
              fontWeight: "600",
              textAlign: "center",
              fontSize: "20px",
            }}
          >
            {income}
          </Typography>
        </Box>
        <Box
          className={classes.root1}
          sx={{
            textAlign: "center",
            minWidth: "200px",
            minHeight: "100px",
            borderRadius: "10px",
            marginLeft: "200px",
            marginTop:"40px",
            border: 1,
            float: "left",
          }}
        >
          <Typography
            sx={{
              px: 2,
              m: 1,
              fontWeight: "600",
              textAlign: "center",
              fontSize: "20px",
            }}
          >
            Total Expense Added
          </Typography>
          <Typography
            sx={{
              px: 2,
              m: 1,
              fontWeight: "600",
              textAlign: "center",
              fontSize: "20px",
            }}
          >
            {expense}
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default Home;
