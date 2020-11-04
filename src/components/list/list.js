import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import ListItem from './listItem';

class List extends React.Component {//загальний клас List
    constructor() {
        super();
        this.state = {
            currentItem: {//текущий айтем
                text: "",//пусте поле вводу
                id: uuidv4(),//обовязково щоб не було баги з пустим рядком
                completed: false,//не виконаний!
                editing: false,//не редагується зараз!
            },
            list: [//ліст де будуть наші айтеми
                {
                    text: "Learn React",
                    id: 1,
                    completed: false,
                    editing: false,
                },
                {
                    text: "Repeat JS",
                    id: 2,
                    completed: false,
                    editing: true,
                },
                {
                    text: "Read in English",
                    id: 5,
                    completed: false,
                    editing: false,
                },
                {
                    text: "Create project",
                    id: 6,
                    completed: false,
                    editing: false,
                },
            ],
        };
        //байндимо на this наші функції 
        this.handleInputChange = this.handleInputChange.bind(this) 
        this.handleAddItemToList = this.handleAddItemToList.bind(this) 
        this.handleResetList = this.handleResetList.bind(this) 
        this.handleDeleteItem = this.handleDeleteItem.bind(this) 
        this.handleItemDone = this.handleItemDone.bind(this)
        this.handleEditItem = this.handleEditItem.bind(this)
    }

    handleInputChange(e) {
            this.setState({
                currentItem: {
                    text: e.target.value,//відображає в інпут онлайн
                    id: uuidv4(),//бібліотека унікальних id
                    completed: false,
                    editing: false,
                }                    
            });
    };
    handleAddItemToList(e) {//додаємо введений айтем до лісту
        e.preventDefault();
        this.setState( (state) => {
            const newList = [...state.list, state.currentItem];
            return{
                currentItem:{
                    text: "",
                    id: uuidv4(),//обовязково щоб не було баги з пустим рядком
                    completed: false,
                    editing: false,
                },
                list: newList
            };
        });
    };
    handleResetList() {//очищаємо все
        this.setState({
            list: []
        });
    };
    handleEditItem = (id, text) => {//редагуємо айтем з id та text
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

    handleDeleteItem(id) {//видаляємо айтем по id
        this.setState( (state) => {
            const newList = state.list.filter( (item) => (item.id) !== id );
            return{
                    list: newList
                };
        });
    }
    handleItemDone(id) {//позначаємо виконаними по id
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
        return(
            <>
                <button onClick={this.handleResetList}>Очистити все!</button>

                <form onSubmit={this.handleAddItemToList}>
                    <input 
                        type='text'
                        placeholder="add new task"
                        value={this.state.currentItem.text}
                        onChange={this.handleInputChange}
                    />
                </form>
                 
                <button onClick={this.handleAddItemToList}>Додати</button>
                
                {this.state.list.map((item) => (//для кожного айтема з ліста малюємо наступне
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

