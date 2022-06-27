import React, {useState} from 'react'
import {Modal} from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartActions';

const Pizza = ({pizza}) => {
    const [show, setShow] = useState(false);
    const dispatch = useDispatch()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [quantity, setQuantity] = useState(1)
    const [variant, setVariant] = useState('small')

    const addCart = () => {
        dispatch(addToCart(pizza, quantity, variant))
    }

    

  return (
    <div className='shadow-lg p-3 mb-5 bg-white rounded'>
        <div onClick={handleShow}>
            <h1>{pizza.name}</h1>
            <img src={pizza.image} alt="" className='img-fluid' style={{height: '200px', width: '200px'}}/>
        </div>
        <div className="flex-container">
            <div className='w-100 m-1'>
                <p>Variants</p>
                <select className='form-control' value={variant} onChange={(e) => setVariant(e.target.value)}>
                    {pizza.variants.map((variant, index) => {
                        return (
                            <option key={index} value={variant}>{variant}</option>
                        )
                    })}
                </select>
            </div>
            <div className='w-100 m-1'>
                <p>Quantity</p>
                <select className='form-control' value={quantity} onChange={(e) => setQuantity(e.target.value)}>
                    {[...Array(10).keys()].map((x,i) => {
                        return(
                            <option key={i} value={i+1}>{i+1}</option>
                        )
                    })}
                </select>
            </div>
        </div>

        <div className="flex-container align-items-center">
            <div className='w-100 m-1 mt-2'>
                <h1>Price: {pizza.prices[0][variant] * quantity} TK</h1>
            </div>
            <div className='w-100 m-1'>
                <button className="btn" onClick={addCart}>ADD TO CART</button>
            </div>
        </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>{pizza.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <img src={pizza.image} className='img-fluid' style={{height: '400px'}} />
            <p>{pizza.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn" onClick={handleClose}>CLOSE</button>
        </Modal.Footer>
      </Modal>
    </div>
    
  )
}

export default Pizza