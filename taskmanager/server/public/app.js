async function loadTasks() {
    try {
        const response = await fetch('http://localhost:3000/api/task');
        const tasks = await response.json();
        console.log(tasks);
    } catch (error) {
        console.error('Unable to get tasks');
    }
}

function renderTasks(tasks) {
    console.log(tasks)

    
}

window.addEventListener('DOMContentLoaded', loadTasks)