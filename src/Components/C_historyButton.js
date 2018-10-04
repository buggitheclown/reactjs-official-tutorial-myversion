import React from 'react';
// eslint-disable-next-line
export {C_HistoryButton};

class C_HistoryButton extends React.Component {
  render(){
    return (
      <div className="historyButtonDiv">
        <button
          type="button"
          //onClick={() => this.props.viewHistory(this.props.requestedTurn)}
          onClick={this.props.viewHistory.bind(this, this.props.requestedTurn)}
          >
            {this.props.requestedTurn===0 ? "Game start" : "Turn "+this.props.requestedTurn}
          </button>
      </div>
  )
  }
}
