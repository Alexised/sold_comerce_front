import React, { useState, useEffect } from "react";
import {withRouter } from "react-router-dom";
import Header from "../components/Header";
import FormProduct from "../components/Create_Product";
import Swal from "sweetalert2";
import config from "../config";

const API = `${config.api_url}/products`;


const editProduct = async (form,id) => {
    const payload = {
        method: "put",
        headers: { "Content-Type": "application/json","Authorization":'Bearer '+localStorage.getItem("SOLD_TOKEN"), },
        body: JSON.stringify(form[0]),
    };

    try {
        const result = await fetch(`${API}/${id}`, payload);
        const product = await result.json();
        console.log(product)
        if (product && product.n==1){
            Swal.fire({
                icon: "success",
                title: "Guardado",
                text: "Producto registrado con exito",
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "se ah presentado un error al guardar el Producto",
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

const createProduct = async (form) => {
    const payload = {
        method: "POST",
        headers: { "Content-Type": "application/json","Authorization":'Bearer '+localStorage.getItem("SOLD_TOKEN"), },
        body: JSON.stringify(form[0]),
    };

    try {
        const result = await fetch(API, payload);
        const product = await result.json();
        // console.log(result)
        if (product && product._id) {
            Swal.fire({
                icon: "success",
                title: "Guardado",
                text: "Producto registrado con exito",
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "se ah presentado un error al guardar el Producto",
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
const Create_Product = (props) => {
    const [imageAsFile, setImageAsFile] = useState('')

    return (
    <>
        <Header />
        <div className="container">
            <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                    <div className="row">
                        <div className="col-lg-5 d-none d-lg-block bg-register-image" style={{height: '350px',  backgroundImage: `url(${imageAsFile})`}} />
                        <div className="col-lg-7">
                            <div className="p-5">
                                <div className="text-center">
                                    <h1 className="h4 text-gray-900 mb-4">Crear producto</h1>
                                </div>
                                <FormProduct handleSumbit={createProduct} imageAsFile={imageAsFile} setImageAsFile={setImageAsFile} handleEdit={editProduct} product={props} />
                                <hr />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
);
}

export default withRouter(Create_Product);
