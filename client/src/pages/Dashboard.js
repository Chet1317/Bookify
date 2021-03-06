import React, { useEffect, useState} from "react";
import { Link, useLocation } from "react-router-dom";
import ReservationCard from '../components/ReservationCard.js'
import UserSetting from '../components/userSetting.js'
import BusinessSetting from '../components/businessSetting.js'
import NumberFormat from 'react-number-format';
import axios from 'axios'

function Usersdash() {
  const location = useLocation()
  const splitLocation = location.pathname.split('/')

  const [ userInfo , setUserInfo ] = useState( {} )
  const [ reservationList, setReservationList ] = useState([])
  const [ reviewList, setReviewList ] = useState([])
  const [ averageRating, setAverageRating ] = useState()

  useEffect(() => {
    axios.get(`/api/get-${splitLocation[2]}/${splitLocation[3]}`)
    .then(({data}) => {

      if (splitLocation[2] == 'user'){
        const user = { 
          'firstName': data.firstName, 
          'lastName': data.lastName,
          'email': data.email,
          'address':data.address,
          'address2':data.address2,
          'city':data.city,
          'province':data.province,
          'postalCode':data.postalCode
        }
        setUserInfo(user)
      } else {
        const business = { 
          'category': data.category,
          'businessName': data.businessName, 
          'address1':data.address1,
          'address2':data.address2,
          'city':data.city,
          'province':data.province,
          'email': data.email,
          'phone': data.phone,
          'postalCode':data.postalCode,
          'information': data.information
        }
        setUserInfo(business)
      }

      })

      axios.get(`/api/${splitLocation[2]}-reservation/${splitLocation[3]}`)
        .then(({data}) => {
          const sortList = data.sort((a,b) => {
            const condition = a.Date > b.Date
            return (condition - !condition)
          })

          const newArray = [...sortList]

          setReservationList(newArray)
          })

      axios.get(`/api/${splitLocation[2]}-review/${splitLocation[3]}`)
        .then(({data}) => {
          if(splitLocation[2]=='business'){
            if (data.length !== 0) {
              const sortList = data.sort((a,b) => {
                const condition = a.Date < b.Date
                return (condition - !condition)
              })
      
              const newArray = [...sortList]
      
              const getRating = newArray.map( ({rating}) => rating)
              const total = getRating.reduce((acc,cur) => acc + cur)
              const average = total/getRating.length
      
              setAverageRating(average)
              setReviewList(newArray)
            }
          }
        })
  }, [] )


  return (
    <div className="container mt-4">
        <div className="row">

         {/* leftside */}
            <div className="col-md-4 order-md-1 mb-4">
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span style={{ textTransform: "capitalize"}}>{sessionStorage.account} Dashboard</span>
              </h4>
              <ul className="list-group mb-3">
                <li className="list-group-item d-flex justify-content-between lh-condensed">
                    <div className="col text-center">
                        <img className="rounded-circle" src={`../../assets/img/default-${splitLocation[2]}.png`} style={{width:"150px", marginBottom:'10px'}} />
                        <div>{ userInfo.businessName || `${userInfo.firstName} ${userInfo.lastName}`}</div>
                        <h5 style={{color:'#ffc107', textAlign:'center'}}>
                          <p>{splitLocation[2]=='business' && !averageRating? 'No Review' : ''}</p>
                          <i className={ !averageRating? '': Math.floor(averageRating,0) >= 1? "fas fa-star text-warning" : averageRating >= 0.5? "fas fa-star-half-alt" : "far fa-star"}></i>
                          <i className={ !averageRating? '': Math.floor(averageRating,0) >= 2? "fas fa-star text-warning" : averageRating >= 1.5? "fas fa-star-half-alt" : "far fa-star"}></i>
                          <i className={ !averageRating? '': Math.floor(averageRating,0) >= 3? "fas fa-star text-warning" : averageRating >= 2.5? "fas fa-star-half-alt" : "far fa-star"}></i>
                          <i className={ !averageRating? '': Math.floor(averageRating,0) >= 4? "fas fa-star text-warning" : averageRating >= 3.5? "fas fa-star-half-alt" : "far fa-star"}></i>
                          <i className={ !averageRating? '': Math.floor(averageRating,0) >= 5? "fas fa-star text-warning" : averageRating >= 4.5? "fas fa-star-half-alt" : "far fa-star"}></i>

                        </h5>
                        <div>{userInfo.address1||userInfo.address}</div>
                        <div>{userInfo.address2}</div>
                        <p>{`${userInfo.city}, ${userInfo.province}  ${userInfo.postalCode}`}</p>
                        <div>{userInfo.email}</div>
                        <div><NumberFormat value={userInfo.phone} displayType={'text'} format="(###) ###-####" /></div>
                    </div>
                  </li>
                <li className="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h6 className="my-0">My Appointments</h6>
                  </div>  
                </li>
                <li className="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h6 className="my-0">My Reveiws</h6>
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h6 className="my-0">Setting</h6>
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between bg-light">
                  <div>
                    <Link to="../../termscondition">
                    <h6 className="my-0">Privacy Policy</h6>
                    </Link>
                  </div>
                </li>
              </ul>
            </div>

            {/* <!-- right contetns --> */}

            
            <div className="col-md-8 order-md-2">

              {/* <!-- My Appoinment --> */}
              <div>
                <h4 className="mb-3">My Appointments</h4>
                <div className='row'>
                  { Object.entries(reservationList).map( ([key,list]) => <ReservationCard key={key} list={list}></ReservationCard> ) }
                </div>
              </div>

              <hr className="mb-4" />

              {/* <!-- My Review --> */}
              <div>
                <h4 className="mb-3">My Reviews </h4>
                <div className='row'>
                  { Object.entries(reviewList).map( ([key,list]) => <ReservationCard key={key} list={list}></ReservationCard> ) }
                </div>
              </div>

              <hr className="mb-4" />
              
              {/* <!-- user setting --> */}
              <h4 className="mb-3">Setting</h4>
              <div>
                {(splitLocation[2] == 'user')? <UserSetting list={userInfo}></UserSetting> : <BusinessSetting list={userInfo}></BusinessSetting> }
                
                
              </div>
            </div>
        </div>
    </div>
  );
}

export default Usersdash;
