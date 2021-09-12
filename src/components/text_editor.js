import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

var exampleSocket;

export default class Text_editor extends React.Component {
  state = {
    value: "",
    value2: "",
  };

  componentDidMount() {
    exampleSocket = new WebSocket("ws://99.235.37.139:8000/");

    exampleSocket.onmessage = async function (event) {
      let response = await event.data.text();
      console.log(response);
      this.setState({ value2: response });
    };
  }

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
          value={this.state.value2}
          onChange={(value) => this.setValue(value)}
        />
      </div>
    );
  }
}
