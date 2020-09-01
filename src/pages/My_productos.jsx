import React, { useEffect, useState } from 'react';

import Header from '../components/Header';
import Product from '../components/Product';
import config from '../config';
const API = `${config.api_url}/products/my_products`;

const getProducts = async (setProducts) => {
    const payload = {
        method: "GET",
        headers: { "Content-Type": "application/json","Authorization":'Bearer '+localStorage.getItem("SOLD_TOKEN"), },
    };
    try {
        const result = await fetch(`${API}/${localStorage.getItem("id")}`,payload);
        const products = await result.json();
        setProducts(products);
    } catch (error) {
        console.error('Error :(', error);
    }
}

const My_productos = (props) => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        getProducts(setProducts)
    }, []);

    return (
        <>
            <Header />
            <div className="container mt-4">
                <div className="row">
                    {
                        products.map((product, idx) => (
                            <div key={idx} className="col-lg-4 col-md-6 mb-4">
                                <Product {...product} history={props.history}/>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
}

export default My_productos;
