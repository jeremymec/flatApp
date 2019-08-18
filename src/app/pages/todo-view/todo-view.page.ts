import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {RestService, TodoItem} from '../../services/rest.service';
import {AuthenticationService} from '../../services/authentication.service';
import {AlertController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-todo-view',
  templateUrl: './todo-view.page.html',
  styleUrls: ['./todo-view.page.scss'],
})
export class TodoViewPage implements OnInit {

  private todoItems: TodoItem[];

  constructor(private restService: RestService, private authService: AuthenticationService, private alertController: AlertController,
              public toastController: ToastController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.updateModel();
    for (const item of this.todoItems) {
      item.selected = false;
    }
  }

  updateModel() {
    console.log('Model Updated');
    const userId = this.authService.userDetails().uid;
    const todoItemsObservable = this.restService.getTodosByUserId(userId);
    todoItemsObservable.subscribe(items => {
      this.todoItems = items;
    });
  }

  async presentToastCreated() {
    const toast = await this.toastController.create({
      message: 'Task created!',
      duration: 2000
    });
    toast.present();
  }

  async presentAlertCreate() {
    const alert = await this.alertController.create({
      header: 'Create a new Task',
      inputs: [
        {
          name: 'name1',
          type: 'text',
          placeholder: 'Task Name'
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
            const itemToCreate = new TodoItem({content: data.name1});
            const userId = this.authService.userDetails().uid;
            this.restService.createTodoItem(userId, itemToCreate).subscribe(() => this.updateModel());
            this.presentToastCreated();
          }
        }
      ]
    });

    await alert.present();
  }

  doneButtonCallback() {
    const userId = this.authService.userDetails().uid;
    for (const item of this.todoItems) {
      if (item.selected) {
        this.restService.removeTodoItem(userId, item.id).subscribe(() => this.updateModel());
      }
    }
  }

}
