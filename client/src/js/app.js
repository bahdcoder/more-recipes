import React, { Component } from 'react';
import { render } from 'react-dom';

import '../css/styles.css';
import leenImage from '../assets/leen.jpg';

export default class Hello extends Component {
  render() {
    return (
      <div>
        <img src={ leenImage } alt='Commander Keen' />
      </div>
    );
  }
}

render(<Hello />, document.getElementById('app'));
