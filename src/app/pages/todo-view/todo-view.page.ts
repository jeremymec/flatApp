import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {RestService, TodoItem} from '../../services/rest.service';
import {AuthenticationService} from '../../services/authentication.service';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-todo-view',
  templateUrl: './todo-view.page.html',
  styleUrls: ['./todo-view.page.scss'],
})
export class TodoViewPage implements OnInit {

  private todoItems: Observable<TodoItem[]>;

  constructor(private restService: RestService, private authService: AuthenticationService, private alertController: AlertController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.updateModel();
  }

  updateModel() {
    const userId = this.authService.userDetails().uid;
    this.todoItems = this.restService.getTodosByUserId(userId);
    this.todoItems.subscribe();
  }

  async presentAlertCreate() {
    const alert = await this.alertController.create({
      header: 'Create a new Task',
      inputs: [
        {
          name: 'name1',
          type: 'text',
          placeholder: 'Task Name'
        },
        {
          name: 'name5',
          type: 'date'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Create',
          handler: data => {
            const itemToCreate = new TodoItem({content: data.name1, due_data: data.name5});
            const userId = this.authService.userDetails().uid;
            this.restService.createTodoItem(userId, itemToCreate).subscribe();
            this.updateModel();
          }
        }
      ]
    });

    await alert.present();
  }

}
