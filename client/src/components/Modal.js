import React, {useRef} from "react";
import { Link, useLocation } from "react-router-dom";
import axios from 'axios'

function Modal() {
  const location = useLocation();
  const email = useRef()
  const password = useRef()

  async function signIn(){

    await axios.get(`/api/login-business/${email.current.value}`)
    .then(({data}) => {
        console.log(data._id)
        if (data._id) {
          document.querySelector('#businessAccountLink').setAttribute('style','display:initial; color:white')
          document.querySelector('#userAccountLink').setAttribute('style','display:none')
          document.querySelector('#signInLink').setAttribute('style','display:none')
          sessionStorage.id = data._id
        }


      })

    await axios.get(`/api/login-user/${email.current.value}`)
    .then(({data}) => {
        console.log(data._id)
        if (data._id) {
          document.querySelector('#userAccountLink').setAttribute('style','display:initial; color:white')
          document.querySelector('#businessAccountLink').setAttribute('style','display:none')
          document.querySelector('#signInLink').setAttribute('style','display:none')
          sessionStorage.id = data._id
        }

      })
    
  }
    
  return (
    <div className='container'>
        <div className="modal fade bd-example-modal-lg" id="ModalSignIn" tabindex="-1" role="dialog" aria-labelledby="ModalSignInTitle" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="userSignupForm modal-content">
                    <div className="form-container">
                        <div className="image-holder"></div>
                        <form method="post">

                        <h2 className="text-center">Log In</h2>
                        <div className="form-group"><input className="form-control" ref={email} type="email" name="email" placeholder="Email" /></div>
                        <div className="form-group"><input className="form-control" ref={password} type="password" name="password" placeholder="Password" /></div>

                        <div className="form-group"><button className="btn btn-primary btn-block" type="button"  data-dismiss="modal" onClick={signIn}>Sign In</button></div>
                        <Link to={ location ==='/' ? './signuppage' : '../signuppage' }>Sign Up</Link>
                        </form>

                    </div>
                </div>
            </div>
        </div>  
    </div>
  );
}

export default Modal;