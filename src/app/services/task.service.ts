import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  private tasks: Task[] = [
    { id: 1, title: 'Task 1', priority: 'High', status: 'Pending' },
    { id: 2, title: 'Task 2', priority: 'Medium', status: 'In Progress' },
    { id: 3, title: 'Task 3', priority: 'Low', status: 'Completed' },
  ];

  constructor() {
    this.tasksSubject.next(this.tasks);
  }

  addTask(task: Task) {
    this.tasks.push(task);
    this.tasksSubject.next(this.tasks);
  }

  updateTask(updatedTask: Task) {
    const index = this.tasks.findIndex((task) => task.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
      this.tasksSubject.next(this.tasks);
    }
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.tasksSubject.next(this.tasks);
  }
}
