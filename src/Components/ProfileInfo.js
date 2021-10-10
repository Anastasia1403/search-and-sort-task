import React from "react";

class ProfileInfo extends React.Component {
  render() {
    const { firstName, lastName, description } = this.props.selectedProfile;
    const { streetAddress, city, state, zip } =
      this.props.selectedProfile.adress;
    return (
      <div className="profile_info">
        <h2>Profile Info:</h2>
        <div>
          Selected Profile: {firstName} {lastName}
        </div>
        <div>Description: {description}</div>
        <div>Address: {streetAddress}</div>
        <div>City: {city}</div>
        <div>State: {state}</div>
        <div>Index: {zip}</div>
      </div>
    );
  }
}

export default ProfileInfo;
