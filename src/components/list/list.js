import React from 'react'

class List extends React.Component {
    constructor() {
        super();
        this.state = {
            currentItem: {
                            text: "",
                            // id: "",
                            completed: false,
                        },
            list: [
                {
                    text: "Vita",
                    id: 1,
                    completed: false,
                },
                {
                    text: "Oleh",
                    id: 2,
                    completed: false,
                },
                {
                    text: "sasa",
                    id: 3,
                    completed: false,
                },
                {
                    text: "zirka",
                    id: 4,
                    completed: false,
                },
                {
                    text: "papa",
                    id: 5,
                    completed: false,
                },
                {
                    text: "mama",
                    id: 6,
                    completed: false,
                },
            ],
        }
        this.handleInputChange = this.handleInputChange.bind(this) 
        this.handleAddItemToList = this.handleAddItemToList.bind(this)
        this.handleRenderList = this.handleRenderList.bind(this) 
        this.handleResetList = this.handleResetList.bind(this) 
        this.handleDeleteItem = this.handleDeleteItem.bind(this) 
        this.handleItemDone = this.handleItemDone.bind(this)
    }

    handleInputChange(e) {
            this.setState({
                    currentItem: {
                        text: e.target.value,
                        // id: "",
                        completed: false,
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
                        // id: "",
                        completed: false,
                    },
                    list: newList
                }
            }
        )
    }
    handleRenderList() {
        const visibleList = this.state.list.map(
                    (i, index) => (
                            <li>
                                {i.text}

                                <button id={index} onClick={this.handleItemDone}>Зроблено</button> 
                                <button id={index} onClick={this.handleDeleteItem}>Видалити</button> 
                            </li>
                        )
        )
        return(visibleList)
    }
    handleDeleteItem(e) {
        this.setState(
            state => {
            const newList = this.state.list.filter( (i,index) => index != e.target.id )
                return{
                    currentItem:{
                        text: "",
                        // id: "",
                        completed: false,
                    },
                    list: newList
                }
            }
        )
    }
    handleItemDone(e) {
        this.setState(
            state => {
                this.state.list.forEach( i => {
                    i.id == e.target.id ? i.completed=!i.completed : i.completed;
                    }     
                )
            }
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

