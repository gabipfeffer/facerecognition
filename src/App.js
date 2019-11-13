import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import './App.css';

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    fname: '',
    lname: '',
    email: '',
    entries: 0,
    joined: ''
  }
}



const particlesOptions = {
  particles: {
    number: {
      value: 60,
      density: {
        enable: true,
        value_area: 600
      }
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState
  }

  loadUser = (data) => {
    this.setState({ user: {
      id: data.id,
      fname: data.fname,
      lname: data.lname,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }


  onRouteChange = ( route ) => {
    if ( route === 'signout' ) {
      this.setState(initialState)
    } else if ( route === 'home' ) {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route });
  }


  calculateFaceLocation = (response) => {
    const clarifaiFace = response.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.querySelector('#inputimage');
    const width = image.width;
    const height = image.height;
      return {
        left_col: clarifaiFace.left_col * width,
        top_row: clarifaiFace.top_row * height,
        right_col: width - (clarifaiFace.right_col * width),
        bottom_row: height - (clarifaiFace.bottom_row * height)
      }
  }

  displayFaceBox = (box) => {
    this.setState({ box: box });
  }

  onInputChange = (e) => {
    this.setState({ input: e.target.value });
  }

  onPictureSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    fetch('https://infinite-shelf-57225.herokuapp.com/imageurl', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
              input: this.state.input
            })
          })
      .then(response => response.json())
      .then(response => {
        if (response) {
    fetch('https://infinite-shelf-57225.herokuapp.com/image', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
      .then(response => response.json())
      .then(count => {
            this.setState(Object.assign(this.state.user, { entries: count }))
          })
      .catch(console.log);
        }
        this.displayFaceBox(this.calculateFaceLocation(response));
      }).catch(err => console.log(err));
  }



  render() {
    const { isSignedIn, imageUrl, box, route } = this.state;
    return (
      <div className="App">
      <Particles params={particlesOptions} className='particles'/>
      <Navigation 
        onRouteChange={this.onRouteChange} 
        isSignedIn={isSignedIn}/>

      { route === 'home'
        ? <div>
            <Logo />
            <Rank name={this.state.user.fname} entries={this.state.user.entries} />
            <ImageLinkForm
              onPictureSubmit={this.onPictureSubmit} 
              onInputChange={this.onInputChange} /> 
            <FaceRecognition box={box} imageUrl={imageUrl} /> 
          </div> 
        : (route === 'signin' 
        ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />)
      }
    </div>
    );
  }
}

export default App;
