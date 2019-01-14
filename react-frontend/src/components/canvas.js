import React, { Component } from 'react';
import { handleCanvas } from '../logic/canvas';
import '../styles/canvas.css';

class Canvas extends Component {
  componentDidMount() {
    handleCanvas();
  }

  render() {
    return (
      <div id="canvas-content">
        <canvas id="canvas"></canvas>
      </div>
    );
  }
}

export default Canvas;

