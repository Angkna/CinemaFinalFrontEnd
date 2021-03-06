import { Component, OnInit } from '@angular/core';
import { UserInterface } from 'src/app/core/models/user-interface';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpResponse } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { User } from 'src/app/core/models/user';
import { encode } from 'punycode';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  hide = true;
  public user: User;
  public userUpdate: User;
  public editForm: FormGroup;
  public userName: string;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((datas: any) => {
      this.userName = datas.username;

      this.userService.ByUsername(datas.username).subscribe((user: User) => {
        this.user = user;
        this.editForm = this.formBuilder.group({
          editFirstName: [
            this.user.firstName, //valeur par defaut
            Validators.compose([
              Validators.required,
              Validators.minLength(2),
              Validators.maxLength(255)
            ])
          ],
          editLastName: [
            this.user.lastName, //valeur par defaut
            Validators.compose([
              Validators.required,
            ])
          ],
          editUsername: [
            this.user.userName, //valeur par defaut
            Validators.compose([
              Validators.required,
              Validators.minLength(2),
              Validators.maxLength(255)
            ])
          ],
          editPassword: [
            this.user.password = null,
             //valeur par defaut
            Validators.compose([
              Validators.required,
              Validators.minLength(2),
              Validators.maxLength(255)
            ])
          ],
          editEmail: [
            this.user.email, //valeur par defaut
            Validators.compose([
              Validators.required,
              Validators.minLength(2),
              Validators.maxLength(255)
            ])
          ]
        });
      });
    });
  }

  public get editFirstName(): AbstractControl {
      return this.editForm.controls.editFirstName;
    }
  public get editLastName(): AbstractControl {
      return this.editForm.controls.editLastName;
    }
  public get editUsername(): AbstractControl {
      return this.editForm.controls.editUsername;
    }
  public get editPassword(): AbstractControl {
      return this.editForm.controls.editPassword;
    }
  public get editEmail(): AbstractControl {
      return this.editForm.controls.editEmail;
    }

  public updateUser(): void {
    console.log('uptate il faudrait')
    this.userUpdate = this.user;
    this.userUpdate.firstName = this.editFirstName.value;
    this.userUpdate.lastName = this.editLastName.value;
    this.userUpdate.userName = this.editUsername.value;
    this.userUpdate.password = this.editPassword.value;
    this.userUpdate.email = this.editEmail.value;
    this.userService.modifyUser(this.userUpdate).pipe(take(1)).subscribe((response: HttpResponse<any>) => { });
  }


  // public deleteUser(): void {
  //   this._snackBar.open("Etes vous sure de vouloir supprimer cette personne ? Cette action ne pourra pas être annulée.", "Confirmation", {
  //     duration: 4000,
  //     verticalPosition: 'top'
  //   }).onAction().pipe(take(1)).subscribe(() => {
  //     this.userService.delete(this.user).pipe(take(1)).subscribe(() => this.router.navigate(['home']));
  //   })
  // }

  public returnToUserPage(): void {
      console.log("je retourne à ma page de mon user");
      this.router.navigate([`user/${this.user.userName}`]);
    }
}
