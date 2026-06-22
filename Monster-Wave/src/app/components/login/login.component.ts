import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';

import { AuthService } from '../../services/auth.service';
import { LoginCredentials } from '../../models/auth.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, InputTextModule, PasswordModule, ButtonModule, MessageModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly credentials = signal<LoginCredentials>({ username: '', password: '' });
  readonly loading = signal(false);
  readonly errorMessage = signal<string | null>(null);

  updateUsername(value: string): void {
    this.credentials.update(c => ({ ...c, username: value }));
  }

  updatePassword(value: string): void {
    this.credentials.update(c => ({ ...c, password: value }));
  }

  submit(): void {
    const { username, password } = this.credentials();
    if (!username || !password) {
      this.errorMessage.set('Informe usuário e senha.');
      return;
    }

    this.loading.set(true);
    this.errorMessage.set(null);

    this.auth.login(this.credentials()).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/tracker/list']);
      },
      error: () => {
        this.loading.set(false);
        this.errorMessage.set('Usuário ou senha inválidos.');
      }
    });
  }
}