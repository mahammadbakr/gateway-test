import React from 'react'
import { useSelector } from 'react-redux';

export default function Products() {

    const { products } = useSelector((state) => state.productReducer);

    return (
        <div>{JSON.stringify(products)}</div>
    )
}
