import React from 'react';
import {C_Board} from './C_board';
import {C_HistoryButton} from './C_historyButton';
// eslint-disable-next-line
export {C_Game};

class C_Game extends React.Component {
  constructor(props){
    super(props);
    this.state = ({currentTurn: 0, turnArray: [0], viewingHistory: false});

    this.nextTurn = this.nextTurn.bind(this);
    this.viewHistory = this.viewHistory.bind(this);
    this.turnOffViewingHistoryMode = this.turnOffViewingHistoryMode.bind(this);
  }

  nextTurn(){
    let newTurn = this.state.currentTurn;
    newTurn++;
    let newTurnArray = this.state.turnArray;
    newTurnArray.push(newTurn);
    this.setState({currentTurn: newTurn, turnArray: newTurnArray});
  }

  viewHistory(requestedTurn){
    this.setState({viewingHistory: true, viewingHistoryTurnNumber: requestedTurn});
  }

  turnOffViewingHistoryMode(){
    if(this.state.viewingHistory===true){
      this.setState({viewingHistory: false});
    }
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <C_Board currentTurn={this.state.currentTurn} nextTurn={this.nextTurn} viewingHistory={this.state.viewingHistory} viewingHistoryTurnNumber={this.state.viewingHistoryTurnNumber}
          turnOffViewingHistoryMode={this.turnOffViewingHistoryMode}/>
        </div>
        <div className="game-info">
          <div>{/* status */}</div>

          <ol>{this.state.turnArray.map((turn) =>
            <C_HistoryButton key={turn} requestedTurn={turn} viewHistory={this.viewHistory}/>
          )}</ol>
        </div>
      </div>
    );
  }
}
