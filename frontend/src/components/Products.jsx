import React from 'react'
import { useSelector } from 'react-redux';

export default function Products() {

    const { products } = useSelector((state) => state.productReducer);
    return (
        <div>{
            products?.map((val) => {
                console.log(val);
                return (<p className="underline inline" onClick={() => {
                    console.log("on cllick", val.title)
                }}>
                    {val.title}
                </p>);
            })
        }</div>
    )
}
