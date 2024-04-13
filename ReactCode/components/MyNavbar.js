import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import './homestyle.css';
import { UserDataContext, UserContext, AppDataContext } from './ContextStuff';
import { useContext } from 'react';

export function MyNavbar(props) {
  const { setSearchShowId }  = props;
  const navigate = useNavigate();  

  const currentUser = useContext(UserContext);
  const appData = useContext(AppDataContext);

  // const searchChange = (e) =>{
  //   let value = e.target.value;
  //   if(value != ''){
  //     console.log(value);
  //   }
  // }
  // const handleOnSearch = (string, results) => {
  //   console.log('handle on search', string, results);
  // };

  const handleOnSelect = (item) => {
    // console.log('handle on select: ', item);
    navigate(`/search/?showId=${item.id}`);
    // if(setSearchShowId){
    //   setSearchShowId(item.id);
    // }
  };

  let showItems = [];
  if(appData){
    const shows = Object.keys(appData);
  
    for(let indx = 0; indx < shows.length; indx ++){
      let show = shows[indx];
      showItems.push({
        id: show, 
        title: appData[show].capital, 
        description: appData[show].desc
      })
    }
  }

  const handleSubmit = (e)=>{
    // console.log('event:', e.target[0].value);
    e.preventDefault();
    navigate(`/search/?searchName=${e.target[0].value}`);
  }
  
  // todo: add mobile modal here
  return (
    <Navbar expand="lg" className="navbar-dark">
      <Container fluid >
        <Navbar.Brand as={Link} to="/"><img className='show-icon' src='/aw_logo.png' alt="side logo" /></Navbar.Brand>
        <Navbar.Brand as={Link} to="/">AnimeWay</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          
          <Form className="ms-auto d-flex" style={{height: '40px'}} onSubmit={handleSubmit}>
            <div style={{width: '250px'}}>
              {appData && 
              <ReactSearchAutocomplete
                items={showItems}
                fuseOptions={{ keys: ["title", "description"] }} // Search on both fields
                resultStringKeyName="title" // String to display in the results
                // onSearch={handleOnSearch}
                onSelect={handleOnSelect}
                showIcon={true}
                styling={{
                  height: "34px",
                  border: "1px solid darkgreen",
                  borderRadius: "4px",
                  backgroundColor: "white",
                  boxShadow: "none",
                  hoverBackgroundColor: "lightgreen",
                  color: "darkgreen",
                  fontSize: "12px",
                  fontFamily: "Courier",
                  iconColor: "green",
                  lineColor: "lightgreen",
                  placeholderColor: "darkgreen",
                  clearIconMargin: "3px 8px 0 0",
                  zIndex: 2,
                }}
              />}
            </div>
            {/* <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e)=>{searchChange(e)}}
            />
            <Button variant="outline-success">Search</Button> */}
          </Form>
          
          <Nav
            className="ms-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            {currentUser === null || currentUser === undefined? 
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              : <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
            }
            <Nav.Link as={Link} to="/privacypolicy">Policy</Nav.Link>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

