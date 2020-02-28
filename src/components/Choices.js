import React from 'react';

export class Choices extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      likedBreeds: [],
      dislikedBreeds: []
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

  returnToRater() {
    this.props.setLikedBreeds(this.state.likedBreeds)
    this.props.setDislikedBreeds(this.state.dislikedBreeds)
    this.props.goToPage('home')
  }

  render() {
    return (
      <div className="choices-container">
      <button
      id="back"
      onClick={() => this.returnToRater()}
      >Back to Rater</button>
        <h2>You like:</h2>
        <div className="liked-breeds">
          {
            this.state.likedBreeds.map(breed => (
              <div className="liked-breed">
                <img width="300" src={breed.image}/>
                <h3 id="breedName">{breed.data.name}</h3>
              </div>
            ))
          }
        </div>

        <h2>You dislike:</h2>
        <div className="disliked-breeds">
          {
            this.state.dislikedBreeds.map(breed => (
              <div className="disliked-breed">
                <img width="300" src={breed.image}/>
                <h3 id="breedName">{breed.data.name}</h3>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default Choices;
