import "./styles.css";
import "bootstrap/dist/css/bootstrap.css";
import PREDICTION from "./prediction";
// import RESULT from "./Result";
import DASHBOARD from "./Dashboard";
import FOOTER from "./footer";
import { Nav, Navbar } from "react-bootstrap";
import logo from "./logo.png";
import virus from "./virus.png";
import PROFILE from "./profile";
// import { Helmet, HelmetProvider } from "react-helmet-async";
// import { MDBBtn, MDBInput, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBIcon, MDBBadge, MDBContainer, MDBRow, MDBCol} from "mdbreact";
import { BrowserRouter, Link } from "react-router-dom";
import WebFont from "webfontloader";
WebFont.load({
  google: {
    families: ["Gloria Hallelujah", "Concert One"]
  }
});
document.body.style.backgroundColor = "#282c34";
export default function App() {
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" sticky="top">
        {/* style = {{  justifyContent:"center", alignItems:"center"}} */}
        <Navbar.Brand
          href="#"
          style={{ fontFamily: "Gloria Hallelujah", fontWeight: "bold" }}
        >
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            // className="d-inline-block align-top"
            style={{
              marginLeft: "30px"
            }}
          />{" "}
          Journal Recommendation
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav style={{ fontFamily: "Concert One", fontSize: "24px" }}>
            <Nav.Link href="#dashboard">Dashboard</Nav.Link>
            <Nav.Link href="#result">Result</Nav.Link>
            <Nav.Link href="#team">Team</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {/* <div> */}
      <header className="App-header">
        <BrowserRouter>
          {/* <a href="App-link"> */}
          <Link to="/predict">
            <img
              src={virus}
              className="App-home-logo"
              alt="Homepage"
              width="350"
              height="350"
              // onClick={"logo"}
              style={{ marginTop: 100, marginBottom: 50 }}
            />
          </Link>
        </BrowserRouter>
        <h1
          style={{
            color: "gold",
            marginBottom: 50,
            fontFamily: "Gloria Hallelujah",
            fontWeight: "bold"
          }}
        >
          Journal Recommendation system
        </h1>
      </header>
      <DASHBOARD></DASHBOARD>
      <PREDICTION></PREDICTION>
      <PROFILE></PROFILE>
      <FOOTER></FOOTER>
    </div>
  );
}
