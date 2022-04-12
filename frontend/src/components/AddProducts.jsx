import React from 'react'
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { addProductInBackend } from "./../redux/actions/productAction";

export default function AddProducts() {
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        dispatch(addProductInBackend(data))
    };
    const dispatch = useDispatch();
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <p>Input Title: </p>
            <input {...register("title", { required: true })} />
            <p>Input Content: </p>
            <input {...register("content", { required: true })} />
            <br />
            <br />
            <button type="submit" >Add Product</button>
        </form>
    );
}
