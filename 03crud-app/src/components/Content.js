import React, { Component } from "react";

class Content extends Component {
    //컨텐츠 부분도 출력내용을
    render() {
      return (
        <article>
          <h2>{this.props.title}</h2>
          {this.props.desc}
        </article>
      );
    }
  }

  export default Content;