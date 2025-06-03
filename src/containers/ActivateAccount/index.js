import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import TopBar from "../TopBar";
import Wrp from "../../components/Wrapper";
import CheckedImage from "../../images/checked.png";
import Button from "../../components/Button";

const Wrapper = styled(Wrp)`
  padding-bottom: 0;
`;

class Index extends Component {
  componentDidMount() {
    const { key } = this.props.match.params; // Accessing 'key' from route parameters
    // Example API call to activate account
    fetch(`${process.env.REACT_APP_API_URL}/auth/activate-account/${key}`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Account activated:", data);
        // You can add additional logic here, such as redirecting the user or showing a success message
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }

  render() {
    return (
      <Wrapper>
        <TopBar hideOn="phone,tablet" />
        <NavBar
          hideOn="desktop,widescreen"
          isNarrow
          title={"Account Activation"}
          goBackHandler={() => this.props.history.goBack()}
        />
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            padding: "20px",
            alignItems: "center",
            paddingTop: "80px",
          }}
        >
          <img
            src={CheckedImage}
            alt="Success Icon"
            style={{ width: "80px", height: "80px", marginBottom: "20px" }}
          />
          <h2 style={{ color: "green", fontSize: "24px", margin: "10px 0" }}>
            Account Activated Successfully!
          </h2>
          <p style={{ color: "#555", fontSize: "18px", margin: "10px 0" }}>
            Your account has been activated. You can now log in.
          </p>
          <Button
            onClick={() => this.props.history.push("/sign-in")}
            style={{
              marginTop: "30px",
              padding: "10px 20px",
              fontSize: "16px",
            }}
          >
            Back to Login
          </Button>
        </div>
        <Footer hideOn="phone,tablet" isNarrow />
      </Wrapper>
    );
  }
}

export default withRouter(Index);
