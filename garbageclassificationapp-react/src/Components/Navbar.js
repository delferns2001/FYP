import { Navbar, Nav, Container } from "react-bootstrap";

function TopNavBar() {
    // When the user scrolls down 50px from the top of the document, resize the header's font size
    window.onscroll = function () {
        scrollFunction();
    };

    function scrollFunction() {
        if (
            document.body.scrollTop > 50 ||
            document.documentElement.scrollTop > 50
        ) {
            document.getElementById("header").style.fontSize = "10px";
        } else {
            document.getElementById("header").style.fontSize = "20px";
        }
    }

    return (
        <Navbar id="header" expand="lg" sticky="top">
            <Container>
                {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#about">About</Nav.Link>
                        <Nav.Link href="#App">App</Nav.Link>
                        <Nav.Link href="#contact_me">Contact Me</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default TopNavBar;
