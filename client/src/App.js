import './App.css';
import bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import boot from '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import 'bootstrap'
import Navbar from './components/Navbar';
import Homescreen from './screens/Homescreen';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom'
import Cartscreen from './screens/Cartscreen';
import Login from './screens/Login';
import Registration from './screens/Registration';
import { useSelector } from 'react-redux';
import RequestFood from './screens/RequestFood';
import FoodRequest from './screens/FoodRequest';
import RestaurantDashboard from './screens/RestaurantDashboard';
import OpenRestaurant from './screens/OpenRestaurant';
import Restaurant from './components/Restaurant';
import CreateItem from './screens/CreateItem';
import Footer from './components/Footer';
import MakeOffer from './screens/MakeOffer';
import Offers from './screens/Offers';
import AllOrders from './screens/AllOrders';
import Map from './components/Map';


function App() {
  const loggedInUser = useSelector(state => state.loginUserReducer.currentUser)
  if (loggedInUser) {
    var { userType } = loggedInUser
  }
  const singleRestaurant = useSelector(state => state.getRestaurantByIdReducer)
  const restaurant = singleRestaurant?.restaurant

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact element={userType === 'restaurant' ? <RestaurantDashboard /> : <Homescreen />} />
          <Route path='/cart' exact element={<Cartscreen />} />
          <Route path={'/login'} exact element={<Login />} />
          <Route path='/registration' exact element={<Registration />} />
          <Route path='/requests' exact element={<FoodRequest />} />
          <Route path='/request/new' exact element={<RequestFood />} />
          <Route path='/restaurant/new' exact element={<OpenRestaurant />} />
          <Route path={`/restaurants/${restaurant?._id}`} exact element={<Restaurant />} />
          <Route path='/food/new' exact element={<CreateItem />} />
          <Route path='/request/offer' exact element={<MakeOffer />} />
          <Route path='/offers' element={<Offers />} />
          <Route path='/orders' element={<AllOrders />} />
          {/* <Route path = '/map' exact element={<Map />} /> */}
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
