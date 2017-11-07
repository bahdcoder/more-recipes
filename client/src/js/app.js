import { render } from 'react-dom';
import React, { Component } from 'react';

import '../css/styles.css';
import leenImage from '../assets/leen.jpg';

export default class App extends Component {
  render() {
    return (
      <div>
        <img src={ leenImage } alt='Commander Keen' />
      </div>
    );
  }
}

