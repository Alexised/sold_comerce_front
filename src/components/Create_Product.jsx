import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { makeStyles } from '@material-ui/core/styles';
import { storage } from "../firebase"

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
}));
const Create_Product = ({ handleSumbit,product,handleEdit,imageAsFile,setImageAsFile}) => {

    const classes = useStyles();
    const [edit, setEdit] = useState(false)
    const [imageAsUrl, setImageAsUrl] = useState({ imgUrl: '' })
    const [form, setForm] = useState([{
        name: "",
        availableQuantity: "",
        price: "",
        description: "",
        image: imageAsUrl.imgUrl,
        user: localStorage.getItem("id"),
    }]);

    useEffect(() => {
        if(product.location.localStorage){
            setEdit(true)
            let productdata =product.location.localStorage.product;
            const data = [...form];
            data[0].name = productdata.name;
            data[0].availableQuantity = productdata.availableQuantity;
            data[0].price = productdata.price;
            data[0].image = productdata.image;
            setImageAsFile(productdata.image)
            data[0].description = productdata.description;
            data[0].user = productdata.user._id;
            // console.log(data)
            setForm(data);
        }

    }, []);
    // console.log(imageAsFile)

    const handleImageAsFile = (e) => {
        const image = e.target.files[0]
        setImageAsFile(imageFile => (image))

    }

    const handleFireBaseUpload = e => {
        e.preventDefault()
        console.log('start of upload')
        // async magic goes here...
        if (imageAsFile === '') {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "adjunte una imagen",
            });
        }
        const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile)
        //initiates the firebase side uploading 
        uploadTask.on('state_changed',
            (snapShot) => {
                // console.log(snapShot)
            }, (err) => {
                //catches the errors
                console.log(err)
            }, () => {

                storage.ref('images').child(imageAsFile.name).getDownloadURL()
                    .then(fireBaseUrl => {
                        setImageAsUrl(prevObject => ({ ...prevObject, imgUrl: fireBaseUrl }))
                        // console.log(form)
                        // console.log(fireBaseUrl)
                        const data = [...form];
                        data[0].image = fireBaseUrl
                        setForm(data);
                        if(edit==true){
                            handleEdit(form,product.location.localStorage.product._id);
                        }else{
                            handleSumbit(form);
                        }
                        
                        // console.log(form)
                    })
            })
    }

    const handleInputChange = (evt) => {
        const data = [...form];
        const {
            target: { name, value },
        } = evt;
        switch (name) {
            case "name":
                data[0].name = value;
                break;
            case "availableQuantity":
                data[0].availableQuantity = value;
                break;
            case "price":
                data[0].price = value;
                break;
            case "description":
                data[0].description = value;
                break;
            default:
                break;
        }
        // console.log(data)
        setForm(data);
    };

    const sendForm = (evt) => {
        evt.preventDefault();
        handleFireBaseUpload(evt)
    };

    return (
        <form className="user" onSubmit={sendForm}>
            <div className="form-group row">
                <div className="col-sm-6 mb-3 mb-sm-0">
                    <input
                        type="text"
                        className="form-control form-control-user"
                        id="name"
                        placeholder="Nombre"
                        name="name"
                        value={form[0].name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="col-sm-6">
                    <input
                        type="number"
                        className="form-control form-control-user"
                        id="availableQuantity"
                        placeholder="cantidad"
                        name="availableQuantity"
                        value={form[0].availableQuantity}
                        onChange={handleInputChange}
                        required
                    />
                </div>
            </div>
            <div className="form-group row">
                <div className="col-sm-6 mb-3 mb-sm-0">
                    <input
                        type="number"
                        className="form-control form-control-user"
                        id="price"
                        placeholder="precio"
                        name="price"
                        value={form[0].price}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="col-sm-6">
                    <input
                        type="text"
                        className="form-control form-control-user"
                        id="description"
                        placeholder="decripcion"
                        name="description"
                        value={form[0].description}
                        onChange={handleInputChange}
                        required
                    />
                </div>
            </div>
            <input accept="image/*" className={classes.input} onChange={handleImageAsFile} id="icon-button-file" type="file" />
            <label htmlFor="icon-button-file">
                <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                >
                    <PhotoCamera />
                </IconButton>
            </label>

            <button type="submit" className="btn btn-primary btn-user btn-block">
                Registrar producto
        </button>
        </form>
    );
};

export default Create_Product;
