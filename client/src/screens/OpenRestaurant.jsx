import React, { useState, useEffect } from 'react'
import 'rc-time-picker/assets/index.css';
import { useSelector, useDispatch } from 'react-redux'
import Error from '../components/Error'
import Loading from '../components/Loading'
import Success from '../components/Success'
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import { BsFillFileImageFill } from 'react-icons/bs';
import { uploadRestaurantImage, postRestaurant } from '../actions/restaurantAction'
import LocationSearch from '../components/LocationSearch';

const OpenRestaurant = () => {

    const dispatch = useDispatch()

    const initialState = {
        name: '',
        restLocation: {},
        open: '',
        close: ''
    }
    const [file, setFile] = useState('')
    const [blogImage, setBlogImage] = useState('')
    const [openTime, setOpenTime] = useState(null)
    const [closeTime, setCloseTime] = useState(null)
    const [type, setType] = useState(null)

    useEffect(() => {
        const getImage = async () => {
            if (file) {
                const fd = new FormData()
                fd.append('file', file)
                await dispatch(uploadRestaurantImage(fd))
                setBlogImage(localStorage.getItem('restaurantImage'))
            }
        }
        getImage()
    }, [file, dispatch])

    const registerState = useSelector(state => state.postRestaurantReducer)
    const locationState = useSelector(state => state.locateUserReducer)

    const restAddress = locationState?.userLocation

    const [restaurantAddress, setRestaurantAddress] = useState('')
    
    useEffect(() => {
        setRestaurantAddress(restAddress)
    }, [restAddress])

    const { error, loading, success } = registerState
    const format = 'h:mm a';


    const [restaurant, setRestaurant] = useState(initialState)
    const handleOnChange = (e) => {
        setRestaurant({ ...restaurant, [e.target.name]: e.target.value })
        console.log(localStorage.getItem('userLocation'))
    }

    function onChangeOpen(value) {
        setOpenTime(`${value && value.format(format)}`)
    }
    function onChangeClose(value) {
        setCloseTime(`${value && value.format(format)}`)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        restaurant.owner = JSON.parse(localStorage.getItem('currentUser'))._id
        restaurant.coverImageUrl = blogImage
        restaurant.open = openTime
        restaurant.close = closeTime
        restaurant.type = type
        restaurant.restLocation = restaurantAddress
        console.log(restaurantAddress)
        dispatch(postRestaurant(restaurant))
        setRestaurant(initialState)
        localStorage.removeItem("restaurantImage")
        setBlogImage('')
    }

    return (
        <div className='container'>
            <div className="row justify-content-center">
                <div className="col-md-5 mt-5 shadow p-3 mb-5 bg-white rounded">
                    {loading && <Loading />}
                    {success && <Success message={'Restaurant Registered Successfully'} />}
                    {error && <Error message={'Invalid Information!'} type={'danger'} />}
                    <h2 className='text-center'>Restaurant Information</h2>
                    <div>
                        <input type="text" placeholder='Name' className='form-control' name='name' value={restaurant.name} onChange={(e) => handleOnChange(e)} />
                        <LocationSearch />
                        <select name="type" id="type" className='form-control mt-2' onChange={(e) => setType(e.target.value)}>
                            <option value="all">All</option>
                            <option value="fastFood">Fast Food</option>
                            <option value="deshiKhabar">Deshi Khabar</option>
                        </select>
                        <div className="time-pick d-flex align-item-center justify-content-around">
                            <div className="start w-50">
                                <label htmlFor="start">Starts At</label>
                                <TimePicker
                                    format={format}
                                    // use to control utfOffset, locale, default open value
                                    defaultOpenValue={moment()}
                                    className="xxx"
                                    onChange={onChangeOpen}
                                    hideDisabledOptions
                                    use12Hours
                                    name='open'
                                />
                            </div>
                            <div className="close w-50">
                                <label htmlFor="close">Closes At</label>
                                <TimePicker
                                    format={format}
                                    // use to control utfOffset, locale, default open value
                                    defaultOpenValue={moment()}
                                    className="xxx"
                                    onChange={onChangeClose}
                                    hideDisabledOptions
                                    use12Hours
                                    name='close'
                                />
                            </div>
                        </div>
                        <div className="mt-2">
                            <label htmlFor="file">{blogImage ? (<img src={blogImage} style={{ height: '150px' }} alt='food' />) : (<BsFillFileImageFill style={{ fontSize: '100px', border: '1px solid #878787', padding: '10px' }} />)}</label>
                            <label htmlFor="file" style={{ display: 'block' }}>Add a Cover Photo of Your Restaurant</label>
                            <input type="file" formEncType='multipart/form-data' id='file' style={{ display: 'none' }} onChange={(e) => setFile(e.target.files[0])} />
                        </div>
                        <div className='d-flex mt-4 align-items-center justify-content-center'>
                            <button className="btn" name='reg' onClick={(e) => handleSubmit(e)}>SUBMIT</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OpenRestaurant