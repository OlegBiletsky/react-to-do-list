import React from 'react'
import { v4 as uuidv4 } from 'uuid';


class List extends React.Component {
    constructor() {
        super();
        this.state = {
            currentItem: {
                            text: "",
                            id: uuidv4(),//обовязково щоб не було баги з пустим рядком
                            completed: false,
                            editing: false,
                        },
            list: [
            {
                text: "Vita",
                id: 1,
                completed: false,
                editing: false,
            },
            {
                text: "Oleh",
                id: 2,
                completed: false,
                editing: true,
            },
            {
                text: "sasa",
                id: 3,
                completed: false,
                editing: false,
            },
            {
                text: "zirka",
                id: 4,
                completed: false,
                editing: true,
            },
            {
                text: "papa",
                id: 5,
                completed: false,
                editing: false,
            },
            {
                text: "mama",
                id: 6,
                completed: false,
                editing: false,
            },
        ],
    }
        this.handleInputChange = this.handleInputChange.bind(this) 
        this.handleAddItemToList = this.handleAddItemToList.bind(this)
        this.handleRenderList = this.handleRenderList.bind(this) 
        this.handleResetList = this.handleResetList.bind(this) 
        this.handleDeleteItem = this.handleDeleteItem.bind(this) 
        this.handleItemDone = this.handleItemDone.bind(this)
        this.handleEditItemButton = this.handleEditItemButton.bind(this)
    }

    handleInputChange(e) {
            this.setState({
                    currentItem: {
                        text: e.target.value,
                        id: uuidv4(),//бібліотека унікальних id
                        completed: false,
                        editing: false,
                    }                    
            })
    }
    handleAddItemToList(e) {
        e.preventDefault();
        this.setState(
            state => {
                const newList = [...this.state.list, this.state.currentItem]
                return{
                    currentItem:{
                        text: "",
                        id: uuidv4(),//обовязково щоб не було баги з пустим рядком
                        completed: false,
                        editing: false,
                    },
                    list: newList
                };
            }
        );
    }
    handleRenderList() {
        
        const visibleList = this.state.list.map(
            
                    (i) => 
                    (
                        (<li key={uuidv4()}>

                            

                            {i.completed ? 

                            <strike>
                                {
                                !i.editing ? i.text : <input value={i.text} onChange={console.log(i.text, "yess")
                                }/>
                                }
                            </strike> 
                                
                                : 

                                (!i.editing ? i.text : <input value={i.text} onChange={console.log(i.text, "no")} />)
                            }


                            <button id={i.id} onClick={this.handleItemDone}>{i.completed ? "Ще виконую" : "Зроблено"}</button> 

                            <button id={i.id} onClick={this.handleDeleteItem}>Видалити</button> 

                            <button id={i.id} onClick={this.handleEditItemButton}>{!i.editing ? "Редагувати" :"Зберегти" }</button> 
                        </li>)
                        )

        );
        return(visibleList)
    }

    handleEditItemButton(e) {
        console.log(e.target.id);

        this.setState(
            state => {
                const newList = this.state.list.map( i => ({...i, editing: (i.id == e.target.id) ? !i.editing : i.editing}) )
                return{ list: newList, }
            }
        );


         
    }

    handleDeleteItem(e) {
        this.setState(
            state => {
            const newList = this.state.list.filter( (i) => (i.id) != e.target.id )
                return{
                    list: newList
                }
            }
        )
    }
    handleItemDone(e) {
        // console.log(e.target.id, "e.target.id", typeof(e.target.id) );
        this.setState(
            state => ({ list: state.list.map(
                i => (
                    { ...i, completed: (i.id == e.target.id) ? !i.completed : i.completed }
                    )
                                            )
            })
        )
    }
    handleResetList() {
        this.setState({
            list: []
        })
    }
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
                
                {this.handleRenderList()}
            </>
        )
    }
}
export default List;

