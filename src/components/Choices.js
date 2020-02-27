import React from 'react';

export class Choices extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  componentDidMount() {
    this.setState({
      likedBreeds: this.removeDuplicates(this.props.likedBreeds),
      dislikedBreeds: this.removeDuplicates(this.props.dislikedBreeds),
    })
  }

  removeDuplicates(breeds) {
    return breeds.filter((a, b) => breeds.indexOf(a) === b);
  }

  render() {
    return (
      <div className="choices-container">
        <h4>You like:</h4>
        <p>{this.state.likedBreeds}</p>

        <h4>You dislike:</h4>
        <p>{this.state.dislikedBreeds}</p>
      </div>
    )
  }
}

export default Choices;
