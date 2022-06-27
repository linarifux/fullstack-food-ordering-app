import React, { useRef, useState } from 'react'
import * as tt from '@tomtom-international/web-sdk-maps'
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import { useEffect } from 'react'
import './Map.css'

const Map = () => {

    const customerLocation = localStorage.getItem('customerLocation')
    const myLocation = localStorage.getItem('userLocation')

    const mapElement = useRef()
    const [map, setMap] = useState({})

    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')

    const key = 'sy8o36LOzUIQkDlNT6ADlmZaqixAGgD4'
    useEffect(async () => {
        const customerResults = await geocodeByAddress(customerLocation)
        const latLng = await getLatLng(customerResults[0])
        setLatitude(latLng.lat)
        setLongitude(latLng.lng)
        console.log(latLng);
        var map = tt.map({
            key,
            container: mapElement.current,
            center: [latLng.lng, latLng.lat],
            zoom: 14,
            stylesVisibility: {
                trafficFlow: true,
                trafficIncidents: true
            }
        })
        setMap(map)

        const addMarker = () => {
            const element = document.createElement('div')
            element.className = 'marker'
            const marker = new tt.Marker({
                draggable: true,
                element: element,

            })
                .setLngLat([longitude, latitude])
                .addTo(map)
        }

        addMarker()

        return () => map.remove()
    }, [])

    return (
        <div>
            {map && <div ref={mapElement} className='map' style={{ height: '800px' }}>

            </div>}
        </div>
    )
}

export default Map