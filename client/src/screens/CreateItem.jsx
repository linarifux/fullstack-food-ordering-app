import React, { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { BsFillFileImageFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { createItem } from '../actions/createitemAction'
import { uploadRequestImage } from '../actions/requestFoodAction'
import { getAllRestaurantsById } from '../actions/restaurantAction'

const CreateItem = () => {

    const [show, setShow] = useState(false);
    const initialVariant = {
        name: '',
        price: 0
    }
    const [newVariant, setNewVariant] = useState(initialVariant)

    const handleShow = () => setShow(true);
    const [variants, setVariants] = useState([])

    const handleClose = () => {
        setVariants([...variants, newVariant])
        setShow(false)
    };

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllRestaurantsById())
    }, [dispatch])

    const allRestaurants = useSelector(state => state.getAllRestaurantsByIdReducer)
    const { restaurants } = allRestaurants


    const initialItemState = {
        title: '',
        price: '',
        description: '',
        restaurant: '',
        category: '',
        video: '',
    }

    const [file, setFile] = useState('')
    const [blogImage, setBlogImage] = useState('')

    useEffect(() => {
        const getImage = async () => {
            if (file) {
                const fd = new FormData()
                fd.append('file', file)
                await dispatch(uploadRequestImage(fd))
                setBlogImage(localStorage.getItem('requestImage'))
            }
        }
        getImage()
    }, [file, dispatch])

    const [item, setItem] = useState(initialItemState)
    const onchangeHandler = (e) => {
        setItem({ ...item, [e.target.name]: e.target.value })
    }
    const onSubmitHandler = (e) => {
        e.preventDefault()
        item.variants = variants
        item.image = blogImage
        dispatch(createItem(item))
        setItem(initialItemState)
        localStorage.removeItem("requestImage")
        setBlogImage('')

    }
    return (
        <div className='container'>
            <h2 className='text-center'>Add a New Item</h2>
            <div className="row d-flex align-items-center">
                <div className="col-md-6 mt-5 ">
                    <div>
                        <input className="form-control" type="text" value={item.title} name='title' placeholder='Item Name' onChange={(e) => onchangeHandler(e)} />
                        <textarea className='form-control mt-3' value={item.description} name="description" rows={6} placeholder='Item Description' onChange={(e) => onchangeHandler(e)}></textarea>
                        <button className='btn-success mt-2' onClick={handleShow}>Add Variant</button>
                        <div className='d-flex'>
                            {variants && variants.map(variant => {
                                return (
                                    <p className='shadow-lg p-3 rounded'>{variant.name}</p>
                                )
                            })}
                        </div>
                        {variants.length > 0 ? '' : <input type="number" id='price' name='price' placeholder='Price' className='form-control' onChange={(e) => onchangeHandler(e)} />}
                        <input className="form-control" type="text" value={item.video} name='video' placeholder='Item Making Short Youtube Video' onChange={(e) => onchangeHandler(e)} />
                        <select name="category" id="category" className='form-control mt-2' onChange={(e) => onchangeHandler(e)}>
                            <option value="all">Category</option>
                            <option value="breakfast">Breakfast</option>
                            <option value="lunch">Lunch</option>
                            <option value="dinner">Dinner</option>
                        </select>
                        <select name="restaurant" id="restaurant" className='form-control mt-2' onChange={(e) => onchangeHandler(e)}>
                            <option value='select'>Select</option>
                            {restaurants.map(rest => {
                                return (
                                    <option value={rest._id}>{rest.name}</option>
                                )
                            })}
                        </select>
                    </div>
                </div>
                <div className="col-md-6 mt-5">
                    <label htmlFor="file">{blogImage ? (<img src={blogImage} style={{ height: '150px' }} alt='food' />) : (<BsFillFileImageFill style={{ fontSize: '100px', border: '1px solid #878787', padding: '10px' }} />)}</label>
                    <label htmlFor="file" style={{ display: 'block' }}>Add a Photo of the Item</label>
                    <input type="file" formEncType='multipart/form-data' id='file' style={{ display: 'none' }} onChange={(e) => setFile(e.target.files[0])} />
                </div>
            </div>
            <div className="col-md-6">
                <button className="btn btn-lg font-weight-bold mt-5" onClick={(e) => onSubmitHandler(e)}>Add Item</button>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>New Variant</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <label htmlFor="variant" style={{ display: 'block' }}>Variant Name</label>
                        <input type="text" id='variant' name='name' placeholder='Variant' className='p-2' onChange={(e) => {
                            const name = e.target.value
                            setNewVariant({ ...newVariant, name })
                        }} />
                    </div>
                    <div className='mt-3'>
                        <label htmlFor="price" style={{ display: 'block' }}>Price</label>
                        <input type="number" id='price' name='price' placeholder='Price' className='p-2' onChange={(e) => {
                            const price = e.target.value
                            setNewVariant({ ...newVariant, price })
                        }} />
                    </div>
                    <div className='mt-3'>
                        <label htmlFor="calori" style={{ display: 'block' }}>Calorie</label>
                        <input type="number" id='calori' name='calori' placeholder='Calorie' className='p-2' onChange={(e) => {
                            const calories = e.target.value
                            setNewVariant({ ...newVariant, calories })
                        }} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn" onClick={handleClose}>ADD</button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default CreateItem