import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default class Text_editor extends React.Component {
  state = {
    value: "",
  };

  async setValue(value) {
    this.setState({ value: value });
    response = await fetch("localhost:8000", {
      method: "post",
      mode: "cors",
      headers: {
        "Content-Type": "text/plain",
        body: value,
      },
    });
    console.log(response);
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
