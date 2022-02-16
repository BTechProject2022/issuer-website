import React, { useState, useEffect } from "react";
import { QRCode } from "react-qr-svg";
import {
  Modal,
  Card,
  Row,
  Col,
  Button,
  Container,
  Table,
} from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";

const CredentialList = () => {
  const user = useSelector((state) => state.auth.user);
  const qrValue = JSON.stringify(user);

  const [credList, setCredList] = useState([]);
  const [currendCred, setCurrentCred] = useState({});
  const [show, setShow] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/schema/getAll")
      .then((res) => {
        const data = res.data;
        setCredList(data.schemas);
      })
      .catch((error) => console.log(error));
  }, []);

  const onGenerateQr = (e, index) => {
    setShow(true);
    //make axios call to get Current Credentials
    //diplay credentials as QR code
  };

  return (
    <>
      <Modal
        className="text-center"
        show={show}
        onHide={() => setShow(false)}
        centered
      >
        <Modal.Header className="text-center" closeButton>
          <Modal.Title>QR Code</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <QRCode
            bgColor="#FFFFFF"
            fgColor="#000000"
            level="Q"
            style={{ width: 256 }}
            value={qrValue}
            className="my-2"
          />
        </Modal.Body>
      </Modal>
      <Container className="mt-3 w-50">
        <h2 className="text-center my-5">Available Credentials</h2>
        {credList.map((value, ind) => {
          return (
            <Card className="m-2">
              <Card.Header as="h5" className="text-center">
                {value.name}
              </Card.Header>
              <Card.Body>
                <Card.Text>{value.description}</Card.Text>
                <div className="text-end">
                  <Button
                    variant="primary"
                    onClick={(e) => onGenerateQr(e, ind)}
                  >
                    Generate QR
                  </Button>
                </div>
              </Card.Body>
            </Card>
          );
        })}
      </Container>
    </>
  );
};

export default CredentialList;
