import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Browser from "./Browse"
import UserSignup from "./Usersignup"

const list = [
    {   
        'business':'test Name 1',
        'category':'test Category 1',
        'location': 'test Location 1',
        'rating': 'test Rating 1',
        'imgSRC': 'https://avatars1.githubusercontent.com/u/31528729?s=460&u=47436ea6b0f63a23dbe6fbbc71e75156dc05e40f&v=4',
        'information': 'test Information 1'
    },
    {   
        'business':'test Name 2',
        'category':'test Category 2',
        'location': 'test Location 2',
        'rating': 'test Rating 2',
        'imgSRC': 'https://avatars1.githubusercontent.com/u/31528729?s=460&u=47436ea6b0f63a23dbe6fbbc71e75156dc05e40f&v=4',
        'information': 'test Information 2'
    }
]


function Navbar(props) {
    const location = useLocation();
    const [ businessList, setList ] = useState( list )
    console.log(businessList)

    // useEffect(() => {
    //     fetch("/api/business-list")
    //       .then(res => res.json())
    //       .then(
    //         (result) => {
    //           setList(result.items);
    //         }
    //       )
    //   }, [])

    function searchList(){
        const searchCategory = document.querySelector('#category').value.trim()
        const filtered = businessList.filter( ({category}) => {return category.toLocaleLowerCase() === searchCategory.toLocaleLowerCase()})
        console.log('list', filtered)
    }



    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link to="/" className={ location.pathname === "/"? "nav-link active" : "nav-link"}>
                    <h2 className="navbar-brand" >Spart</h2>
                </Link>
                <div className="navbar-collapse justify-content-center">
                    <form className="form-inline">
                        <input className="form-control mr-sm-2 " type="search" placeholder="e.g. Hair Salon" aria-label="category" id="category"/>
                        <button className="btn btn-secondary my-2 my-sm-0" onClick={searchList} type="button" ><i className="fas fa-search"></i> <span id="searchBtn">Search</span></button>
                    </form>
                </div>
                

                <div calssName="justify-content-end">
                    <ul className="navbar-nav nav ml-auto">
                        <li className="nav-item">
                            <button type="button" className="btn btn-secondary" data-toggle="modal" data-target="#ModalSignIn">
                                Sign In
                            </button>
                            <div className="modal fade bd-example-modal-lg" id="ModalSignIn" tabindex="-1" role="dialog" aria-labelledby="ModalSignInTitle" aria-hidden="true">
                                <div className="modal-dialog modal-lg">
                                    <div className="userSignupForm modal-content">
                                        <div className="form-container">
                                            <div className="image-holder"></div>
                                            <form method="post">
                                                <h2 className="text-center"><strong>Logo</strong>Sign In</h2>
                                                <div className="form-group"><input className="form-control" type="email" name="email" placeholder="Email" /></div>
                                                <div className="form-group"><input className="form-control" type="password" name="password" placeholder="Password" /></div>
                                                <div className="form-group"><button className="btn btn-primary btn-block" type="submit">Sign In</button></div>
                                                <a herf="" data-toggle="modal" data-dismiss="modal" data-target="#ModalSignUp">Sign Up</a>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="modal fade bd-example-modal-lg" id="ModalSignUp" tabindex="-1" role="dialog" aria-labelledby="ModalSignUpTitle" aria-hidden="true">
                                <div className="modal-dialog modal-lg">
                                <div className="userSignupForm modal-content">
                                    <div className="form-container">
                                        <div className="image-holder"></div>
                                        <form method="post">
                                            <h2 className="text-center"><strong>Create</strong> an account.</h2>
                                            <div className="form-group"><input className="form-control" type="username" name="username" placeholder="User Name" /></div>
                                            <div className="form-group"><input className="form-control" type="email" name="email" placeholder="Email" /></div>
                                            <div className="form-group"><input className="form-control" type="password" name="password" placeholder="Password" /></div>
                                            <div className="form-group"><input className="form-control" type="password" name="password-repeat" placeholder="Password (repeat)" /></div>
                                            <div className="form-group"><button className="btn btn-primary btn-block" type="button" data-dismiss="modal" data-target="#ModalSignIn">Sign Up</button></div>
                                        </form>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>

            </nav>
            <div className="container">
                <h2 className="subtitle">Recommendation</h2>
                <div className="container">
                <Browser list={businessList}></Browser>
                </div>

            </div>
        </div>
    )
}


// function Navbar() {
//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
//       <div className="container navbar-brand">
//       <Link className="navbar-brand" to="/" className={ window.location.pathname === "/" || window.location.pathname === "/landing"
//                   ? "nav-link active"
//                   : "nav-link"}>
//         Spart
//       </Link>
//       </div>
//       <div className="searchbar nav-item">
//           <p> temp Search area here</p>
//           {/* <SearchArea></SearchArea> */}
//       </div>
//         <div calssName="justify-content-end">
//             <ul className="navbar-nav nav ml-auto">
//             <li className="nav-item">
//             <Link
//                 to="/discover"
//                 className={window.location.pathname === "/discover" ? "nav-link active" : "nav-link"}
//                 >
//                 Discover
//                 </Link>
//             </li>
//             <li className="nav-item">
//                 <Link
//                 to="/discover"
//                 className={window.location.pathname === "/discover" ? "nav-link active" : "nav-link"}
//                 >
//                 About Us
//                 </Link>
//             </li>
//             <li className="nav-item">
//                 <Link
//                 to="/search"
//                 className={window.location.pathname === "/search" ? "nav-link active" : "nav-link"}
//                 >
//                 My Page
//                 </Link>
//             </li>
//             <li className="nav-item">
//                 <Link
//                 to="/Sign In"
//                 className={window.location.pathname === "/singup" ? "nav-link active" : "nav-link"}
//                 >
//                 <button type="button" className="btn btn-secondary">Sing Up</button>
//                 </Link>
//             </li>
//             <li className="nav-item">
//                 <Link
//                 to="/Sign In"
//                 className={window.location.pathname === "/singin" ? "nav-link active" : "nav-link"}
//                 >
//                 <button type="button" className="btn btn-secondary">Sing In</button>
//                 </Link>
//             </li>
//             </ul>
//         </div>
//     </nav>
//   );
// }

export default Navbar;
