import React, {Component} from 'react';

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
          'New app'
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
