import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  public loginForm: FormGroup; 

  constructor(
    private formBuilder: FormBuilder,
    private router: Router, 
    private userService: UserService
  ) { }
  
  public get userTerm(): AbstractControl{
    return this.loginForm.controls.userTerm;
  }

  public get passwordTerm(): AbstractControl{
    return this.loginForm.controls.passwordTerm;
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userTerm: [
        '', 
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(255)
        ])
      ],
      passwordTerm: [
        '', 
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(255)
        ])
      ]
    });
  }

  public doLogin(): void {
    //local persistance of user
    if (this.userService.authenticate(this.loginForm.value)) {
      this.router.navigate(['home']);
    } else {
      //todo
      this.userTerm.setValue('');
      this.passwordTerm.setValue('');

    }
  }

}
