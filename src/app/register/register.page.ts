import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardHeader, IonGrid, IonLabel, IonCardTitle, IonCol, IonCard, IonInput, IonRow, IonCardContent, IonItem, IonButton, IonText } from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonText, IonCardContent, IonCard, IonCol, IonCardTitle, IonGrid, IonCardHeader, IonContent, IonHeader,
     IonTitle, IonToolbar, CommonModule, FormsModule, IonLabel, IonInput, IonRow, IonItem, IonButton, ReactiveFormsModule],
  providers: [HttpClient]
})
export class RegisterPage {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    // Create the form structure
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  onRegister() {
    if (this.registerForm.valid) {
      // Ensure password and confirm password match
      if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
        alert('Passwords do not match');
        return;
      }

      // Collect form data
      const userData = {
        username: this.registerForm.value.fullName,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
      };

      // Send data to backend
      this.http.post('http://localhost:3080/users/register', userData)
        .subscribe(
          response => {
            console.log('Registration successful', response);
            alert('Registration successful!');
          },
          error => {
            console.error('Registration error', error);
            alert('Registration failed. Please try again.');
          }
        );
    } else {
      alert('Please fill out the form correctly.');
    }
  }
}
