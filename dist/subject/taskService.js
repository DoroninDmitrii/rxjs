import { Subject } from "rxjs";
class TaskService {
    constructor() {
        this.tasksSubject = new Subject();
        this.tasks = [];
    }
    get tasks$() {
        return this.tasksSubject.asObservable();
    }
    addTask(task) {
        this.tasks.push(task);
        this.tasksSubject.next(this.tasks); // Уведомляем подписчиков об изменении
    }
    removeTask(taskId) {
        this.tasks = this.tasks.filter((task) => task.id !== taskId);
        this.tasksSubject.next(this.tasks); // Уведомляем подписчиков об изменении
    }
}
const taskService = new TaskService();
taskService.tasks$.subscribe((tasks) => {
    console.log("Updated Task List:", tasks);
});
function addNewTask(description) {
    const newTask = {
        id: Date.now(),
        description,
        completed: false,
    };
    taskService.addTask(newTask);
}
function deleteTask(taskId) {
    taskService.removeTask(taskId);
}
addNewTask("Learn RxJS");
addNewTask("Write TypeScript code");
setTimeout(() => addNewTask("Master Subject in RxJS"), 2000);
deleteTask(1737823471659);
