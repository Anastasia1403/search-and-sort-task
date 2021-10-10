import React from "react";
import SearchByName from "./Components/SearchByName";
import SelectState from "./Components/SelectState";
import UsersTable from "./Components/UsersTable";
import ProfileInfo from "./Components/ProfileInfo";

class App extends React.Component {
  state = {
    error: null,
    isLoaded: false,
    users: [],
    currentPage: 1,
    selectedProfileKey: 0,
    sortingOptions: {
      field: "",
      order: "asc",
    },
    seachingData: "",
    selectedState: "",
    filteredUsers: [],
  };

  changeCurrentPage = (page) => {
    const currentPage = page;
    this.setState({ currentPage });
  };

  changeSelectedProfile = (key) => {
    const selectedProfileKey = +key;
    this.setState({ selectedProfileKey });
  };

  changeSelectedState = (selectedState) => {
    this.setState({ selectedState });
    const users = [...this.state.users];
    const filteredUsers = [];

    users.map((user) => {
      if (user.adress.state === selectedState) {
        filteredUsers.push(user);
      }
    });
    this.setState({ filteredUsers });
  };

  changeSortingOptions = (field) => {
    const sortingOptions = { ...this.state.sortingOptions };
    if (sortingOptions.field === field) {
      sortingOptions.order = sortingOptions.order === "asc" ? "desc" : "asc";
    } else {
      sortingOptions.field = field;
      sortingOptions.order = "asc";
    }
    this.setState({ sortingOptions });
    this.sorting(field, sortingOptions.order);
  };

  searching = (data) => {
    this.setState({ seachingData: data });
    const users = [...this.state.users];
    const filteredUsers = [];

    users.map((user) => {
      if (user.firstName.toLowerCase().includes(data.toLowerCase())) {
        filteredUsers.push(user);
      }
    });
    this.setState({ filteredUsers });
  };

  sorting = (field, order) => {
    const users =
      this.state.seachingData || this.state.selectedState
        ? [...this.state.filteredUsers]
        : [...this.state.users];
    let param; //parameter for order of sorting
    if (order === "asc") param = 1;
    else param = -1;

    users.sort((a, b) =>
      (a[field] || a.adress[field]) > (b[field] || b.adress[field])
        ? param
        : -1 * param
    );

    (this.state.seachingData || this.state.selectedState)
      ? this.setState({ filteredUsers: users })
      : this.setState({ users });
  };

  componentDidMount() {
    fetch(
      "https://itrex-react-lab-files.s3.eu-central-1.amazonaws.com/react-test-api.json"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            users: result,
          });
        },

        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    const {
      error,
      isLoaded,
      currentPage,
      selectedProfileKey,
      sortingOptions,
      seachingData,
      selectedState,
      filteredUsers,
    } = this.state;

    const users =
      seachingData || selectedState ? filteredUsers : this.state.users;

    //calculate datas for paged output
    const usersNumber = users.length;
    const pageSize = 20;
    const pagesNumber = usersNumber / pageSize;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <>
        <div className = 'filter-bar'>
          <SearchByName
            searching={this.searching}
            seachingData={seachingData}
          />

          <SelectState
            users={users}
            selectedState={selectedState}
            changeSelectedState={this.changeSelectedState}
          />
</div>
          <UsersTable
            users={users}
            pageSize={pageSize}
            pagesNumber={pagesNumber}
            currentPage={currentPage}
            selectedProfileKey={selectedProfileKey}
            sortingOptions={sortingOptions}
            changeCurrentPage={this.changeCurrentPage}
            changeSelectedProfile={this.changeSelectedProfile}
            changeSortingOptions={this.changeSortingOptions}
          />

          {users[selectedProfileKey - 1] ? (
            <ProfileInfo selectedProfile={users[selectedProfileKey - 1]} />
          ) : null}
        </>
      );
    }
  }
}

export default App;
