import React from 'react';

export class Breed extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      generatedBreedId: 0,
      generatedBreed: [],
      breedImage: '',
      likes: 0,
      dislikes: 0,
      likedBreeds: [],
      dislikedBreeds: []
    }
  }

  componentDidMount() {
    this.setBreed()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.likes !== prevState.likes || this.state.dislikes !== prevState.dislikes) {
      this.setBreed();
    }
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

  async breedApiCall() {

    //make api call for breed id
    await fetch('https://api.thecatapi.com/v1/breeds', {
      method: 'GET',
      headers: { 'x-api-key':'68b2ccd7-9af6-4b9b-9a56-e0786a49e8f0'},
      query: { "attach_breed": 60 },
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          generatedBreedId: this.shuffleArray(responseJson)[0]["id"]
        });
      })
      .catch(err => {
        console.log(err);
    });

    this.setImage()

    //make api call for individual breed
    return fetch(`https://api.thecatapi.com/v1/breeds/search?q=${this.state.generatedBreedId}`, {
      method: 'GET',
      headers: { 'x-api-key':'68b2ccd7-9af6-4b9b-9a56-e0786a49e8f0'}
    })
      .then(response => response.json())
  }

  imageApiCall() {
    return fetch(`https://api.thecatapi.com/v1/images/search?breed_id=${this.state.generatedBreedId}`, {
      method: 'GET',
      headers: { 'x-api-key':'68b2ccd7-9af6-4b9b-9a56-e0786a49e8f0'}
    })
      .then(response => response.json())
  }

  async setImage() {
    this.imageApiCall()
      .then((imageData) => {
        this.setState({
          breedImage: imageData[0]["url"]
        });
      })
      .catch(err => {
        console.log(err)
      })
  }

  async setBreed() {
    this.breedApiCall()
      .then((breedData) => {
        this.setState({
          generatedBreed: breedData[0],
          breedName: breedData[0]["name"],
          breedDescription: breedData[0]["description"]
        });
      })
      .catch(err => {
        console.log(err)
      })
  }

  giveLike() {
    const joinedLikes = this.state.likedBreeds.concat(this.state.breedName)
    this.setState(prevState => {
      return {
        likedBreeds: joinedLikes,
        likes: prevState.likes + 1
      }
    })
  }

  giveDislike() {
    var joinedDislikes = this.state.dislikedBreeds.concat(this.state.breedName)
    this.setState(prevState => {
      return {
        dislikedBreeds: joinedDislikes,
        dislikes: prevState.dislikes + 1
      }
    })
  }

  passThrough() {
    this.props.likedBreeds(this.state.likedBreeds)
    this.props.dislikedBreeds(this.state.dislikedBreeds)
    this.props.goToPage('choices')
  }

  render() {
    console.log(this.state)
    return (
      <div className="breed-container">
      <button
      onClick={() => this.passThrough()}
      >My choices</button>
      <h1>Rate My Breed</h1>
        <img height="270" width="300" src={this.state.breedImage}/>
        <h3 id="breedName">{this.state.breedName}</h3>
        <p id="breedDescription">{this.state.breedDescription}</p>

        <button className="control-buttons" id="like" onClick={() => this.giveLike()}>
          Like
        </button>
        <button className="control-buttons" id="dislike" onClick={() => this.giveDislike()}>
          Dislike
        </button>

      </div>
    )
  }
}

export default Breed;
