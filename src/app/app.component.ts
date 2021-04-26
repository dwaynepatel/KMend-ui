import { Component } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tech-test-ui';

  userList: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers();

    this.userService.getUsers().subscribe(result => {
      this.userList = result;
    },
    err => {
      console.error('error loading', err);
    }
  );
  } 

}