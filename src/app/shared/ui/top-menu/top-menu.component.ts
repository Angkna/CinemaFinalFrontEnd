import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { Subscription } from 'rxjs';
import { UserInterface } from 'src/app/core/models/user-interface';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {
  
  public user: UserInterface;
  //private authentificatedSubsciption: Subscription;

  constructor(private userService: UserService) { }

  ngOnInit(): void {    
    //this.authentificatedSubsciption = 
    this.userService.userSubject$.subscribe((user: UserInterface) => {
      this.user = user;
    });
  }

  public doLogout():void {
    console.log('déconnection');
    this.userService.logout();
  }


}
