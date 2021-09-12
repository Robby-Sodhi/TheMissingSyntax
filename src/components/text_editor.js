import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

var exampleSocket;

export default class Text_editor extends React.Component {
  state = {
    value: "",
    value2: "",
    room_pin: "",
  };

  setValue(value) {
    this.setState({ value: value });

    exampleSocket.send(value);
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    exampleSocket = new WebSocket(
      `ws://99.234.19.166:8000/${this.state.room_pin}`
    );
    exampleSocket.onmessage = async (event) => {
      let response = await event.data.text();
      console.log(response);
      this.setState({ value2: response });
    };
  };

  render() {
    return (
      <div className="app">
        <ReactQuill
          theme="snow"
          value={this.state.value}
          onChange={(value) => this.setValue(value)}
        />

        <ReactQuill theme="snow" value={this.state.value2} readOnly />
        <form onSubmit={this.handleSubmit}>
          <input
            name="room_pin"
            value={this.state.room_pin}
            onChange={this.handleChange}
          ></input>
          <button type="submit">submit</button>
        </form>
      </div>
    );
  }
}
