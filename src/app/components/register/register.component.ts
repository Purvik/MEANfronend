import { Component, OnInit } from '@angular/core';
import { ValidateService}  from '../../services/validate.service'; 
import { AuthService }  from '../../services/auth.service'; 
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private validateService: ValidateService, 
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }

    if(!this.validateService.validateRegister(user)){
      // console.log("Provide all the information");
      this.flashMessage.show("Provide all the information", { cssClass: 'alert-danger', timeout: 2000 });
      return false;
    }

    if(!this.validateService.validateEmail(user.email)){
      //console.log("Provide Valid Email Address");
      this.flashMessage.show("Provide Valid Email Address", { cssClass: 'alert-danger', timeout: 2000 });
      return false;
    }

    //Register User
    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        this.flashMessage.show("User Registeration Done and can login.", { cssClass: 'alert-success', timeout: 2000 });
        this.router.navigate(['/login']);
      }else{
        this.flashMessage.show("Something went wrong..", { cssClass: 'alert-danger', timeout: 2000 });
        this.router.navigate(['/register']);

      }
    });
    
  }

}
