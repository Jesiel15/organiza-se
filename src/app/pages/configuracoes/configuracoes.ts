import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environmentDev } from '../../utils/environment';

@Component({
  selector: 'app-configuracoes',
  standalone: false,
  templateUrl: './configuracoes.html',
  styleUrl: './configuracoes.scss',
})
export class Configuracoes implements OnInit {
  userForm: FormGroup;
  currentUser: any;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.userForm = this.fb.group({
      nameUser: [{ value: '', disabled: true }, [Validators.required]],
      emailUser: [{ value: '', disabled: true }, [Validators.email]],
      passwordUser: [{ value: '', disabled: true }, [Validators.required]],
      newPasswordUser: [{ value: '', disabled: true }, [Validators.required]],
      confirmPasswordUser: [
        { value: '', disabled: true },
        [Validators.required],
      ],
    });
  }
  ngOnInit(): void {
    this.loadUserData();
  }

  onUpdate() {
    if (
      this.userForm.get('nameUser')?.enabled ||
      this.userForm.get('emailUser')?.enabled
    ) {
      const nameControl = this.userForm.get('nameUser');
      const emailControl = this.userForm.get('emailUser');

      const nameEnabledAndWithValue =
        nameControl?.enabled && nameControl.value.trim().length > 0;
      const emailEnabledAndWithValue =
        emailControl?.enabled && emailControl.value.trim().length > 0;

      if (nameEnabledAndWithValue || emailEnabledAndWithValue) {
        if (this.userForm.valid) {
          const token = localStorage.getItem('token');
          if (!token) {
            console.warn('Token não encontrado.');
            return;
          }

          const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          });

          const payload: any = {};

          if (nameEnabledAndWithValue) {
            payload.name = nameControl?.value;
          }
          if (emailEnabledAndWithValue) {
            payload.email = emailControl?.value;
          }

          this.http
            .patch<any>(`${environmentDev.apiUrl}/user/emailname`, payload, {
              headers: headers,
            })
            .subscribe({
              next: (res) => {
                alert('Perfil atualizado com sucesso! (Nome/Email)');
                this.userForm.get('nameUser')?.disable();
                this.userForm.get('emailUser')?.disable();
              },
              error: (err) => {
                console.error('Erro na atualização:', err);
                const errorMessage =
                  err.error?.msg || 'Erro desconhecido ao atualizar.';
                alert(`Erro: ${errorMessage}`);
              },
            });
        } else {
          alert(
            'Os dados preenchidos não são válidos. Verifique o formato do email.'
          );
        }
      } else {
        alert(
          'Preencha um valor válido nos campos habilitados (Nome ou Email) para atualizar.'
        );
      }
    } else {
      console.log('Nenhum campo de nome ou email habilitado para atualização.');
    }
  }

  private loadUserData() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    this.currentUser = this.authService.getLoggedInUser();

    if (this.currentUser) {
      console.log('Configuração Usuário logado: ', this.currentUser);
      this.userForm.get('nameUser')?.setValue(this.currentUser.name);
      this.userForm.get('emailUser')?.setValue(this.currentUser.email);
    } else {
      console.log('Nenhum usuário logado ou token inválido.');
    }
  }

  enableNameInput() {
    this.userForm.get('nameUser')?.enable();
  }

  enableEmailInput() {
    this.userForm.get('emailUser')?.enable();
  }

  enablePasswordsInput() {
    this.userForm.get('passwordUser')?.enable();
    this.userForm.get('newPasswordUser')?.enable();
    this.userForm.get('confirmPasswordUser')?.enable();
  }
}
