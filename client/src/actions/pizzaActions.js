import axios from 'axios'


export const getAllPizzas =  () => async (dispatch) => {
    dispatch({type: 'GET_PIZZAS_REQUEST'})

    try{
        const response = await axios.get('/pizza/all')
        dispatch({type: 'GET_PIZZAS_SUCCESS', payload: response.data})
    }catch(e){
        dispatch({type: 'GET_PIZZAS_FAILED', payload: e})
    }

}

export const filteredPizzas =  (searchKey, category) => async (dispatch) => {
    let filterPizzs;
    dispatch({type: 'GET_PIZZAS_REQUEST'})

    try{
        const response = await axios.get('/pizza/all')
        if(category !== 'all'){
            filterPizzs = response.data.filter(pizza => pizza.category.toLowerCase() === category)
        }else{
            filterPizzs = response.data
        }
        filterPizzs = filterPizzs.filter(pizza => pizza.name.toLowerCase().includes(searchKey))
        
        dispatch({type: 'GET_PIZZAS_SUCCESS', payload: filterPizzs})
    }catch(e){
        dispatch({type: 'GET_PIZZAS_FAILED', payload: e})
    }

}