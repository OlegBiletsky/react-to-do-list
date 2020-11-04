import React from "react";
import { v4 as uuidv4 } from "uuid";

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      text: props.data.text
    };
  }

  render() {
    const {
      data: { id, completed, text },
      handleComplete,
      handleSave,
      handleDelete
    } = this.props;

    const onEdit = () => {
      if (this.state.editing) {
        handleSave(id, this.state.text);
        this.setState({ editing: false });
        return;
      }
      this.setState({ editing: true });
    };

    return (
      <li>
        {this.state.editing ? (
          <input
            value={this.state.text}
            onChange={(e) => this.setState({ text: e.target.value })}
          />
        ) : completed ? (
          <strike>{text}</strike>
        ) : (
          text
        )}
        <button onClick={() => handleComplete(id)}>
          {completed ? "Ще виконую" : "Зроблено"}
        </button>
        <button onClick={() => handleDelete(id)}>Видалити</button>
        <button onClick={() => onEdit()}>
          {this.state.editing ? "Зберегти" : "Редагувати"}
        </button>
      </li>
    );
  }
}

class List extends React.Component {
  constructor() {
    super();
    this.state = {
      currentItem: {
        text: "",
        id: uuidv4(), //обовязково щоб не було баги з пустим рядком
        completed: false,
        editing: false
      },
      list: [
        {
          text: "Vita",
          id: 1,
          completed: false,
          editing: false
        },
        {
          text: "Oleh",
          id: 2,
          completed: false,
          editing: true
        },
        {
          text: "papa",
          id: 5,
          completed: false,
          editing: false
        },
        {
          text: "mama",
          id: 6,
          completed: false,
          editing: false
        }
      ]
    };
  }

  handleInputChange = (e) => {
    this.setState({
      currentItem: {
        text: e.target.value,
        id: uuidv4(), //бібліотека унікальних id
        completed: false,
        editing: false
      }
    });
  };

  handleAddItemToList = (e) => {
    e.preventDefault();
    this.setState((state) => {
      const newList = [...this.state.list, this.state.currentItem];
      return {
        currentItem: {
          text: "",
          id: uuidv4(), //обовязково щоб не було баги з пустим рядком
          completed: false,
          editing: false
        },
        list: newList
      };
    });
  };

  handleResetList = () => {
    this.setState({
      list: []
    });
  };

  handleEditItem = (id, text) => {
    this.setState((state) => ({
      list: state.list.map((item) =>
        item.id !== id
          ? item
          : {
              ...item,
              text: text
            }
      )
    }));
  };

  handleDeleteItem = (id) => {
    this.setState((state) => ({
      list: state.list.filter((item) => item.id !== id)
    }));
  };

  handleItemDone = (id) => {
    this.setState((state) => ({
      list: state.list.map(
        (item) =>
        item.id !== id
          ? item
          : {
              ...item,
              completed: !item.completed
            }
      )
    }));
  };

  render() {
    return (
      <>
        <button onClick={this.handleResetList}>Очистити все!</button>

        <form onSubmit={this.handleAddItemToList}>
          <input
            type="text"
            placeholder="add new task"
            value={this.state.currentItem.text}
            onChange={this.handleInputChange}
          />
        </form>

        <button onClick={this.handleAddItemToList}>Додати</button>

        {this.state.list.map((item) => (
          <ListItem
            key={item.id}
            data={item}
            handleComplete={this.handleItemDone}
            handleSave={this.handleEditItem}
            handleDelete={this.handleDeleteItem}
          />
        ))}
      </>
      
    );
  }
}

export default List;
