import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import IconButton from "@mui/material/IconButton";
import HomeIcon from '@mui/icons-material/Home'
import {
  FormControl,
  Toolbar,
  Typography,
  Button,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Box,
  Radio,
  RadioGroup,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  AppBar,
} from "@mui/material";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
// const cors
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

function Dashboard() {

  //alert add incom
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (e) => {
    e.preventDefault();
    setOpen(false);
  };
  //Description State
  const [formData, setFormData] = useState({
    income: "",
    expense: "",
    type: "",
    description: "",
  });
  const handleChangeText = (e) => {
    var time = new Date();
    console.log();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      time: Date.now(),
      date: time.toDateString().toString(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("https://money-manger--backend.herokuapp.com/add", {
      income: formData.income,
      expense: formData.expense,
      time: formData.time,
      date: formData.date,
      desc: formData.desc,
      type: formData.type,
    });
    setFormData({
      income: "",
      expense: "",
      desc: "",
      date: "",
      time: "",
      type: "",
    });
    alert("Data Added Succesfully...");
  };
  return (
    <>
      <Box sx={{ flexGrow: 1}}>
        <AppBar position="static" sx={{ p:1,backgroundColor:"turquoise" }}>
          <Toolbar>
            <Typography
              variant="h4"
              component="div"
              sx={{ flexGrow: 1, ml:3, fontWeight: "600"}}
            >
              <Link
                to="/dashboard"
                style={{ color: "black", textDecoration: "none" }}
              >
               Money Manager Dashboard
              </Link>
            </Typography>
            <Button
              color="secondary"
              style={{backgroundColor:"limegreen"}}
              variant="contained"
              onClick={handleClickOpen}
            >
             Add Income &nbsp; &nbsp;<AttachMoneyIcon/>
            </Button>
        
        <Box sx={{ m:3, textAlign: "center" }} >
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button  style={{color: "white",backgroundColor:"mediumvioletred ",opacity:1}} variant="contained">
          Back To Home  &nbsp;&nbsp;  <HomeIcon/></Button>
        </Link>
      </Box>
          </Toolbar>
        </AppBar>
       
      </Box>
     
      <Box sx={{ minWidth: 140, m: 5,textAlign: "center",}}>
        <FormControl sx={{ width: "200px" }}>
          <InputLabel id="demo-simple-select-label" sx={{fontSize:20,color: "deeppink"}}>View By</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Choose"
          >
            <Link
              to="/weekly"
              style={{ color: "mediumvioletred", textDecoration: "none" }}
            >
              <MenuItem>Weekly</MenuItem>
            </Link>
            <Link
              to="/monthly"
              style={{ color: "mediumvioletred", textDecoration: "none" }}
            >
              <MenuItem>Monthly</MenuItem>
            </Link>
            <Link
              to="/yearly"
              style={{ color: "mediumvioletred", textDecoration: "none" }}
            >
              <MenuItem>Yearly</MenuItem>
            </Link>
          </Select>
        </FormControl>
       
      </Box>

      <Box >
        <BootstrapDialog
        style={{ backgroundColor:"lightcoral"}}
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          >
            Add Details
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <Box>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    sx={{ mx: 3, mb: 1 }}
                    value="office"
                    name="type"
                    control={<Radio />}
                    label="Office"
                    onChange={handleChangeText}
                  />
                  <FormControlLabel
                    sx={{ mb: 1 }}
                    value="personal"
                    name="type"
                    control={<Radio />}
                    label="Personal"
                    onChange={handleChangeText}
                  />
                </RadioGroup>
              </FormControl>
            </Box>

            <Typography gutterBottom sx={{ px: 5, mb: 2 }}>
              <TextField
                name="income"
                value={formData.income}
                type="text"
                onChange={handleChangeText}
                label="Income Amount"
                required
                autoComplete="off"
              />
            </Typography>
            <Typography gutterBottom sx={{ px: 5, mb: 2 }}>
              <TextField
                name="expense"
                value={formData.expense}
                type="text"
                onChange={handleChangeText}
                label="Expenditure Amount"
                required
                autoComplete="off"
              />
            </Typography>

            <Typography gutterBottom sx={{ px: 5 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  description*
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Description"
                  required
                  name="desc"
                  value={formData.desc}
                  onChange={handleChangeText}
                >
                  <MenuItem value="fuel">Fuel</MenuItem>
                  <MenuItem value="movie">Movie</MenuItem>
                  <MenuItem value="loan">Loan</MenuItem>
                  <MenuItem value="medical">Medical</MenuItem>
                  <MenuItem value="other">Other..</MenuItem>
                </Select>
              </FormControl>
            </Typography>
          </DialogContent>
          <DialogActions>
            {formData.income !== "" &&
            formData.type !== "" &&
            formData.desc !== "" &&
            formData.expense !== "" ? (
              <Button
                sx={{ mb: 2 }}
                variant="contained"
                type="submit"
                onClick={handleSubmit}
              >
                Add
              </Button>
            ) : (
              <Button sx={{ mb: 0 }} variant="contained" disabled>
                Add
              </Button>
            )}
          </DialogActions>
        </BootstrapDialog>
      </Box> 
     

    </>
  );
}

export default Dashboard;
