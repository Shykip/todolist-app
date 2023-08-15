import dateIcon from '../assets/images/date.png'
import dateRedIcon from '../assets/images/date_red.png'
import dateGreenIcon from '../assets/images/date_green.png'
import checkIcon from '../assets/images/check.png'
import editIcon from '../assets/images/edit.png'
import deleteIcon from '../assets/images/delete.png'
import { useState, useEffect } from 'react'
import axios from 'axios';
import React from 'react'

function Home(props){

    let [data, setData] = useState([])
    let userID = sessionStorage.getItem("user_id");

    function fetchData(){
        axios.get('http://127.0.0.1:8000/task/')
            .then(response => {
                setData(response.data)
            })
            .catch(error => {
                console.error('Error fetching data:', error)
        })
    }

    useEffect(() => {
        fetchData()
    }, [])

    const [page, setpage] = useState("view")

    const [editItem, setEditItem] = useState({
        id: -1,
        title: "",
        description: "",
        dueDate: ""
    })

    function handleEdit(id, title, description, due_date){
        setEditItem({
            id: id,
            title: title,
            description: description,
            dueDate: due_date
        })
        setpage("edit")
    }

    function handleStatusEdit(id, completed) {
        const updatedTask = {
            completed: !completed
        };
    
        axios.patch(`http://127.0.0.1:8000/task/${id}/`, updatedTask)
            .then(response => {
                console.log(response);
                fetchData(); // Assuming fetchData is a function to update the task list
            })
            .catch(error => {
                console.error('Error updating data:', error);
            });
    }

    function handleTaskEdit(event){
        //send task update

        event.preventDefault()

        let title = document.getElementById('edit_title').value
        let description = document.getElementById('edit_description').value
        let dueDate = document.getElementById('edit_dueDate').value
        let user_id = userID
        let id = editItem.id

        const updatedTask = {
            title: title,
            description: description,
            due_date: dueDate,
            user_id: user_id,
        };

        axios.put(`http://127.0.0.1:8000/task/${id}/`, updatedTask)
            .then(response => {
                console.log(response)
                fetchData()
            })
            .catch(error => {
                console.error('Error posting data:', error)
        })

        setpage("view")
    }

    function handleCreateTask(event){
        event.preventDefault()

        //send new task
        let title = document.getElementById('create_title').value
        let description = document.getElementById('create_description').value
        let dueDate = document.getElementById('create_date').value
        let user_id = userID

        let formdata = new FormData()
        formdata.append("title", title)
        formdata.append("description", description)
        formdata.append("due_date", dueDate)
        formdata.append("user_id", user_id)

        axios.post('http://127.0.0.1:8000/task/create/', formdata)
            .then(response => {
                console.log(response)
                fetchData()
            })
            .catch(error => {
                console.error('Error posting data:', error)
        })

        setpage("view")

    }

    function handleLogout(){
        sessionStorage.removeItem('user_id');
        props.logout()
    }

    return (
        <>
            <div className="heading">
                <h1>Todo List <p onClick={handleLogout}>Logout</p></h1>
                <div className="menu">
                    {page == "view" ? <p className="onGlow">View</p> : <p onClick={() => setpage("view")}>View</p>}
                    {page == "create" ? <p className="onGlow">Create</p> : <p onClick={() => setpage("create")}>Create</p>}
                    {page == "edit" ? <p className="onGlow">Edit</p> : <p>Edit</p>}
                </div>
            </div>

            {page == "view" ?
                <div className="list_container">

                    {data.map((item) => {

                        const current_date = new Date()
                        const due_date = new Date(item.due_date)
                        const month_num = due_date.getMonth()
                        const day = due_date.getDate()
                        const monthNames = [
                            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                        ]
                        const month = monthNames[month_num]
                        const year = due_date.getFullYear()

                        return (
                            <React.Fragment  key={item.id}>  
                                {!item.completed && item.user_id == userID ?
                                    <div className="task">
                            
                                        <div className="task_heading">
                                            <h2>
                                                <div className="status" onClick={() => handleStatusEdit(item.id, item.completed)}></div>
                                                {item.title}
                                            </h2>
                                            <img src={editIcon} onClick={() => handleEdit(item.id, item.title, item.description, item.dueDate)} />
                                        </div>
                                        <p className="description">{item.description}</p>

                                        {due_date > current_date ?
                                            <div className="date"><img src={dateIcon} />{year + " " + month + " " + day}</div>
                                            :
                                            <div className="date_red"><img src={dateRedIcon} />{year + " " + month + " " + day}</div>
                                        }
                                        

                                    </div>
                                    :
                                    ""
                                }
                                
                            </React.Fragment>
                        )
                    })}

                    <p className="completed_tasks">Completed Tasks</p><hr />

                    {data.map((item) => {

                        const due_date = new Date(item.due_date)
                        const month_num = due_date.getMonth()
                        const day = due_date.getDate()
                        const monthNames = [
                            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                        ]
                        const month = monthNames[month_num]
                        const year = due_date.getFullYear()

                        return (
                            <React.Fragment  key={item.id}> 
                                {item.completed && item.user_id == userID ?
                                    <div className="task" key={item.id}>
                            
                                        <div className="task_heading">
                                            <h2>
                                                <div className="status"  onClick={() => handleStatusEdit(item.id, item.completed)}><img src={checkIcon} /></div>
                                                {item.title}
                                            </h2>
                                            <img src={editIcon} onClick={() => handleEdit(item.id, item.title, item.description, item.dueDate)} />
                                        </div>
                                        <p className="description">{item.description}</p>
                                        <div className="date_green"><img src={dateGreenIcon} />{year + " " + month + " " + day}</div>

                                    </div>
                                    :
                                    ""
                                }
                                
                            </React.Fragment>
                        )
                    })}

                </div>



            : page == "create" ?
                <div className="create_task">
                    <form action="" onSubmit={handleCreateTask}>
                        <label htmlFor="title">Title</label>
                        <input type="text" name='title' id='create_title' required />

                        <label htmlFor="description">Description</label>
                        <textarea name="description" id='create_description' cols="30" rows="5"></textarea>

                        <label htmlFor="dueDate">Due Date</label>
                        <input type="date" name='dueDate' id='create_date' required />

                        <button type='submit'>Create</button>
                    </form>
                </div>



            : page == "edit" ?
                <div className="edit_task">
                    <form action="" onSubmit={handleTaskEdit}>

                        <div className="edit_heading">
                            <div className="edit_heading_left">
                                <label htmlFor="title">Title</label>
                                <input type="text" name='title' id='edit_title' defaultValue={editItem.title}  required />
                            </div>
                            
                            <img src={deleteIcon} alt="" />
                        </div>

                        <label htmlFor="description">Description</label>
                        <textarea name="description"  id='edit_description' defaultValue={editItem.description} cols="30" rows="5"></textarea>

                        <label htmlFor="dueDate">Due Date</label>
                        <input type="date" name='dueDate'  id='edit_dueDate'  defaultValue={editItem.dueDate} required />

                        <button type='submit'>Edit</button>
                    </form>
                </div>
            : ""
            }
      
            
        </>
    )
}

export default Home