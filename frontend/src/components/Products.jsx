import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Dialog from 'react-dialog'

export default function Products() {

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { products } = useSelector((state) => state.productReducer);
    return (
        <div>{
            products?.map((val) => {
                console.log(val);
                return (<p onClick={() => {
                    console.log("on cllick", val.title)
                }}>
                    {val.title}
                </p>);
            })
        }
            {
                isDialogOpen &&
                <Dialog
                    title="Dialog Title"
                    modal={true}
                    onClose={this.handleClose}
                    buttons={
                        [{
                            text: "Close",
                            onClick: () => this.handleClose()
                        }]
                    }>
                    <h1>Dialog Content</h1>
                    <p>More Content. Anything goes here</p>
                </Dialog>
            }
        </div>
    )
}
