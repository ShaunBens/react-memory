import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import friends from "./friends.json";
import "./App.css";

class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    score: 0,
    highScore: 0,
    friends: friends
  };

  randomRender = id => {
    this.state.friends.forEach((image) => {
      if (image.id === id) {
        if (image.clicked) {
          alert("You Lost! You previously selected this card.");
          this.setState({})
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

  updateScore = () => {
    this.setState((newState) => ({
      score: newState.score + 1
    }), () => this.winning());
  }

  newHighScore = () => {
    this.setState((newState) => ({
      highScore: newState.score
    }));
  }

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
        <Nav score={this.state.score} highScore={this.state.highScore} />
        <GameInstructions />
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
