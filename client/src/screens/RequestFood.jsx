import React, { useState, useEffect } from 'react'
import { BsFillFileImageFill } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { postRequest, uploadRequestImage } from '../actions/requestFoodAction'

const RequestFood = () => {
    const initialFoodState = {
        title: '',
        description: '',
        deliveryTime: '',
        quantity: '',
    }



    const [file, setFile] = useState('')
    const [blogImage, setBlogImage] = useState('')
    const dispatch = useDispatch()

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

    const [food, setFood] = useState(initialFoodState)
    const onchangeHandler = (e) => {
        setFood({ ...food, [e.target.name]: e.target.value })
    }
    const onSubmitHandler = (e) => {
        e.preventDefault()
        food.user = JSON.parse(localStorage.getItem('currentUser'))._id
        food.imageUrl = blogImage
        dispatch(postRequest(food))
        setFood(initialFoodState)
        localStorage.removeItem("requestImage")
        setBlogImage('')
    }
    return (
        <div className='container'>
            <h2 className='text-center'>Post A Food Request</h2>
            <div className="row d-flex align-items-center">
                <div className="col-md-6 mt-5 ">
                    <div>
                        <input className="form-control" type="text" value={food.title} name='title' placeholder='Give your food a Title' onChange={(e) => onchangeHandler(e)} />
                        <textarea className='form-control mt-3' value={food.description} name="description" rows={6} placeholder='Describe your food with ingredients' onChange={(e) => onchangeHandler(e)}></textarea>

                        <div className="d-flex align-items-center justify-content-start mt-2">
                            <p className='mx-2 mt-4'>Quantity: </p>
                            <input type="number" className='form-control w-25' name='quantity' value={food.quantity} onChange={(e) => onchangeHandler(e)}/>
                            <p className='mx-2 mt-4'>People</p>
                        </div>

                        <div className="d-flex align-items-center justify-content-start">
                            <p className='mt-4 mx-2'>Expected Delivery in Hours: </p>
                            <input type="number" className='form-control w-25' value={food.deliveryTime} name='deliveryTime' onChange={(e) => onchangeHandler(e)}/>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 mt-5">
                    <label htmlFor="file">{blogImage ? (<img src={blogImage} style={{ height: '150px' }} alt='food' />) : (<BsFillFileImageFill style={{ fontSize: '100px', border: '1px solid #878787', padding: '10px' }} />)}</label>
                    <label htmlFor="file" style={{ display: 'block' }}>Add a Sample Photo of your food. (optional)</label>
                    <input type="file" formEncType='multipart/form-data' id='file' style={{ display: 'none' }} onChange={(e) => setFile(e.target.files[0])} />
                </div>
            </div>
            <div className="col-md-6">
                <button className="btn btn-lg font-weight-bold mt-5" onClick={(e) => onSubmitHandler(e)}>Request Now</button>
            </div>
        </div>
    )
}

export default RequestFood