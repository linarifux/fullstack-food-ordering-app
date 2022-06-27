import React, { useEffect } from 'react'
import axios from 'axios'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import { useDispatch, useSelector } from 'react-redux'
import { locateUser } from '../actions/userActions'


const LocationSearch = () => {

  const [address, setAddress] = React.useState('')
  const dispatch = useDispatch()

  const loggedInUser = useSelector(state => state.loginUserReducer.currentUser)

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value)
    const latLng = await getLatLng(results[0])
    const { lat, lng } = latLng
    setAddress(value)
    const locationDetails = {
      address: value,
      lat,
      lng
    }
    dispatch(locateUser(locationDetails))
    localStorage.setItem('userLocation', value)
  }

  useEffect(() => {
    setAddress(localStorage.getItem('userLocation'))
  }, [])

  const locateMe = () => {
    const onSuccess = async (position) => {
      const { latitude, longitude } = position.coords
      const apiKey = 'AIzaSyAOFgGI3DIGbacmgqkMzGShHemD-EMh-zY'
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
      const response = axios(url)
      const data = await response
      const address = data ? data.data.results[0].formatted_address : ''
      const locationDetails = {
        address,
        lat: latitude,
        lng: longitude
      }
      dispatch(locateUser(locationDetails))
      setAddress(address)
      localStorage.setItem('userLocation', address)
    }

    const onError = (error) => {
      console.log(error);
    }

    if(loggedInUser?.userType === 'deliveryMan'){
      navigator.geolocation.watchPosition(onSuccess, onError)
    }else{
      navigator.geolocation.getCurrentPosition(onSuccess, onError)
    }
  }

  if (loggedInUser?.userType === 'deliveryMan') {
    return (
      <div className='contaienr'>
        <div className="row">
          <div className="col-md-12">
            <div className='d-flex gap-2'>
              <input type="text" disabled value={address} className="w-100"/>
              <input type="submit" value={'Detect'} className='form-control w-25' onClick={locateMe} />
            </div>
          </div>
        </div>
      </div>
    )
  }


  return (
    <div>
      <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (<div>
          <div className='d-flex align-items-center gap-1'>
            <input {...getInputProps({ placeholder: 'Enter your address' })} className='form-control' />
            <input type="submit" value={'Detect'} className='form-control w-25' onClick={locateMe} />
          </div>
          <div>
            {loading ? <div>...loading</div> : null}
            {suggestions.map(suggestion => {
              const style = {
                backgroundColor: suggestion.active ? '#f2f4f6' : '#fff',
                cursor: 'pointer'
              }
              return <div {...getSuggestionItemProps(suggestion, { style })}>
                {suggestion.description}
              </div>
            })}
          </div>
        </div>)}
      </PlacesAutocomplete>
    </div>
  )
}

export default LocationSearch