import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardHeader, IonGrid, IonLabel, IonCardTitle,
   IonCol, IonCard, IonInput, IonRow, IonCardContent, IonItem, IonButton, IonText } from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonText, IonCardContent, IonCard, IonCol, IonCardTitle, IonGrid, IonCardHeader, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
     IonLabel, IonInput, IonRow, IonItem, IonButton, ReactiveFormsModule]
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router:Router) {
    // Create the form structure
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const credentials = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password
      };

      this.http.post('http://localhost:3080/users/login', credentials)
        .subscribe(
          response => {
            console.log('Login successful', response);
            this.router.navigate(['/tabs/calendar']);
            const tokn = (response as {token : string}).token;
            localStorage.setItem('token', tokn);
            console.log("token: ", tokn);
            //alert('Login successful!');
          },
          error => {
            console.error('Login error', error);
            alert('Login failed. Please try again.');
          }
        );
    } else {
      alert('Please fill out the form correctly.');
    }
  }
}

