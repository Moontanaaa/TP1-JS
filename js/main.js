// Tâches initiales demandée ^par l'exercice 
const tasks = JSON.parse(localStorage.getItem('tasks')) || [
    { title: "Apprendre mon cours de JavaScript", priority: 1 },
    { title: "Créer mon compte Github", priority: 2 },
    { title: "Répondre à mes emails", priority: 3 },
];

// Toutes les constantes
const taskList = document.getElementById('tasks');
const taskForm = document.getElementById('task-form');
const taskTitle = document.getElementById('task-title');
const taskPriority = document.getElementById('task-priority');
const deleteTasksBtn = document.getElementById('delete-tasks');

// Afficher les tâches dans le dom
function displayTasks() {
    taskList.innerHTML = '';
    tasks
        .sort((a, b) => a.priority - b.priority) // Tri des tâches par priorité rouge > vert > bleu
        .forEach((task, index) => {
            const li = document.createElement('li'); // créer un élément li
            li.classList.add(`priority-${task.priority}`);
            li.innerHTML = `
                <label>
                    <input type="checkbox" data-index="${index}">
                    ${task.title}
                </label>`;
            taskList.appendChild(li);
        });
}

// Ajouter une tâche avec push et l'évent submit
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = taskTitle.value.trim();
    const priority = parseInt(taskPriority.value, 10);

    if (title) {
        tasks.push({ title, priority });
        taskTitle.value = '';
        taskPriority.value = '1';
        saveTasks();
        displayTasks();
    }
});

// Event avec click pour supprimer les taches cochées avec deleteTaskBtn
deleteTasksBtn.addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('#tasks input[type="checkbox"]');
    const initialLength = tasks.length;

    // Filtrer les tâches non cochées
    const remainingTasks = tasks.filter((_, index) => {
        const checkbox = checkboxes[index];
        return !checkbox.checked;
    });

    const tasksDeleted = initialLength - remainingTasks.length;

    // Mettre à jour la liste et afficher une notification
    tasks.length = 0;
    tasks.push(...remainingTasks);
    saveTasks();
    displayTasks();

    if (tasksDeleted > 0) {
        showNotification(`${tasksDeleted} tâche(s) supprimée(s) avec succès`);
    }
});

// Sauvegarde du localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Chargement du LocaleStorage
function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
        tasks.length = 0;
        tasks.push(...storedTasks);
    }
}

// Afficher une notification en haut a droite de l'écran en orange
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style = `
        position: fixed;
        top: 10px;
        right: 10px;
        background: orange;
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
        z-index: 1000;
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// Initialisation avec l'évenement load
window.addEventListener('load', () => {
    loadTasks();
    displayTasks();
});
