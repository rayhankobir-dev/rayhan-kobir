export function createNewTask(task) {
    try {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        return { success: true, message: 'Registration successful', data: tasks };
    } catch(err) { 
        console.log(err);
        return {success: false, message: 'Failed to add new task!', data: []};
    } 
}

export function getAllTasks() {
    try {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        return { success: true, message: 'OK', data: tasks };
    } catch(err) { 
        console.log(err);
        return {success: false, message: 'Failed to fetch tasks!', data: []};
    } 
}

export function getTaskById(id) {
    try {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const task = tasks.find(element => element.id.valueOf() === id.valueOf());
        return task;
    } catch(err) {
        return null
    }
}

export function upDateTask() {
    
}