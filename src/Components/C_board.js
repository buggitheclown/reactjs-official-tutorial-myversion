import React from 'react';
import {C_Square} from './C_square';
// eslint-disable-next-line
export {C_Board};

class C_Board extends React.Component {
  constructor(props){
    super(props);
    this.state = ({currentPlayer: "O", fillings: [["","","","","","","","",""]], gameFinished: false, gameWon: false})

    this.switchCurrentPlayer = this.switchCurrentPlayer.bind(this);
    this.fillSquare = this.fillSquare.bind(this);
    this.checkIfGameIsWon = this.checkIfGameIsWon.bind(this);
    this.checkWinningCombinations = this.checkWinningCombinations.bind(this);
    this.getLastPlayer = this.getLastPlayer.bind(this);
  }

  switchCurrentPlayer(){
    if(this.state.currentPlayer==="X"){
      this.setState({currentPlayer: "O"});
    }
    else if(this.state.currentPlayer==="O"){
      this.setState({currentPlayer: "X"});
    }
  }

  fillSquare(index){
    if (!this.state.gameFinished && !this.state.gameWon){
      let array = [9];
      for (let i = 0; i<9; i++){
        array[i] = this.state.fillings[this.props.currentTurn][i];
      }
      if (array[index]===""){
        array[index]=this.state.currentPlayer;
        let newFillings = this.state.fillings;
        newFillings.push(array);
        this.props.nextTurn();
        this.setState({fillings: newFillings});
        this.props.turnOffViewingHistoryMode();
        this.switchCurrentPlayer();
        this.checkIfGameIsWon(newFillings);
      }
    }
  }

  checkIfGameIsWon(newFillings){
    if (this.props.currentTurn===9){
      this.setState({gameFinished: true});
    }
    else{
      const checkWinningCombinations = this.checkWinningCombinations;
      const winCombinations = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
      winCombinations.forEach(function(element){
        checkWinningCombinations(element, newFillings);
      });
    }
  }

  checkWinningCombinations(element, newFillings){
    const entry0 = newFillings[this.props.currentTurn+1][element[0]];
    const entry1 = newFillings[this.props.currentTurn+1][element[1]];
    const entry2 = newFillings[this.props.currentTurn+1][element[2]];

    if (
      entry0===entry1 && entry1 === entry2 && entry0!==""
    ){
      this.setState({gameFinished: true, gameWon: true});
      console.log("Game has been won");
    }
  }

  renderSquare(i) {
    let showingTurn = this.props.currentTurn;
    if(this.props.viewingHistory){
      showingTurn = this.props.viewingHistoryTurnNumber;
    }
    return <C_Square index={i} value={this.state.fillings[showingTurn][i]} fillFunction={this.fillSquare}/>;
  }

  getLastPlayer(){
    let lastPlayer="O";
    if(this.state.currentPlayer==="O"){
      lastPlayer="X";
    }
    return lastPlayer;
  }

  render() {
    let status = 'Next player: '+this.state.currentPlayer;
    if (this.state.gameWon){
      status = "Game won by player "+this.getLastPlayer();
    }
    else if (this.state.gameFinished){
      status = "The game has finished, noone won";
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
