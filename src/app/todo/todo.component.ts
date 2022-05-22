import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop'
import { format } from 'date-fns';
import { TodoService } from '../todo.service';
import { TodoData } from '../store/todo';

interface TodoDataDisplay{
  title: string;
  userId:number;
  completed:boolean;
  expiredDate: string;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todo: TodoDataDisplay[] = [];
  inprogress: TodoDataDisplay[] = [];
  completed: TodoDataDisplay[] = [];
  todoForm !: FormGroup;
  todoInput = {
    title:"",
    expiredDate: new Date(Date.now())
  }
  constructor(private formBuilder: FormBuilder, private todoService: TodoService) { }
  drop(event: CdkDragDrop<TodoDataDisplay[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  ngOnInit(): void {
    this.todoForm = this.formBuilder.group({
      title: ['', Validators.required],
      date: ['',Validators.required]
    })
    this.todoService.getTodos().subscribe(data=>{
      this.todo = data.map((todo: TodoData)=>{
        const {completed,title,userId} = todo;
        return {
          completed,
          expiredDate: format(new Date(Date.now()),"dd/MM/yyyy HH:mm"),
          title,
          userId
        }
      })
    })
  }

  addTask(event: SubmitEvent){
    event.preventDefault();
    this.todo.push({
      expiredDate: format(this.todoInput.expiredDate,"dd/MM/yyyy HH:mm"),
      title: this.todoForm.value.title,
      completed:false,
      userId:1
    })
  }

}
