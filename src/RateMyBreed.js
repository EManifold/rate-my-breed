import React, {Component} from 'react';
import Breed from './components/Breed'

export default class RateMyBreed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'home',
    };
  }

  renderView() {
    switch (this.state.view) {
      case 'home':
        return (
          <Breed />
        );
      default:
        return (
          'Loading'
        );
    }
  }

  render() {
    return this.renderView();
  }
}
