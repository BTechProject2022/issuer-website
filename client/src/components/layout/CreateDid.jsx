import React , {useEffect, useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import axios from 'axios';
import classnames from "classnames";
import { Row , Col , FormControl , InputGroup , Button , Form , Card , Container } from "react-bootstrap";


const CreateSchema = () => {

    const dispatch = useDispatch();
    const userEmail = useSelector( state => state.auth.user.email);
    const [ user , setUser ] = useState({
        address : "",
        publicKey : "",
        did : "",
    });

    const [ input , setInput ] = useState({
        address : "",
        publicKey : "",
    })

    useEffect(() => {
        axios.get('api/users/info',{
            params : {
                email : userEmail,
            }
        }).then((data) =>{
            data = data.data;
            setUser({
                address : data.address,
                publicKey : data.publicKey,
                did : data.did,
            })
        })
    },[])

    const onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInput( (prev) => {
            return {
                ...prev,
                [name] : value,
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(input);
        axios.post('api/did/create',{
            email : userEmail,
            address : input.address,
            publicKey : input.publicKey,
        }).then(res => res.data)
        .then(data => {
            setUser({
                address : data.address,
                publicKey : data.publicKey,
                did : data.did,
            })
            setInput({
                address : "",
                publicKey : "",
            })
        })
    };

    return (<>
        <Container className="d-flex flex-column align-items-center">
        <Card className="shadow w-75 mt-5 mb-5">
            <Card.Header className='pl-5 pt-3 pb-2 d-flex flex-column align-items-center bg-dark text-white'>
                <h2><strong>DID</strong></h2>
            </Card.Header>
            <Card.Body className='px-5'>
                <Form onSubmit={onSubmit}>
                    { (!!user.did)? (<>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">
                                DID:
                            </Form.Label>
                            <Col sm="10">
                                {user.did}
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">
                                Address:
                            </Form.Label>
                            <Col sm="10">
                                {user.address}
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">
                                Public Key:
                            </Form.Label>
                            <Col sm="10">
                                {user.publicKey}
                            </Col>
                        </Form.Group>
                    </>):(<>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">
                                Address
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="text"
                                    value={input.address}
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
                                    value={input.publicKey}
                                    name="publicKey"
                                    onChange={onChange}
                                />
                            </Col>
                        </Form.Group>
                        <div className='d-flex flex-column align-items-center mt-3'>
                            <Button
                                variant="primary"
                                type="submit"
                            >
                                Submit
                            </Button>
                        </div>
                    </>)} </Form> </Card.Body> </Card>
        </Container>
    </>);
}

export default CreateSchema;