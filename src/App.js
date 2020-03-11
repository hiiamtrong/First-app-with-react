import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import DoSomeThing from "./components/DoSomeThing";
import Item from "./components/Item";
import Downarrow from "./img/down-arrow.svg";
import ClassNames from "classnames";

class App extends Component {
  constructor() {
    super();
    this.state = {
      newItem: "",
      Items: [
        { title: "Sleeping", isDone: true },
        { title: "Go to school", isDone: true },
        { title: "Play video game", isDone: true }
      ],
      isCurrentStatus: true,
      isAll: true,
      isActive: false,
      isCompleted: false
    };
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onDoneAll = this.onDoneAll.bind(this);
    this.onClearCompleted = this.onClearCompleted.bind(this);
    this.onViewAll = this.onViewAll.bind(this);
    this.onViewActive = this.onViewActive.bind(this);
    this.onViewCompleted = this.onViewCompleted.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onCancelEdit = this.onCancelEdit.bind(this);
  }
  onItemClick(item) {
    return () => {
      const Items = this.state.Items;
      const isDone = item.isDone;
      const index = Items.indexOf(item);
      this.setState({
        Items: [
          ...Items.slice(0, index),
          { ...item, isDone: !isDone },
          ...Items.slice(index + 1)
        ]
      });
      item.isDone = !item.isDone;
    };
    this.onCancelEdit();
  }

  onKeyUp(event) {
    let value = event.target.value;
    let Items = this.state.Items;
    let newItem = this.state.newItem;
    this.onCancelEdit();
    // console.log(value)
    if (event.keyCode === 13) {
      if (newItem === "") {
        return;
      }

      newItem = newItem.trim();

      if (newItem === "") {
        return;
      }
      this.setState({
        Items: [{ title: this.state.newItem, isDone: false }, ...Items],
        newItem: ""
      });
    }
  }

  onChange(event) {
    this.setState({
      newItem: event.target.value
    });
    this.onCancelEdit();
  }

  onDoneAll() {
    let Items = this.state.Items;
    this.onCancelEdit();
    this.setState({
      Items: Items.map(item => {
        item.isDone = this.state.isCurrentStatus;
        return item;
      }),
      isCurrentStatus: !this.state.isCurrentStatus
    });
    console.log(this.state.isCurrentStatus);
  }

  onRemove(item) {
    return event => {
      this.onCancelEdit();
      let Items = this.state.Items;
      let index = Items.indexOf(item);
      this.setState({
        Items: [...Items.slice(0, index), ...Items.slice(index + 1)]
      });
    };

    console.log(item);
  }

  onClearCompleted() {
    this.onCancelEdit();
    this.setState({
      Items: this.state.Items.filter(item => item.isDone === false)
    });
  }
  onViewAll() {
    this.setState({
      isAll: true,
      isCompleted: false,
      isActive: false
    });
    this.onCancelEdit();
  }
  onViewActive() {
    this.setState({
      isActive: true,
      isAll: false,
      isCompleted: false
    });
    this.onCancelEdit();
    console.log(this.state.isActive);
  }
  onViewCompleted() {
    this.setState({
      isCompleted: true,
      isActive: false,
      isAll: false
    });
    this.onCancelEdit();
  }

  onDoubleClick(item) {
    let Items = this.state.Items;
    let index = Items.indexOf(item);
    return event => {
      console.log(event.target);
      if (event.target.lastChild) {
        event.target.lastChild.value = "";
        // event.target.
      }
      this.setState({
        Items: [
          ...Items.slice(0, index).map(item => {
            delete item.isEdit;
            return item;
          }),
          { ...item, isEdit: true },
          ...Items.slice(index + 1).map(item => {
            delete item.isEdit;
            return item;
          })
        ]
      });
    };
  }
  onEdit(item) {
    return event => {
      let value = event.target.value;
      let Items = this.state.Items;
      let index = Items.indexOf(item);
      if (event.keyCode === 13) {
        if (value === "") {
          return;
        }

        value = value.trim();

        if (value === "") {
          return;
        }
        this.setState({
          Items: [
            ...Items.slice(0, index),
            { ...item, title: value, isEdit: false },
            ...Items.slice(index + 1)
          ]
        });
        document.querySelector(".isEdit").value = "";
      }
    };
  }
  onCancelEdit() {
    this.setState({
      Items: this.state.Items.map(item => {
        delete item.isEdit;
        return item;
      })
    });
  }

  render() {
    return (
      <div className="App">
        <DoSomeThing
          major="Software Engineering"
          school="Hanoi University of Industry"
        />
        <div className="input__add-item">
          <img
            src={Downarrow}
            onClick={this.onDoneAll}
            className={ClassNames({
              "status-done": this.state.Items
                ? this.state.Items.some(item => item.isDone === false)
                : false
            })}
          />
          <input
            type="text"
            placeholder="Add a work"
            onKeyUp={this.onKeyUp}
            onChange={this.onChange}
            value={this.state.newItem}
          />
        </div>
        {this.state.Items.length > 0 && (
          <div>
            {this.state.Items.map((item, index) => (
              <Item
                key={index}
                item={item}
                className={ClassNames({
                  item: true,
                  isActive: item.isDone && this.state.isActive,
                  isCompleted: !item.isDone && this.state.isCompleted,
                  isAll: this.state.isAll
                })}
                Input={ClassNames({
                  "text-edit": true,
                  isEdit: item.isEdit
                })}
                onClick={this.onItemClick(item)}
                onRemove={this.onRemove(item)}
                onDoubleClick={this.onDoubleClick(item)}
                onEdit={this.onEdit(item)}
              />
            ))}
            {
              <div className="footer">
                <label>
                  {
                    this.state.Items.filter(item => item.isDone === false)
                      .length
                  }{" "}
                  items left
                </label>
                <div className="list-btn">
                  <button className="btn-action" onClick={this.onViewAll}>
                    All
                  </button>
                  <button className="btn-action" onClick={this.onViewActive}>
                    Active
                  </button>
                  <button className="btn-action" onClick={this.onViewCompleted}>
                    Completed
                  </button>
                </div>
                <div
                  onClick={this.onClearCompleted}
                  className={ClassNames({
                    "clear-btn": true,
                    "clear-completed": this.state.Items.some(
                      item => item.isDone === true
                    )
                  })}
                >
                  Clear completed
                </div>
              </div>
            }
          </div>
        )}
        {this.state.Items.length === 0 && <h3>Nothing</h3>}
      </div>
    );
  }
}

export default App;
