import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { QRCode } from "react-qr-svg";
import { Button } from "react-bootstrap";

class Dashboard extends Component {
  onLogout = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

render() {
    const { user } = this.props.auth;
    const qrValue = JSON.stringify(user);
    console.log(qrValue);
    return (
      <div  className="container text-center mt-5">
        <div className="row">
          <div className="col-sm-12">
            <h4>
              Hey there, <b className="name-lable">{user.name.split(" ")[0]}</b>
              <p className="mt-4">
                You are logged into the College Website
              </p>
            </h4>
            {
                !user.isAdmin &&
                <QRCode
                    bgColor="#FFFFFF"
                    fgColor="#000000"
                    level="Q"
                    style={{ width: 256 }}
                    value={qrValue}
                />
            }
            <div>
            <Button
              onClick={this.onLogout}
              variant="dark"
              className="mt-3"
            >
              Logout
            </Button></div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);