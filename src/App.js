import React, { Component } from "react";
import FriendCard from "./components/FriendCard/FriendCard.js";
import Wrapper from "./components/Wrapper/Wrapper.js";
import Nav from "./components/Navbar/Nav.js";
import Instructions from "./components/Instructions/Instructions.js";
import friends from "./friends.json";
import "./App.css";

class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    score: 0,
    highScore: 0,
    friends: friends
  };
  // Remebers state, if not clicked before,  If clicked before, alert You Lost
  randomRender = id => {
    this.state.friends.forEach((image) => {
      if (image.id === id) {
        if (image.clicked) {
          alert("You Lost! You previously selected this card.");
          this.setState({});
          this.resetGame();
          return false;
        }
        else {
          this.updateScore();
          image.clicked = true;
        }
        if (this.state.score >= this.state.highScore) {
          this.newHighScore();
        }
      }
    });
  }

  // Random shuffle method to be attached to the card json file
  randomOrganize = (array) => {
    let copy = [],
      n = array.length,
      i;
    while (n) {
      i = Math.floor(Math.random() * array.length);
      if (i in array) {
        copy.push(array[i]);
        delete array[i];
        n--;
      }
    }
    this.setState({ friends: copy });
  }

  // Score increments method to be called when random cards and no duplicate is clicked
  updateScore = () => {
    this.setState((newState) => ({
      score: newState.score + 1
    }), () => this.winning());
  }

  // High score auto increments as long as it beats the current state score
  newHighScore = () => {
    this.setState((newState) => ({
      highScore: newState.score
    }));
  }

  // When you click all the cards without clicking the same card, alert the user they won
  winning = () => {
    if (this.state.score === this.state.friends.length) {
      alert("You WIN!");
      this.setState({});
      this.resetGame();
    }
    else {
      setTimeout(() => {
        this.randomOrganize(this.state.friends);
      }, 500);
    }
  }

  // When you lose, this method will be called to reset all the clicked states back to false
  resetGame = () => {
    this.state.friends.forEach((image) => {
      image.clicked = false;
    });
    this.setState({ score: 0 });
  }



  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    return (
      <Wrapper>
        <Instructions />
        <Nav score={this.state.score} highScore={this.state.highScore} ></Nav>
        {this.state.friends.map(friend => {
          return <FriendCard
            {...friend}
            key={friend.id}
            randomRender={this.randomRender}
            randomOrganize={() => this.randomOrganize(this.state.friends)}
          />;
        })}
      </Wrapper>
    );
  }
}

export default App;
