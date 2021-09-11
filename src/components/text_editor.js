import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

var exampleSocket = new WebSocket("ws://99.235.37.139:8000/");

exampleSocket.onmessage = async function (event) {
  console.log(await event.data.text());
};

export default class Text_editor extends React.Component {
  state = {
    value: "",
  };

  async setValue(value) {
    this.setState({ value: value });

    exampleSocket.send(value);

    exampleSocket.send("SendMeFuckingData");
  }

  render() {
    return (
      <div>
        <ReactQuill
          theme="snow"
          value={this.state.value}
          onChange={(value) => this.setValue(value)}
        />
      </div>
    );
  }
}
