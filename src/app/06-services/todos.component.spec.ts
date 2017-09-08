import { TodosComponent } from './todos.component'; 
import { TodoService } from './todo.service'; 
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let service: TodoService;

  beforeEach(() => {
    service = new TodoService(null);
    component = new TodosComponent(service);
  });

  it('should set the todos property with the itens returned from service', () => {
    let todos = [1, 2, 3];
    spyOn(service, 'getTodos').and.callFake(() => {
      return Observable.from([todos]);
    })

    component.ngOnInit();

    // expect(component.todos.length).toBe(3);
    // expect(component.todos.length).toBeGreaterThan(0);
    expect(component.todos).toBe(todos);

  });

  it('should call the server to save the chages when a new todo is add', () => {
    let spyon = spyOn(service, 'add').and.callFake(() => {
      return Observable.empty();
    });

    component.add();

    expect(spyon).toHaveBeenCalled();
  });
  
  it('should add the new todo returned from server', () => {
    let todo = { id: 1};
    let spyon = spyOn(service, 'add').and.returnValue(Observable.from([todo]));

    component.add();

    expect(component.todos.indexOf(todo)).toBeGreaterThan(-1);
  });
  
  it('should set a error property when the server throw a error', () => {    
    let errorMessage = 'Error from server';
    let spyon = spyOn(service, 'add').and.returnValue(Observable.throw(errorMessage));

    component.add();

    expect(component.message).toBe(errorMessage);
  });

  it('should delete todo item if the user confirm', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    let spyon = spyOn(service, 'delete').and.returnValue(Observable.empty());

    component.delete(1);

    expect(spyon).toHaveBeenCalledWith(1);
  });

  xit('should NOT delete todo item if the user cancel', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    let spyon = spyOn(service, 'delete').and.returnValue(Observable.empty());

    component.delete(1);

    expect(spyon).not.toHaveBeenCalledWith(1);
  });

});