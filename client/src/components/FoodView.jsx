import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartActions';

const FoodView = ({ item }) => {

  const demo = {
    userType: ''
  }

  const restaurant = localStorage.getItem('selectedRestaurant')
  const restaurantName = localStorage.getItem('restaurantName')

  const dispatch = useDispatch()

  const currentUser = JSON.parse(localStorage.getItem('currentUser')) || demo
  const [show, setShow] = useState(false);

  const [quantity, setQuantity] = useState(1)
  const [variant, setVariant] = useState(null)

  const addCart = () => {
    dispatch(addToCart(item, quantity, variant, restaurant, restaurantName))
  }


  const handleShow = () => {
    setShow(true)
  };

  const handleClose = () => {
    setShow(false)
  };

  return (
    <div className="col-md-4">
      <div className='shadow-lg p-3 mb-5 bg-white rounded' onClick={handleShow}>
        <img src={item.image} alt="Item" style={{ height: '150px' }} className='img-fluid' />
        <p className='h2' >{item.title}</p>
        <p>{item.category}</p>
        {currentUser.userType === 'restaurant' && <div className="actions d-flex justify-content-around">
          <button className="btn">Edit</button>
          <button className="btn">Delete</button>
        </div>}
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header style={{ justifyContent: 'center' }}>
          <Modal.Title>{item.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-center'>
          <img src={item.image} className='img-fluid' style={{ height: '200px' }} alt='Food' />
          <p className='text-center'>{item.description}</p>
          {(item.variants.length > 0 && <div className='w-100 m-1'> <p>Variants</p> <select name="variant" value={variant} onChange={(e) => setVariant(e.target.value)} id="variant" className='form-control mb-2' required>
            <option value="none">Select a Variant</option>
            {item.variants.map(type => {
              return (
                <option value={type.name}>{type.name} at {type.price} TK</option>
              )
            })}
          </select></div>) || <p>{item.price} BDT</p>}

          <div className='w-100 m-1'>
            <p>Quantity</p>
            <select className='form-control' value={quantity} onChange={(e) => setQuantity(e.target.value)}>
              {[...Array(10).keys()].map((x, i) => {
                return (
                  <option key={i} value={i + 1}>{i + 1}</option>
                )
              })}
            </select>
          </div>

          {currentUser.userType !== 'restaurant' && <button className="btn" onClick={addCart}>Add to Cart</button>}

          {item?.video && <div>
            <iframe className='d-block my-5 w-100'
              src={item?.video}
              height={200}
              frameborder="0"
              allow="autoplay; encrypted-media; accelerometer"
              allowFullScreen
            />
            <p className="h1">How we made this Food for you</p>
          </div>
          }


        </Modal.Body>

      </Modal>

    </div>
  )
}

export default FoodView