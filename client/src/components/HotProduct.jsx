import React from 'react'
import './hotProduct.css'


const HotProduct = () => {

    return (
        <div className='container'>
            <div className="row">
                <div className="col-md-12">
                    <div style={{ width: '100%', height: '600px' }} className='hot-product my-5 align-items-center d-flex justify-content-start'>
                        <h1 className='text-white text-bold'>No more cravings for food. You imagine it, we make it real. Order the best <span className='d-block h1'>Foods around you.</span></h1>
                        <img className='img-fluid hero-product' src='https://img.etimg.com/thumb/msid-73030152,width-650,imgsize-1383838,,resizemode-4,quality-100/cornish-lobster-yemeni-madghot-another-traditional-rice-and-meat-dish-and-korean-cuisine-are-some-of-the-chefs-top-picks-.jpg' alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HotProduct