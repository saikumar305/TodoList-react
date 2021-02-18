import React, { Component } from "react";
import shortid from "shortid";

export class CreateTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      title: "",
      description: "",
      dueDate: "",
      completed: false,
      key: shortid.generate(),
    };
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  addTolist = (data) => {
    if (this.state.title !== "") {
      this.setState({
        list: [
          {
            title: this.state.title,
            description: this.state.description,
            dueDate: new Date(this.state.dueDate).toDateString(),
            key: this.state.key,
            completed: this.state.completed,
          },
          ...this.state.list,
        ],
        title: "",
        description: "",
        dueDate: "",
        key: shortid.generate(),
        completed: false,
      });
    }
  };

  updateDescription = (text, key) => {
    const list = this.state.list;
    list.map((item) => {
      if (item.key === key) {
        item.description = text;
      }
    });
    this.setState({
      list: list,
    });
  };
  updateTitle = (text, key) => {
    const list = this.state.list;
    list.map((item) => {
      if (item.key === key) {
        item.title = text;
      }
    });
    this.setState({
      list: list,
    });
  };

  deleteItem = (key) => {
    const filteredList = this.state.list.filter((item) => item.key !== key);
    this.setState({
      list: filteredList,
    });
  };
  isCompleted = (ind) => {
    const updatedList = this.state.list.map((item, index) => {
      if (index === ind) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    this.setState({
      list: updatedList,
    });
  };

  //   STATE AND METHODS ARE DEFINED ABOVE
  render() {
    var today = new Date();
    var month = today.getMonth();
    var date = today.getDate();
    var year = today.getFullYear();
    today = new Date(`${year}-${month + 1}-${date}`).toDateString();

    return (
      <div className="container ">
        <div className="task-input">
          <input
            type="text"
            name="title"
            className=" mx-3 my-1 p-1 row"
            placeholder="Title.."
            value={this.state.title}
            onChange={(e) => this.handleInput(e)}
          />
          <label htmlFor="deu date" className="duedate">
            Set deadline for the task:
          </label>
          <input
            type="date"
            name="dueDate"
            className="p-1 mx-3 my-1 col-8 col-md-2 row"
            value={this.state.dueDate}
            onChange={(e) => this.handleInput(e)}
          />
          <textarea
            name="description"
            cols="20"
            rows="3"
            className="text-area mx-3 my-1 "
            placeholder="Enter Description"
            value={this.state.description}
            onChange={(e) => this.handleInput(e)}
          ></textarea>
          <button
            className="button btn-danger m-3 w-25 row"
            onClick={() => {
              this.addTolist();
            }}
          >
            Add task
          </button>
        </div>
        <br />
        <hr className="w-90 dark" />
        {/* // INPUT SECTION ENDS HERE AND LIST ITEMS START */}
        <div className="list container-fluid row g-3 m-auto justify-content-center">
          {this.state.list.map((item, ind) => (
            <div
              key={item.key}
              class="card g-5 mx-2 mb-5"
              style={
                Date.parse(item.dueDate) < Date.parse(today)
                  ? { border: "5px solid yellow", width: "18rem" }
                  : { width: "18rem" }
              }
            >
              <div class="card-body">
                <h5 class="card-title bolder">
                  <input
                    style={
                      item.completed
                        ? { textDecoration: "line-through blue" }
                        : { textDecoration: "underLine" }
                    }
                    type="text"
                    className="outline-hidden"
                    value={item.title}
                    onChange={(e) =>
                      this.updateTitle(e.target.value, item.key)
                    }
                  />

                  <span>
                    <input
                      type="checkbox"
                      onClick={() => this.isCompleted(ind)}
                    />
                  </span>
                </h5>
                {/* <h6 class="card-subtitle mb-2 text-muted">Description</h6> */}
                <p class="card-text">
                  <textarea
                    rows="2"
                    placeholder="Add Task Description.."
                    className="outline-hidden"
                    type="text"
                    value={item.description}
                    onChange={(e) => {
                      this.updateDescription(e.target.value, item.key);
                    }}
                  />
                </p>
                <p>
                  Due: {item.dueDate === 'Invalid Date' ? 'Give date' : item.dueDate}
                  <span>
                    <button
                      className="del-btn"
                      onClick={() => this.deleteItem(item.key)}
                    >
                      Delete
                      </button>
                  </span>
                  <p style={Date.parse(item.dueDate) < Date.parse(today) ? { display: 'block' } : { display: 'none' }}>Due Date passed</p>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default CreateTask;
