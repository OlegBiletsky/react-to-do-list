import React from 'react';
import { v4 as uuidv4 } from 'uuid';//бібліотека унікальних id
import ListItem from '../listItem/listItem';
import './list.css';
import cn from 'classnames'

class List extends React.Component {//загальний class-component List
    constructor() {
        super();
        this.state = {
            currentItem: {//текущий айтем, він будує всі інші
                text: "",//пусте поле вводу, значення відображається в інпуті
                id: uuidv4(),//обовязково!-щоб не було баги з пустим рядком коли додаємо айтеми без тексту, а так інпут без тексту вже на старті має id
                completed: false,//не виконаний айтем!
            },
            list: []
        };
        //байндимо на this наші функції 
        this.handleInputChange = this.handleInputChange.bind(this) 
        this.handleAddItemToList = this.handleAddItemToList.bind(this) 
        this.handleResetList = this.handleResetList.bind(this) 
        this.handleEditItem = this.handleEditItem.bind(this)
        this.handleDeleteItem = this.handleDeleteItem.bind(this) 
        this.handleChangeCompletedFlag = this.handleChangeCompletedFlag.bind(this)
    }

    handleInputChange(e) {
            this.setState({
                currentItem: {
                    text: e.target.value,//відображається в інпуті онлайн
                    id: uuidv4(),
                    completed: false,
                }                    
            });
    };
    handleAddItemToList(e) {//додаємо введений айтем до лісту
        e.preventDefault();
        this.setState( (state) => {
            const newList = [...state.list, state.currentItem];
            return{
                currentItem:{//очистка вводу
                    text: "",
                    id: uuidv4(),
                    completed: false,
                },
                list: newList//лісту присвоюємо новий ліст
            };
        });
    };
    handleResetList() {//очищаємо все!
        this.setState({
            list: []
        });
    };
    handleEditItem = (id, text) => {//редагуємо айтем з пропсами: id та новим текстом - text
        this.setState((state) => ({
            list: state.list.map((item) =>
                item.id !== id ? item : 
                    {...item, text: text}
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
    handleChangeCompletedFlag(id) {//позначаємо виконаними по id
        this.setState((state) => ({ 
            list: state.list.map((item) =>
                item.id !== id ? item : 
                    {...item, completed: !item.completed}
            )
        }));
    };
    
    render() {
        // let btnClass = cn({
        //     btn: true,
        //     btn2: true,
        //     btn3: true,
        //     btn4: true,
        //     btn5: true,
            // 'btn-pressed': this.state.isPressed,
            // 'btn-over': !this.state.isPressed && this.state.isHovered
          //});
{/* <button className={btnClass}  onClick={this.handleResetList}>Очистити все!</button> */}

        return(
            <div className='main-container'>
                <button className='reset-button'  onClick={this.handleResetList}>Очистити все!</button>

                <form className='input-form' onSubmit={this.handleAddItemToList} >
                    <input 
                        type='text'
                        placeholder="add new task"
                        value={this.state.currentItem.text}
                        onChange={this.handleInputChange}
                        className='input-field'
                    />
                    <button className='add-button' onClick={this.handleAddItemToList}>Додати</button>
                </form>
                 
                
                
                {this.state.list.map((item) => (//для кожного айтема з ліста малюємо наступне
                    <ListItem
                        key={item.id}
                        data={item}
                        handleComplete={this.handleChangeCompletedFlag}
                        handleSave={this.handleEditItem}
                        handleDelete={this.handleDeleteItem}
                    />
                ))}
            </div>
        );
    }
}
export default List;

