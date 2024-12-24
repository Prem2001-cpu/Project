import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task.model';
import { TaskModalComponent } from '../task-modal/task-modal.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  displayedColumns: string[] = ['title', 'priority', 'status', 'actions'];
  dataSource = new MatTableDataSource<Task>();
  filterStatus: string = '';

  constructor(private taskService: TaskService, private dialog: MatDialog) {}

  ngOnInit() {
    this.dataSource.filterPredicate = (task: Task, filter: string) => {
      if (!filter) {
        return true; 
      }
      return task.status.toLowerCase() === filter; 
    };

   
    this.taskService.tasks$.subscribe((tasks) => {
      this.dataSource.data = tasks;
      this.applyFilter(); 
    });
  }

  applyFilter() {
    this.dataSource.filter = this.filterStatus.trim().toLowerCase();
  }

  openModal(task?: Task) {
    const dialogRef = this.dialog.open(TaskModalComponent, {
      width: '400px',
      data: task || null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        task
          ? this.taskService.updateTask(result)
          : this.taskService.addTask(result);
      }
    });
  }

  deleteTask(id: number) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id);
    }
  }
}
