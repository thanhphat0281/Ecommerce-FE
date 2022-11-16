import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthService } from '../../shared/_services/auth.service';
import { MustMatch } from '../../shared/_helpers/must-match.validator';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  controlNames = {
    username: 'username',
    email: 'email',
    password: 'password',
    cpassword: 'cpassword',
  };
  controlValue = {
    username: '',
    email:'',
    password:'',
    cpassword:''
  };

  constructor(private authService: AuthService,private builder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    const me = this;
    me.initForm();
  }
  private initForm():void {
    const me = this;
    me.registerForm = me.builder.group({
      [me.controlNames.username]:['',[Validators.required]],
      [me.controlNames.email]:['',[Validators.email,Validators.required]],
      [me.controlNames.password]:['',[Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#\$%^&+=])(?=\\S+\$).{8,40}\$'),Validators.required]],
     
    },
      
    )
  }

  onSubmit(): void {
    const me= this
    const data = {...me.registerForm.value}
    if(me.registerForm.valid)
    {
      me.authService.register(data).subscribe({
        next:(res)=> {
          this.router.navigate(['home']);
          alert(res.message);
          this.registerForm.reset();
        },
        error:(err) => {
          alert(err.error.message);
        }
        
      })
    }

    // this.authService.register(username,imageUrl, email, password).subscribe({
    //   next: data => {
    //     console.log(data);
    //     this.isSuccessful = true;
    //     this.isSignUpFailed = false;
    //   },
    //   error: err => {
    //     this.errorMessage = err.error.message;
    //     this.isSignUpFailed = true;
    //   }
    // });
  }
}
