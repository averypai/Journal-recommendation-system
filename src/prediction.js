import React, { Component } from "react";
import { View } from "react-native";
import { Button, InputGroup, Form } from "react-bootstrap";
// import TextField from "@material-ui/core";
import axios from "axios";
import { ListGroup } from "react-bootstrap";
// import Typography from "@material-ui/core";
import WebFont from "webfontloader";
WebFont.load({
  google: {
    families: ['Caveat']
  }
});
class PREDICTION extends Component {
  constructor(props) {
    super(props);
    this.state = {
      review: null,
      result: null
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    this.setState({ result: null });
    e.preventDefault();

    /*    if (!this.state.review) {
	    review: " "
	} else {
	    review: this.state.review
	}*/
    let data = {
      review: this.state.review
    };
    //get
    const path = "/predict";
    console.log("predict");
    axios.post(path, data).then((res) => {
      console.log(res, "result");
      var dict = {};
      console.log(JSON.stringify(res.data.result));

      for (var i = 0; i < res.data.result.length; i++) {
        dict[res.data.result[i][0]] = res.data.result[i][1];
      }
      console.log(JSON.stringify(dict));
      this.setState({ result: dict });
    });
  }

  render() {
    return (
      <div
        id="result"
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          padding: "10px",
          height: "auto",
          width: "auto"
          // background: "#faf9f9"
        }}
      >
        <div style={{ padding: "50px", height: "100%", width: "50%" }}>
          <h4
            style={{
              margin: "auto",
              marginBottom: "20px",
              fontFamily: 'Caveat',
              fontWeight: "bold",
              color: "white"
            }}
          >
            Enter abstract here
          </h4>

          <InputGroup size="lg" style={{ width: "100%" }}>
            <Form
              onSubmit={this.onSubmit}
              style={{ width: "100%", height: "70%" }}
            >
              <Form.Group>
                <Form.Control
                  style={{ width: "100%", height: "70%" }}
                  size="lg"
                  as="textarea"
                  placeholder="Input... "
                  multiline={"true"}
                  rows={10}
                  type="text"
                  name="review"
                  value={this.state.review || " "}
                  onChange={this.onChange}
                />
              </Form.Group>
              <View style={{ marginVertical: 10, alignItems: "center" }}>
                <Button
                  variant="primary"
                  type="submit"
                  style={{
                    marginBottom: "10px",
                    width: "25%",
                    fontFamily: 'Caveat',
                    fontWeight: "bold"
                  }}
                >
                  Submit
                </Button>
              </View>
            </Form>
          </InputGroup>
          {/*       {this.state.review == null ? (
          " "
        ) : (
          <div style={{ wordWrap: "break-word" }}>
            <p>
              <h4>Entered abstract: </h4> {this.state.review}
            </p>
          </div>
        )} */}
        </div>

        {this.state.result == null ? (
          " "
        ) : (
          <div style={{ padding: "50px", height: "100%", width: "50%" }}>
            <h4 style={{ margin: "auto", marginBottom: "20px", color:"white", fontFamily: 'Caveat', fontWeight: "bold" }}>
              Recommended Journals - {/* toUpperCase() */}
            </h4>

            <ListGroup>
              <ListGroup.Item
                variant="info"
                style={{ backgroundColor: "#282c34" }}
              >
                {Object.keys(this.state.result).map((key, index) => (
                  <>
                    <p
                      style={{
                        color:"gold",
                        fontFamily: 'Caveat',
                        fontSize: 24,
                        fontWeight: "bold"
                      }}
                    >
                      {" "}
                      Top {index+1}: {this.state.result[index]}
                    </p>
                  </>
                ))}
              </ListGroup.Item>
            </ListGroup>
          </div>
        )}
      </div>
    );
  }
}

export default PREDICTION;
