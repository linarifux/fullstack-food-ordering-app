import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { filteredPizzas } from '../actions/pizzaActions'

const Filter = () => {
    const [searchKey, setSearchKey] = useState('')
    const [category, setCategory] = useState('all')
    const dispatch = useDispatch()
  return (
    <div className='shadow p-3 mb-5 bg-white rounded' >
        <div className="row d-flex justify-content-center align-items-center">
            <div className="col-md-4">
                <input type="text" value={searchKey} onChange={(e) => setSearchKey(e.target.value)} className='form-control w-100' placeholder='Search Restaurant'/>
            </div>
            <div className="col-md-4">
                <select name='' id='' className='form-control w-100 mt-2' value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="all">All</option>
                    <option value="deshiKhabar">Deshi Khabar</option>
                    <option value="fastFood">Fast Food</option>
                </select>
            </div>
            <div className="col-md-4">
                <button className="btn w-100 mt-1" onClick={() => dispatch(filteredPizzas(searchKey, category))}>FILTER</button>
            </div>
        </div>
    </div>
  )
}

export default Filter