import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  error: string | null = null;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      appPassword: ['', Validators.required]
    });
  }

  submit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.error = null;
    this.loading = true;
    const { username, appPassword } = this.loginForm.value;
    const userlogin = this.auth.login(username, appPassword);
    userlogin.subscribe({
      next: (response) => {
        if(response.error){
           this.error = 'Invalid credentials';
            this.loading = false;
        }else{
            this.router.navigate(['/posts']);
             this.loading = false;
        }
      },
      error: (err) => {
         this.loading = false;
        //console.log(err.error);
      } 
    })

  }
}
