import React, { Component } from 'react';
import '../styles/canvas.css';

class Canvas extends Component {
  render() {
    return (
      <div id="canvas-content">
        <canvas id="canvas"></canvas>
      </div>
    );
  }
}

export default Canvas;

