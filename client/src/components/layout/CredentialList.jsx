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
  const localUserData = useSelector((state) => state.auth.user);
  const [userData, setUserData] = useState({});
  const [credList, setCredList] = useState([]);
  const [show, setShow] = useState(false);
  const [qrValue, setQrValue] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/users/info", {
        params: {
          email: localUserData.email,
        },
      })
      .then((response) => {
        setUserData(response.data);
        axios
          .get("http://localhost:4000/api/schema/getAll")
          .then((res) => {
            const data = res.data;
            setCredList(data.schemas);
          })
          .catch((error) => console.log(error));
      });
  }, []);

  const onGenerateQr = (e, index) => {
    setShow(true);
    console.log(userData);
    setQrValue(
      JSON.stringify({
        url: "http://localhost:4000/api/credential/create",
        schemaDid: credList[index].did,
        studentId: userData.studentId,
      })
    );
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
                {!localUserData.isAdmin && (
                  <div className="text-end">
                    <Button
                      variant="primary"
                      onClick={(e) => onGenerateQr(e, ind)}
                    >
                      Generate QR
                    </Button>
                  </div>
                )}
              </Card.Body>
            </Card>
          );
        })}
      </Container>
    </>
  );
};

export default CredentialList;
