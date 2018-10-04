import React from 'react';
// eslint-disable-next-line
export {C_Square};

class C_Square extends React.Component {
  constructor(props){
    super(props);

    this.fill = this.fill.bind(this);
  }

  fill(){
    this.props.fillFunction(this.props.index);
  }

  render() {
    return (
      <button className="square" onClick={this.fill}>
        {this.props.value}
      </button>
    );
  }
}
