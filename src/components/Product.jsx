import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import Swal from "sweetalert2";
import config from "../config";

const API = `${config.api_url}/products`

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const Product = (props) => {
  const classes = useStyles();
  const {
    _id,
    price,
    name,
    image,
    description,
    availableQuantity,
    user,
  } = props;
  const [loaduser, setLoaduser] = useState(null);
  localStorage.getItem("id")

  const facebook=(e) =>{
    e.preventDefault();
    window.open(user.facebook, "_blank")
  }
  
  const instagram=(e) =>{
    e.preventDefault();
    window.open(user.instagram, "_blank")
  }
  

  const deleteProduct = async (id) => {
    const payload = {
        method: "DELETE",
        headers: { "Content-Type": "application/json","Authorization":'Bearer '+localStorage.getItem("SOLD_TOKEN"), },
    };

    try {
        const result = await fetch(`${API}/${id}`, payload);
        const product = await result.json();
        console.log(product)
        if (product && product._id){
            Swal.fire({
                icon: "success",
                title: "Eliminado",
                text: "Producto eliminado con exito",
            });
            window.location.reload();
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "se ah presentado un error al eliminar el Producto",
            });
            // console.error('Error :(', error);
        }

        // console.log(result)
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error,
        });
        // console.error('Error :(', error);
    }
};

  const handleRemove=() =>{
    // console.log(props)
    deleteProduct(props._id)
    props.history.push('/my-product')
  }
  const handleEdit=()=>{
    props.history.push({
      pathname:'/create-product',
      localStorage: { product:props}});
  }

  useEffect(() => {
    if(window.location.href.substr(21)==="/my-product"&&localStorage.getItem("id")){
      console.log("aca")
      setLoaduser(true)
    }

  }, []);

  return (
    <div className="card h-100">
      <Link to={`/product/${_id}`}>
        <img className="card-img-top" src={image} style={{height: '250px'}} alt={name} />
      </Link>
      <div className="card-body">
        <h4 className="card-title">
          <Link to={`/product/${_id}`}>{name}</Link>
        </h4>
        <h5>${price}</h5>
        <p className="card-text">{description}</p>
      </div>
      <div className="card-footer">
        <small className="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
        {loaduser&&
        <>
        <IconButton aria-label="delete" color="secondary" className={classes.margin} onClick={handleRemove}>
          <DeleteIcon />
        </IconButton>
        <IconButton aria-label="edit" color="primary" className={classes.margin} onClick={handleEdit}>
          <EditIcon />
        </IconButton>
        </>
        }
      </div>
      <div className="card-footer">
        <IconButton aria-label="" className={classes.margin} color="primary" onClick={facebook}>
          <FacebookIcon />
        </IconButton>
        <IconButton aria-label="" className={classes.margin} color="primary"  onClick={instagram}>
          <InstagramIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Product;
