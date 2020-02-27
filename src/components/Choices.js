import React from 'react';

export class Choices extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      likedBreeds: this.props.likedBreeds,
      dislikedBreeds: this.props.dislikedBreeds
    }
  }

  render() {
    return (
      <p>{this.state.likedBreeds}</p>
    )
  }
}

export default Choices;
