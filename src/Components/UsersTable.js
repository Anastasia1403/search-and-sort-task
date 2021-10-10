import React from "react";
import User from "./User";

class UsersTable extends React.Component {
  goToPage = (event) => {
    this.props.changeCurrentPage(+event.target.innerHTML);
  };

  goToNextPage = () => {
    if (this.props.currentPage < this.props.pagesNumber) {
      this.props.changeCurrentPage(this.props.currentPage + 1);
    }
  };

  goToPrevPage = () => {
    if (this.props.currentPage > 1) {
      this.props.changeCurrentPage(this.props.currentPage - 1);
    }
  };

  onSorting = (event) => {
     const targetName = event.target.getAttribute('name')
    this.props.changeSortingOptions(targetName);
    }

  render() {

    const { users, selectedProfileKey, changeSelectedProfile, currentPage, pageSize, pagesNumber} = this.props;
    const {order, field } = this.props.sortingOptions;

    //calculating parameters for pagination
    let pages = [];
    for (let i = 1; i <= pagesNumber; i++) {
      pages.push(i);
    }
    let firstUserOnPage = (currentPage - 1) * pageSize;
    let lastUserOnPage = currentPage * pageSize;

    return (
      <div>
        <table className="users-table">
          <thead>
            <tr>
              <th onClick={this.onSorting} name='id'>id {field === 'id' ? (order === 'asc'? '▲' : '▼') : null }</th>
              <th onClick={this.onSorting} name='firstName'>firstName {field === 'firstName' ? (order === 'asc'? '▲' : '▼') : null }</th>
              <th onClick={this.onSorting} name='lastName'>lastName {field === 'lastName' ? (order === 'asc'? '▲' : '▼') : null }</th>
              <th onClick={this.onSorting} name='email'>email {field === 'email' ? (order === 'asc'? '▲' : '▼') : null }</th>
              <th onClick={this.onSorting} name='phone'>phone {field === 'phone' ? (order === 'asc'? '▲' : '▼') : null }</th>
              <th onClick={this.onSorting} name='state'>state {field === 'state' ? (order === 'asc'? '▲' : '▼') : null }</th>
            </tr>
          </thead>
          <tbody>
            {
           users
              .slice(firstUserOnPage, lastUserOnPage)
              .map(user => {
                return (
                  <User
                    key = {users.indexOf(user)+1}
                    index = {users.indexOf(user)+1}
                    user = {user}
                    selectedProfileKey = {selectedProfileKey}
                    changeSelectedProfile = {changeSelectedProfile}
                  />
                );
              })}
          </tbody>
        </table>

        <button onClick={this.goToPrevPage}>Prev</button>
        {pages.map((page) => {
          return (
            <button
              className={page === currentPage ? "current" : null}
              onClick={this.goToPage}
              key={page}
              value={page}>
              {page}
            </button>
          );
        })}
        <button onClick={this.goToNextPage}>Next</button>
      </div>
    );
  }
}

export default UsersTable;
