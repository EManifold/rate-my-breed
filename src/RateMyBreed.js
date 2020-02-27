import React, {Component} from 'react';
import Breed from './components/Breed'
import Choices from './components/Choices'

export default class RateMyBreed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'home',
      dislikedBreeds: '',
      likedBreeds: ''
    };
  }

  renderView() {
    switch (this.state.view) {
      case 'home':
        return (
          <Breed
          goToPage={page => this.setState({view: page})}
          likedBreeds={results => this.setState({likedBreeds: results})}
          dislikedBreeds={results => this.setState({dislikedBreeds: results})}
          />
        );
        case 'choices':
          return (
            <Choices 
            likedBreeds={this.state.likedBreeds}
            dislikedBreeds={this.state.dislikedBreeds}
            />
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
