import React from "react";

class SelectState extends React.Component {
    
  //add all different states in array states for creating select options
  states = [];
  allStates = this.props.users.map((user) => {
    if (!this.states.includes(user.adress.state)) {
      this.states.push(user.adress.state);
    }
  });

  onSelectState = (event) => {
    const selectedState = event.target.value;
    this.props.changeSelectedState(selectedState);
  };

  render() {
    return (
      <>
        <label className="select-state-label">
          {" "}
          Select state:
          <select
            onChange={this.onSelectState}
            value={this.props.selectedState}
          >
            {this.states.map((state) => {
              return <option key={state}>{state}</option>;
            })}
          </select>
        </label>
        <button onClick={this.onSelectState} value="">
          Reset selected state
        </button>
      </>
    );
  }
}

export default SelectState;
