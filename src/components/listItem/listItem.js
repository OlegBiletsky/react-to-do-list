import React from 'react';
import './listItem.css';
import cn from 'classnames'

// {this.state.list.map((item) => (//для кожного айтема з ліста малюємо наступне
//     <ListItem
//         key={item.id}
//         data={item}
//         handleComplete={this.handleChangeCompletedFlag}
//         handleSave={this.handleEditItem}
//         handleDelete={this.handleDeleteItem}
//     />
// ))}
class ListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false, //стан редагування - false
            text: props.data.text,
        };
    }

    render() {
        const {
            data: { id, completed, text },
            handleComplete:handleComplete,
            handleSave:handleSave,
            handleDelete:handleDelete,
        } = this.props;

        const onEdit = () => {
            if (this.state.editing) {
                handleSave(id, this.state.text);
                this.setState({ editing: false });
                return;
            } else {
                this.setState({ editing: true });
            }
            
        };
        
        let completedButton = cn({
            completedButton: true,
            completedButton_true: completed,
            completedButton_false: !completed,
        });
        let editButton = cn({
            editButton: true,
            editButton_true: this.state.editing,
        });
        return (
            <li className='list-item'>
                { 
                    this.state.editing ?  //ми редагуємо чи ні?? editing true or false? за замовчуванням стоїть false
                        (<input      //якщо true то малюємо такий ІНПУТ
                        value={this.state.text}  //цей text приходить з айтема в пропсах
                        onChange={(e) => this.setState({ text: e.target.value })} //реагуємо на тайпання
                        />) 
                    : 
                    completed ? //якщо editing==false, тобто не редагуємо то перевірка чи виконано? (completed: false з пропсів)
                    (<span className='completedItem' onClick={() => onEdit()}>{text}</span>) : //якщо completed: true, тобто виконано то перекреслюємо
                    (<span className='item-usual' onClick={() => onEdit()}>{text}</span>  ) //якщо completed: false, то просто text, той що з пропсів
                }

                <button className={completedButton} onClick={() => handleComplete(id)}>
                {completed ? "Довиконувати" : "Зроблено"}
                </button>

                <button className='deleteButton' onClick={() => handleDelete(id)}>Видалити</button>

                <button className={editButton} 
                onClick={() => onEdit()}>
                {this.state.editing ? "Зберегти" : "Редагувати"}
                </button>
            </li>
        );
    }

}
export default ListItem;