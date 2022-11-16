import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/_services/auth.service';
import { StorageService } from '../../shared/_services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  controlNames = {
    username: 'username',
    password: 'password',
  };
  controlValue = {
    username: '',
    password:'',
  };


  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, 
    private storageService: StorageService, 
    private builder:FormBuilder,
    private router:Router
    ) { }

  ngOnInit(): void {
    const me= this;
    me.initform();
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }
    

  }
  private initform():void {
    const me = this;
    me.loginForm = me.builder.group({
      [me.controlNames.username]:['',[Validators.required]],
      [me.controlNames.password]:['',[Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#\$%^&+=])(?=\\S+\$).{8,40}\$'),Validators.required]],
    },
    )
  }
  onSubmit(): void {
    const me=this;
    const data = {...me.loginForm.value}
    if(me.loginForm.valid) {
      me.authService.login(data).subscribe({
        next: data => {
          me.storageService.saveUser(data);
          me.isLoggedIn = true;
          me.roles = me.storageService.getUser().roles;
          me.router.navigate(['home']);
         

        },
        error: err => {
          me.errorMessage = err.error.message;
          me.isLoginFailed = true;
        }
      });
    }

    
  }

  reloadPage(): void {
    window.location.reload();
  }
}
