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
      <div className="choices-container" style={{
        width: '40%',
        margin: "0 auto"
              }}>
      <button
      id="back"
      onClick={() => this.returnToRater()}
      style={{
        background: "#0062ff",
        borderColour: "#64DD17",
        color: "#fff",
        fontWeight: "bold",
        padding: "1em .5em",
        borderRadius: ".5em"
      }}
      >Back to Rater</button>
        <h2>You like:</h2>
        <div className="liked-breeds">
          {
            this.state.likedBreeds.map(breed => (
              <div
              className="liked-breed"
              style={{
                width: '60%',
                margin: '2em auto',
                borderRadius: '1em',
                boxShadow: '1px 0 2px rgba(0,0,0,.1)'
              }}>
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
              <div
              className="disliked-breed"
              style={{
                width: '60%',
                margin: '2em auto',
                borderRadius: '1em',
                boxShadow: '1px 0 2px rgba(0,0,0,.1)'
              }}>
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
