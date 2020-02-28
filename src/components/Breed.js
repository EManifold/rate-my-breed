import React from 'react';

export class Breed extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentBreed: {},
      likedBreeds: this.props.likedBreeds,
      dislikedBreeds: this.props.dislikedBreeds,
      breeds: []
    }
  }

  async componentDidMount() {
    const breeds = await this.getBreeds();
    const randomisedBreeds = this.shuffleArray(breeds)

    this.setState({breeds: randomisedBreeds}, () => {
      const currentBreed = this.state.breeds[0]

      if(currentBreed) {
        this.setBreed(currentBreed)
      }
    })
  }

  shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
  }

  getBreeds() {
    //make api call for breed id
    const API_KEY = process.env.REACT_APP_API_KEY
    return fetch('https://api.thecatapi.com/v1/breeds', {
      method: 'GET',
      headers: { 'x-api-key': API_KEY},
      query: { "attach_breed": 60 },
    })
      .then(response => response.json())
      .catch(err => console.log(err))
  }

  getImage(breedId) {
    const API_KEY = process.env.REACT_APP_API_KEY
    return fetch(`https://api.thecatapi.com/v1/images/search?breed_id=${breedId}`, {
      method: 'GET',
      headers: { 'x-api-key': API_KEY}
    })
      .then(response => response.json())
      .then(imageData => imageData[0]["url"])
      .catch(err => console.log(err))
  }

  async setBreed(breed) {
    const image = await this.getImage(breed.id)

    this.setState({
      currentBreed: {
        data: breed,
        image: image
      }
    })
  }

  async onLikeChange(type) {
    const joinedLikes = this.state[type].concat(this.state.currentBreed)
    this.setState(prevState => {
      return {
        [type]: joinedLikes,
        breeds: prevState.breeds.slice(1)
      }
    }, () => {
      const currentBreed = this.state.breeds[0]
      if(currentBreed) {
        this.setBreed(currentBreed)
      }
    })
  }

  viewChoices() {
    this.props.setLikedBreeds(this.state.likedBreeds)
    this.props.setDislikedBreeds(this.state.dislikedBreeds)
    this.props.goToPage('choices')
  }

  render() {
    return (
      <div className="breed-container" style={{
                width: 700
              }}>
      <button
      id="view-choices"
      onClick={() => this.viewChoices()}
      >My choices</button>
      <h1>Rate My Breed</h1>
        <img width="300" src={this.state.currentBreed?.image}/>
        <h3 id="breedName">{this.state.currentBreed?.data?.name}</h3>
        <p id="breedDescription">{this.state.currentBreed?.data?.description}</p>

        <button className="control-buttons" id="like" onClick={() => this.onLikeChange("likedBreeds")}>
          Like
        </button>
        <button className="control-buttons" id="dislike" onClick={() => this.onLikeChange("dislikedBreeds")}>
          Dislike
        </button>

      </div>
    )
  }
}

export default Breed;
