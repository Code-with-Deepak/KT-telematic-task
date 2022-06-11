import React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import axios from "axios";
import { Snackbar } from "@mui/material";
import { Alert } from "@mui/material";
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Cookies from 'universal-cookie';
import { TextField } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { TextareaAutosize } from "@mui/material";
import DialogTitle from '@mui/material/DialogTitle';
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import './mhome.css';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const cookies = new Cookies();

class EmployeeHome extends React.Component { 
    // Constructor
    constructor(props) {
        super(props)
   
        this.state = {
            data: [],
            DataisLoaded: false,
            openCard:false,
            snack:true,
            defCat:"mobile",
            pname:"",
            pid:"",
            price:"",
            available:0,
            desc:"",
            shopname:"",
            path:"",
            isLoggedIn:"default value",
            editProductDialog:false,
        }
        this.handleAddProd = this.handleAddProd.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handlePrice = this.handlePrice.bind(this);
        this.handleDesc = this.handleDesc.bind(this);
        this.handleAvail = this.handleAvail.bind(this);
    }    
    handleAddProd(e){
        this.setState({openCard:true});
        console.log(cookies.get("userName"));
        e.preventDefault();
    }
    handleDelete = (prodid,prodname) => () =>{
     
      if(window.confirm("Do you want to Delete "+prodname)===true)
      {
        this.deleteData(prodid,prodname);
      }
    }
    handleEdit = (id,name,cost,description,cat,avail) => () =>{
      console.log(id);
      this.setState({editProductDialog:true,
        delprod:false,
      pname:name,
      pid:id,
      price:cost,
      desc:description,
      defCat:cat,
      available:avail,
      })
    }
    handleClose(e){
        this.setState({openCard:false});
        this.setState({snack:false});
        this.setState({editProductDialog:false});
        e.preventDefault();
    }
    handleChange(e){
      this.setState({defCat:e.target.value});
      e.preventDefault();
  }
  handleName(e){
    this.setState({pname:e.target.value});
    e.preventDefault();
  }handlePrice(e){
    this.setState({price:e.target.value});
    e.preventDefault();
  }handleDesc(e){
    this.setState({desc:e.target.value});
    e.preventDefault();
  }
  handleAvail(e){
    this.setState({available:e.target.value});
    e.preventDefault();
  }
  deleteData(prodid,prodname){
    axios.delete('http://localhost:3001/employee/deleteProduct/'+prodid+'/'+prodname).then(res => {
      window.location.replace('../../employee/dashboard?delete=success');
    })    
  }
  getData(shop){
    axios.get('http://localhost:3001/'+shop+'/getProducts').then(res => {
      var data = res.data
        this.setState({data : data})
    })
  }
  componentDidMount(){
    const shop = cookies.get("userName");
    this.getData(shop);
    this.setState({shopname:shop,path:'../../products/'+shop+'/'});
  }
    render() {
      const queryParams = new URLSearchParams(window.location.search)
      const msg = queryParams.get("added");
      const upmsg = queryParams.get("update");
      const delmsg = queryParams.get("delete");
      const state = this.state.snack;
        const DataisLoaded = this.state.DataisLoaded;
        const login = cookies.get("token");
        const user = cookies.get("userName");
        let products = this.state.items;
        const btnOpen = this.state.openCard;
        if (!DataisLoaded && login==null)
        window.location.replace('/employee/login?error=login');
   
        return (
            <div class="">
            <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  sx={{ mr: 2 }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography
                  variant="h5"
                  noWrap
                  component="div"
                  sx={{ display: { xs: 'none', sm: 'block' } }}
                >
               Product Details List
                </Typography>
                <div class="btn-area">
                <Button variant="contained" color="warning">Welcome,{user}
                </Button>|
                <Button variant="contained" color="error" href="/logout">Logout</Button>
                </div>
              </Toolbar>
            </AppBar>
          </Box>
          <br></br>
          <center>
          <div class="btns"><Button variant="contained" color="info">
      My Products
    </Button>
    <Button variant="contained" color="success" onClick={this.handleAddProd}>
      Add Products
    </Button>
    </div>
    </center>
    <br></br>
    {(btnOpen === true)?
    <div>
    <Dialog open={true} fullWidth>
      <DialogTitle style={{backgroundColor:"black"}} class="dialogTitle"><b>Add Product Here!</b></DialogTitle>
      <DialogContent>
      <form action="http://localhost:3001/employee/addProducts" method="post">
      <TextField id="outlined-basic" name="upby" value={this.state.shopname} label="Uploaded By (ReadOnly)" variant="outlined" required readonly fullWidth/><br></br><br></br>
      <TextField id="outlined-basic" name="pname" label="Product Name" variant="outlined" required fullWidth/><br></br><br></br>
      <TextField id="outlined-basic" name="price" type="number" label="Product Price" variant="outlined" required fullWidth/><br></br><br></br>
      <TextareaAutosize name="desc" aria-label="minimum height" minRows={5} placeholder="Product Description" required fullWidth style={{ width: "98%",backgroundColor:'transparent' }} /><br></br><br></br>
      <TextField id="outlined-basic" name="available" type="number" label="Product Availability" variant="outlined" required fullWidth /><br></br><br></br>
      <Select required
      name="category"
          labelId="demo-simple-select-error-label"
          id="demo-simple-select-error"
          label="Select Category"
          value={this.state.defCat}
          onChange={this.handleChange}
          fullWidth
        >
          <MenuItem value={"mobile"}>Mobile</MenuItem>
          <MenuItem value={"electronics"}>Electronics</MenuItem>
          <MenuItem value={"fashion"}>Fashion</MenuItem>
        </Select><br></br><br></br>
      <TextField type="submit" defaultValue="Add Products" color='warning'></TextField>
      </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={this.handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  </div> : <div></div>}
          <center>
          <TableContainer sx={{maxWidth:1000}} component={Paper}>
      <Table sx={{ minWidth: 700,maxWidth:1000 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Product Name</StyledTableCell>
            <StyledTableCell align="right">Product Price</StyledTableCell>
            <StyledTableCell align="right">Description</StyledTableCell>
            <StyledTableCell align="right">Category</StyledTableCell>
            <StyledTableCell align="right">Availability</StyledTableCell>
            <StyledTableCell align="right">Edit</StyledTableCell>
            <StyledTableCell align="right">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* <ul>
        {this.state.data.map(d => (<li key={d.id}>{d.name}</li>))} 
                </ul> */}
          {this.state.data.map((row) => (
            <StyledTableRow key={row._id}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">₹{row.price}</StyledTableCell>
              <StyledTableCell align="right" class='desc'>{row.desc}</StyledTableCell>
              <StyledTableCell align="right">{row.category}</StyledTableCell>
              <StyledTableCell align="right">{row.available}</StyledTableCell>
              <StyledTableCell align="right"><Button onClick={this.handleEdit(row._id,row.name,row.price,row.desc,row.category,row.available)}><EditIcon color="primary"/></Button></StyledTableCell>
              <StyledTableCell align="right"><Button onClick={this.handleDelete(row._id,row.name)}><DeleteIcon color="error"/></Button></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  {(msg === "success")?<Snackbar open={state} autoHideDuration={6000} onClose={this.handleClose}>
        <Alert onClose={this.handleClose} severity="success" sx={{ width: '100%' }}>
          Product Added Successfully to the Database.
        </Alert>
      </Snackbar>:<div></div>}
      {(upmsg === "success")?<Snackbar open={state} autoHideDuration={6000} onClose={this.handleClose}>
        <Alert onClose={this.handleClose} severity="info" sx={{ width: '100%' }}>
          Product Updated Successfully.
        </Alert>
      </Snackbar>:<div></div>}
      {(delmsg === "success")?<Snackbar open={state} autoHideDuration={6000} onClose={this.handleClose}>
        <Alert onClose={this.handleClose} severity="error" sx={{ width: '100%' }}>
          Product Deleted Successfully.
        </Alert>
      </Snackbar>:<div></div>}
  
    </center>
    <div>
    <Dialog open={this.state.editProductDialog} fullWidth>
      <DialogTitle class="dialogTitle"><b>Edit Product Dialog</b></DialogTitle>
      <DialogContent>
      <form action="http://localhost:3001/employee/editProducts" method="post">
      <TextField variant="outlined" readonly name="id" value={this.state.pid} fullWidth label="Product Id(readOnly)"></TextField><br></br><br></br>
      <TextField id="outlined-basic" value={this.state.pname} onChange={this.handleName} name="pname" label="Product Name" variant="outlined" required fullWidth/><br></br><br></br>
      <TextField id="outlined-basic" value={this.state.price} onChange={this.handlePrice} name="price" type="number" label="Product Price" variant="outlined" required fullWidth/><br></br><br></br>
      <TextareaAutosize name="desc" value={this.state.desc} onChange={this.handleDesc} aria-label="minimum height" minRows={5} placeholder="Product Description" required style={{ width: "98%" }} /><br></br><br></br>
      <TextField id="outlined-basic" value={this.state.available} onChange={this.handleAvail} name="available" type="number" label="Product Availability" variant="outlined" required fullWidth /><br></br><br></br>
      <Select required
      name="category"
          labelId="demo-simple-select-error-label"
          id="demo-simple-select-error"
          label="Select Category"
          value={this.state.defCat}
          fullWidth
          onChange={this.handleChange}
        >
          <MenuItem value={"mobile"}>Mobile</MenuItem>
          <MenuItem value={"electronics"}>Electronics</MenuItem>
          <MenuItem value={"fashion"}>Fashion</MenuItem>
        </Select><br></br><br></br>
      <TextField type="submit" defaultValue="Update" color='info' fullWidth></TextField>
      </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={this.handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  </div>
          </div>
    );
}
}
   
export default EmployeeHome;