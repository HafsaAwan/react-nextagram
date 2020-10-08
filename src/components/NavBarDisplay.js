import React, {useState} from "react";
import { toast } from 'react-toastify';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
  } from 'reactstrap';

import { useHistory } from 'react-router-dom';

const NavBarDisplay = ({toggleModal, loggedIn, setLoggedIn}) => {

  const history = useHistory()

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem('jwt')
    setLoggedIn(false)
    toast.success('🦄 Sign out Successful!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
    history.push("/")
  }
  
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand style={{cursor: "pointer"}} onClick={() => {history.push("/")}}>Nextagram</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
            <NavItem>
                <NavLink style={{cursor: "pointer"}} onClick={() => {history.push("/")}}>Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink style={{cursor: "pointer"}} onClick={() => {history.push("/profile")}}>My Profile</NavLink>
              </NavItem>
              <NavItem>
                {
                  loggedIn ? 
                  <NavLink style={{cursor: "pointer"}} onClick={()=> handleLogout()}>Logout</NavLink>
                  :
                  <NavLink onClick={()=> toggleModal()}>Login</NavLink>
                }
                
              </NavItem>
              
            </Nav>
            
          </Collapse>
        </Navbar>

      </div>
    );


}
export default NavBarDisplay;