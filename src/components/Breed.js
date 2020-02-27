import React from 'react';

export class Breed extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      generatedBreedId: 0,
      generatedBreed: [],
      breedImage: ''
    }
  }

  componentDidMount() {
    this.setBreed()
    this.setImage()
  }

  async breedApiCall() {

    //make api call for breed id
    await fetch('https://api.thecatapi.com/v1/breeds', {
      method: 'GET',
      headers: { 'x-api-key':'68b2ccd7-9af6-4b9b-9a56-e0786a49e8f0'},
      query: { "attach_breed": 5},
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          generatedBreedId: responseJson[0]["id"]
        });
      })
      .catch(err => {
        console.log(err);
    });

    //make api call for individual breed
    return fetch(`https://api.thecatapi.com/v1/breeds/search?q=${this.state.generatedBreedId}`, {
      method: 'GET',
      headers: { 'x-api-key':'68b2ccd7-9af6-4b9b-9a56-e0786a49e8f0'}
    })
      .then(response => response.json())
  }

  imageApiCall() {
    return fetch(`https://api.thecatapi.com/v1/images/search?q=${this.state.generatedBreedId}`, {
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

  render() {
    return (
      <div className="breed-container">
      <img src={this.state.breedImage}/>
        <p id="breedName">{this.state.breedName}</p>
        <p id="breedDescription">{this.state.breedDescription}</p>
      </div>
    )
  }
}

export default Breed;
