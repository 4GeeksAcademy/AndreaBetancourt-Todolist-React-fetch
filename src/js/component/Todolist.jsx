import React, { useEffect, useState } from "react";

export const Todolist = () => {

    //1. Agrego el fetch
    const [todos, setTodo] = useState();
    const host = 'https://jsonplaceholder.typicode.com';
    const url = host + '/todos';

    const fetchTodos = async () => {
        const request = {
            method: 'GET',
            redirect: 'follow'
        };

        const response = await fetch(url, request)
        if (response.ok) {
            const data = await response.json();
            setTodo(data)
        } else {
            console.log('Error: ', response.status, response.statusText);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <div className="container">
            <h1 className="text-center">Consumiendo API</h1>
            <p className="text-center"> Fuente: {url} </p>
            <ul className="list-group">
                {!todos ? 'Cargando...' :
                    todos.map((todo, index) => {
                        return <li className="list-group-item form-control d-flex justify-content-between" key={index}>
                            {todo.id}.  {todo.title}. UserId: {todo.userId}
                            {todo.completed ? (<span className="delete-icon"><i className="fas fa-solid fa-check"></i></span>) :
                            (<span className="delete-icon"><i className="fas fa-spinner"></i></span>)}
                            </li>
                    })
                }
            </ul>
        </div>
    );
}