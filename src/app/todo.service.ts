import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { TodoData } from './store/todo';
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  url = "https://jsonplaceholder.typicode.com/todos"
  constructor(private httpClient: HttpClient) {}
  getTodos(): Observable<TodoData[]>{
    return this.httpClient.get<TodoData[]>(this.url);
  }
}
