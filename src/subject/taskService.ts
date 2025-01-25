import { Subject } from "rxjs";

interface Task {
  id: number;
  description: string;
  completed: boolean;
}

class TaskService {
  private tasksSubject = new Subject<Task[]>();
  private tasks: Task[] = [];

  get tasks$() {
    return this.tasksSubject.asObservable();
  }

  addTask(task: Task) {
    this.tasks.push(task);
    this.tasksSubject.next(this.tasks); // Уведомляем подписчиков об изменении
  }

  removeTask(taskId: number) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    this.tasksSubject.next(this.tasks); // Уведомляем подписчиков об изменении
  }
}

const taskService = new TaskService();

taskService.tasks$.subscribe((tasks) => {
  console.log("Updated Task List:", tasks);
})

function addNewTask(description: string) {
  const newTask: Task = {
    id: Date.now(),
    description,
    completed: false,
  };
  taskService.addTask(newTask);
}

function deleteTask(taskId: number) {
  taskService.removeTask(taskId);
}

addNewTask("Learn RxJS");
addNewTask("Write TypeScript code");
setTimeout(() => addNewTask("Master Subject in RxJS"), 2000);
deleteTask(1737823471659);
