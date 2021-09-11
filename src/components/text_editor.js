import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

var exampleSocket = new WebSocket("ws://99.235.37.139:8000/");
let response;
exampleSocket.onmessage = async function (event) {
  response = await event.data;
  console.log(response);
};

export default class Text_editor extends React.Component {
  componentDidMount() {
    setInterval(() => {
      exampleSocket.send("**");
      this.setState({ value2: response });
    }, 500);
  }

  state = {
    value: "",
    value2: "",
  };

  async setValue(value) {
    this.setState({ value: value });

    exampleSocket.send(value);
  }

  render() {
    return (
      <div>
        <ReactQuill
          theme="snow"
          value={this.state.value}
          onChange={(value) => this.setValue(value)}
        />

        <ReactQuill
          theme="snow"
          value={this.state.value}
          onChange={(value) => this.setValue(value)}
        />
      </div>
    );
  }
}
