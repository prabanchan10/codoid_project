import React from "react";
import { Link, Outlet } from "react-router-dom";

function Navbar (){
    return(
        <>
        <h1>Welcome!!!!</h1>
        <h3>Please Select Signup or Login</h3>
        <nav>
              <Link className="link" to="/signup">Signup</Link>
              <Link className="link" to="/login">Login</Link>
              <Outlet/>
        </nav>
        </>
    )
}

export default Navbar;