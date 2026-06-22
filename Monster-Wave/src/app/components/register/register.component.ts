import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';

import { AuthService } from '../../services/auth.service';
import { RegisterPayload } from '../../models/auth.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, InputTextModule, PasswordModule, ButtonModule, MessageModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly form = signal<RegisterPayload & { confirmPassword: string }>({
    username: '',
    password: '',
    confirmPassword: ''
  });
  readonly loading = signal(false);
  readonly errorMessage = signal<string | null>(null);

  updateUsername(value: string): void {
    this.form.update(f => ({ ...f, username: value }));
  }

  updatePassword(value: string): void {
    this.form.update(f => ({ ...f, password: value }));
  }

  updateConfirmPassword(value: string): void {
    this.form.update(f => ({ ...f, confirmPassword: value }));
  }

  submit(): void {
    const { username, password, confirmPassword } = this.form();

    if (!username || !password || !confirmPassword) {
      this.errorMessage.set('Preencha todos os campos.');
      return;
    }

    if (password !== confirmPassword) {
      this.errorMessage.set('As senhas não coincidem.');
      return;
    }

    this.loading.set(true);
    this.errorMessage.set(null);

    this.auth.register({ username, password }).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/tracker/list']);
      },
      error: (err) => {
        this.loading.set(false);
        const backendError = err?.error?.username?.[0] || err?.error?.password?.[0];
        this.errorMessage.set(backendError ?? 'Não foi possível concluir o cadastro.');
      }
    });
  }
}