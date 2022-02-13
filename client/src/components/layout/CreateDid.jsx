import React , {useState} from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { Row , Col , FormControl , InputGroup , Button , Form , Card , Container } from "react-bootstrap";


const CreateSchema = () => {

    const [ user , setUser ] = useState({
        address : "",
        publicKey : ""
    });

    const onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser( (prev) => {
            return {
                ...prev,
                [name] : value,
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(user);
    };

    return (<>
        <Container className="d-flex flex-column align-items-center">
        <Card className="shadow w-75 mt-5 mb-5">
            <Card.Header className='pl-5 pt-3 pb-2 d-flex flex-column align-items-center bg-dark text-white'>
                <h2><strong>Create DID</strong></h2>
            </Card.Header>
            <Card.Body className='px-5'>
                <Form onSubmit={onSubmit}>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">
                            Address
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control
                                type="text"
                                value={user.address}
                                name="address"
                                onChange={onChange}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-4">
                        <Form.Label column sm="2">
                            Public Key
                        </Form.Label>
                        <Col sm="10">
                            <FormControl
                                type="text"
                                value={user.publicKey}
                                name="publicKey"
                                onChange={onChange}
                            />
                        </Col>
                    </Form.Group>
                    <div className='d-flex flex-column align-items-center mt-3'>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
        </Container>
    </>);
}

export default CreateSchema;