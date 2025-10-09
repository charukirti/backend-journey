const tasksContainer = document.querySelector('#tasksContainer');

const errorContainer = document.querySelector('#errorContainer');

const taskForm = document.querySelector('#taskForm');

let allTasks = [];
const api_url = 'http://localhost:3000/api/task';

async function loadTasks() {
    try {
        const response = await fetch(api_url);

        if (!response.ok) throw new Error('Unable to fetch tasks');
        const data = await response.json();
        allTasks = data.data;
        renderTasks();
    } catch (error) {
        console.log(error);
        console.error('Unable to get tasks');
    }
}

function renderTasks() {

    if (allTasks.length === 0) {
        tasksContainer.innerHTML = `<div>
    <h3>No tasks found</h3>
    <p>Add a task to get started</p>
    </div>`;

        return;
    }

    tasksContainer.innerHTML = `
    
    <div class="task-grid">
    ${allTasks.map(task => createTaskCard(task))}
    </div>
    
    `;
}

function createTaskCard(task) {
    const isCompleted = task.status === 'completed';
    return `
        <div class="task-card ${isCompleted ? 'completed' : ''}">
          <div class="task-header">
            <div class="task-title">${escapeHtml(task.title)}</div>
          </div>
          
          ${task.description ? `<div class="task-description">${escapeHtml(task.description)}</div>` : ''}
          
          <div class="task-meta">
            <span class="task-badge badge-priority-${task.priority}">
              ${task.priority.toUpperCase()}
            </span>
            <span class="task-badge badge-status ${isCompleted ? 'completed' : ''}">
              ${task.status.toUpperCase()}
            </span>
          </div>
          
          <div class="task-actions">
            ${!isCompleted ?
            `<button class="btn btn-success" onclick="toggleTaskStatus('${task._id || task.id}', 'completed')">✓ Complete</button>` :
            `<button class="btn btn-warning" onclick="toggleTaskStatus('${task._id || task.id}', 'pending')">↺ Reopen</button>`
        }
            <button class="btn btn-danger" onclick="deleteTask('${task._id || task.id}')">🗑 Delete</button>
          </div>
        </div>
      `;
}

// create new task

async function createNewTask() {

    const taskData = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        priority: document.getElementById('priority').value,
        status: 'pending'
    };

    try {
        const response = await fetch(api_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(taskData)

        });

        if (!response.ok) throw new Error('Unable to create new task');

        const data = await response.json();

        allTasks.push(data.data);
        console.log(data);
        renderTasks();

    } catch (error) {
        console.log(error);
    }

}




taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    createNewTask();
});


function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

loadTasks();