import React , {useState} from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { Row , Col , FormControl , InputGroup , Button , Form , Card , Container } from "react-bootstrap";


const CreateSchema = () => {

    const [ form , setForm ] = useState([]);

    const addProperty = (e) => {
        e.preventDefault();
        const newValue = {
            key : "",
            propType : "",
            propFormat : "",
        }
        setForm( (prev) => {
            return [
                ...prev,
                newValue,
            ]
        })
        console.log(form);
    }

    const onPropertyChange = (e,index) => {
        e.preventDefault();
        const propertyName = e.target.name
        const propertyValue = e.target.value
        setForm((prev) => {
            return prev.map( (value,ind) => {
                if(ind!==index){
                    return value;
                }
                return {
                    ...value,
                    [propertyName] : propertyValue,
                };
            })
        })
    }

    const removeProperty = (e,index) => {
        e.preventDefault();
        setForm( prev => prev.filter( item => item!==prev[index] ))
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(form);
    };

    return (<>
        <Container className="d-flex flex-column align-items-center">
        <Card className="shadow w-75 mt-5 mb-5">
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
                            <Form.Control type="text"/>
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
                    {
                        form.map( (value,index) => {
                            return (
                            <>
                                <hr />
                                <Form.Group key={index} as={Row} className="mb-3">
                                    <Form.Label column sm="2">
                                        Key
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control
                                            type="text"
                                            value={value.key}
                                            name="key"
                                            onChange={(e) => onPropertyChange(e,index)}
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group key={index} as={Row} className="mb-3">
                                    <Form.Label column sm="2">
                                        Type
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control
                                            type="text"
                                            value={value.propType}
                                            name="propType"
                                            onChange={(e) => onPropertyChange(e,index)}
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group key={index} as={Row} className="mb-3">
                                    <Form.Label column sm="2">
                                        Format
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control
                                            type="text"
                                            value={value.propFormat}
                                            name="propFormat"
                                            onChange={(e) => onPropertyChange(e,index)}
                                        />
                                    </Col>
                                </Form.Group>
                                <div className='d-flex flex-column align-items-end mt-3'>
                                    <Button
                                        variant="danger"
                                        type="submit"
                                        onClick={ (e) => removeProperty(e,index) }
                                    >
                                        Remove
                                    </Button>
                                </div>
                            </>);
                        })
                    }
                    <hr />
                    <div className='d-flex flex-column align-items-end mt-3'>
                        <Button variant="success" type="submit" onClick={addProperty}>
                            Add Property
                        </Button>
                    </div>
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