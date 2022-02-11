import React , {useState} from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { Row , Col , FormControl , InputGroup , Button , Form , Card , Container } from "react-bootstrap";


const CreateSchema = (props) => {

    const [ email , setEmail ] = useState("");
    const [ password , setPassword ] = useState("");
    const [ errors , setErrors ] = useState({});

    const onSubmit = () => {
    };
    return (<>
        <Container className="d-flex flex-column align-items-center">
        <Card className="shadow w-75 mt-5">
            <Card.Header className='pl-5 pt-3 pb-2 d-flex flex-column align-items-center bg-dark text-white'>
                <h2><strong>Create Schema</strong></h2>
            </Card.Header>
            <Card.Body className='px-5'>
                <Form onSubmit={onSubmit}>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">
                            Name
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder="Password" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-4">
                        <Form.Label column sm="2">
                            Description
                        </Form.Label>
                        <Col sm="10">
                            <FormControl as="textarea"/>
                        </Col>
                    </Form.Group>
                    <hr />
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