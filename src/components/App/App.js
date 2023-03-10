import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Header from '../Header';
import TaskList from '../TaskList';
import NewTaskForm from '../NewTaskForm';
import Footer from '../Footer';
import './App.css';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todoData: [],
            filter: 'All',
        };
    }

    deleteTask = (id) => {
        this.setState(({ todoData }) => {
            const index = todoData.findIndex((el) => el.id === id);

            const newData = [
                ...todoData.slice(0, index),
                ...todoData.slice(index + 1),
            ];

            return {
                todoData: newData,
            };
        });
    };

    addTask = (text) => {
        const { todoData } = this.state;
        const newTask = {
            label: text,
            id: uuidv4(),
            completed: false,
            date: new Date(),
        };
        this.setState(() => {
            const newData = [...todoData, newTask];
            return {
                todoData: newData,
            };
        });
    };

    onToggleCompleted = (id) => {
        this.setState(() => ({
            todoData: this.toggleProperty(id, 'completed'),
        }));
    };

    changeName = (id, text) => {
        this.setState(({ todoData }) => {
            const index = todoData.findIndex((el) => el.id === id);
            const oldItem = todoData[index];

            const newItem = { ...oldItem, label: text };

            const newData = [
                ...todoData.slice(0, index),
                newItem,
                ...todoData.slice(index + 1),
            ];

            return {
                todoData: newData,
            };
        });
    };

    changeStatefilter = (label) => {
        this.setState(() => {
            const newFilter = label;
            return {
                filter: newFilter,
            };
        });
    };

    clearCompleted = () => {
        this.setState(({ todoData }) => {
            const activeTasks = todoData.filter((task) => !task.completed);
            return {
                todoData: activeTasks,
            };
        });
    };

    toggleProperty(id, propName) {
        const { todoData } = this.state;
        const index = todoData.findIndex((el) => el.id === id);
        const oldItem = todoData[index];
        const newItem = {
            ...oldItem,
            [propName]: !oldItem[propName],
        };
        return [
            ...todoData.slice(0, index),
            newItem,
            ...todoData.slice(index + 1),
        ];
    }

    render() {
        const { todoData } = this.state;
        const completedTasks = todoData.filter((el) => el.completed).length;
        const todoTasks = todoData.length - completedTasks;

        let todoItemsShown;
        const { filter } = this.state;
        switch (filter) {
            case 'Completed':
                todoItemsShown = todoData.filter((el) => el.completed);
                break;
            case 'Active':
                todoItemsShown = todoData.filter((el) => !el.completed);
                break;
            default:
                todoItemsShown = todoData;
        }

        return (
            <section className='todoapp'>
                <Header />
                <NewTaskForm onTaskAdded={this.addTask} />
                <section className='main'>
                    <TaskList
                        todos={todoItemsShown}
                        onDeleted={this.deleteTask}
                        onToggleCompleted={this.onToggleCompleted}
                        onChangeName={this.changeName}
                    />
                    <Footer
                        todoTasks={todoTasks}
                        filter={filter}
                        onFilterChange={this.changeStatefilter}
                        onClearCompleted={this.clearCompleted}
                    />
                </section>
            </section>
        );
    }
}
