
# Rate My Breed

## Description
The project allows the user to rate each breed individually, then view their 'choices' page to see which breeds they've liked and disliked.   

Each breed of cat is generated using [CatAPI](https://docs.thecatapi.com/).  

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).  

## Installation
- Clone this repository
- Run ```$ yarn start```
- Open [http://localhost:3000](http://localhost:3000) to view in the browser
- Run ```$ yarn test``` to see the tests being run

## Usage

Opening the app will take you to the homepage, where you have your first breed to rate. Once you have clicked 'Like' or 'Dislike', a new breed will be automatically generated.
<img width="1112" alt="Screenshot 2020-03-02 at 09 18 06" src="https://user-images.githubusercontent.com/53044792/75663143-427c0680-5c68-11ea-9dca-37b087153265.png">

The user can go through rating each breed, and when they've had enough click on 'My Choices' to view your likes and dislikes.  

<img width="804" alt="Screenshot 2020-03-02 at 09 20 02" src="https://user-images.githubusercontent.com/53044792/75664102-d69a9d80-5c69-11ea-92a7-a933d34fa3dc.png">

<img width="1009" alt="Screenshot 2020-03-02 at 09 20 15" src="https://user-images.githubusercontent.com/53044792/75663355-8d961980-5c68-11ea-846d-70725870cec3.png">

The user can then return to the rating page by click on the button 'Back to Rater'.

## Technologies used
- ReactJS
- JavaScript
- CatAPI
- HTML
- CSS
- Jest
- Enzyme

## Project Status
The project is currently complete, howevever developments could be made. These include attaching a back-end and database to store the likes for each breed, and shows the number of likes per breed on a profile page for each breed with more information about that breed (e.g. affection level, country of origin - all provided in the API call). Also, could expand with authentication, each user signs into their own account with their breed likes and dislikes stored within that.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
