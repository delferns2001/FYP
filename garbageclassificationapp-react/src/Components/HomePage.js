import {
    Container,
    Card,
    Row,
    Col,
    Button,
    Placeholder,
} from "react-bootstrap";
export default function Homepage() {
    return (
        <>
            <Container>
                <figure className="position-relative">
                    <img
                        className="img-fluid"
                        style={{ height: "100vh", width: "100vw" }}
                        alt="Image"
                        src="/Sky1.jpg"
                    ></img>
                    <figcaption className="position-fluid">
                        Garbage Classification App
                    </figcaption>
                </figure>
            </Container>
        </>
    );
}
