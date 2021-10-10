import React from "react";


class SearchByName extends React.Component {


    onChangeInput = (event) => {        
        this.props.searching(event.target.value);
             };

    render() {

    return(
       <label className = 'searching-label'>
           Search by name:
           <input value={this.props.seachingData} onChange = {this.onChangeInput}  placeholder='Enter searching data'/>
           
       </label>
    )
}

}

export default SearchByName;