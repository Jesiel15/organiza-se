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
      emailUser: [
        { value: '', disabled: true },
        [Validators.email, Validators.required],
      ],
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
    let updateSent = false;
    const token = localStorage.getItem('token');

    if (!token) {
      console.warn('Token não encontrado. Redirecionando para login.');
      this.router.navigate(['/login']);
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    const nameControl = this.userForm.get('nameUser');
    const emailControl = this.userForm.get('emailUser');

    const nameEnabled = nameControl?.enabled;
    const emailEnabled = emailControl?.enabled;

    // VERIFICA SE PELO MENOS UM DOS CAMPOS (NOME/EMAIL) ESTÁ HABILITADO
    if (nameEnabled || emailEnabled) {
      // Se estiver habilitado, verificamos se os valores são válidos
      const isNameValid =
        !nameEnabled ||
        (nameControl?.value.trim().length > 0 && nameControl.valid);
      const isEmailValid =
        !emailEnabled ||
        (emailControl?.value.trim().length > 0 && emailControl.valid);

      if (isNameValid && isEmailValid) {
        updateSent = true;
        const payload: any = {};
        // Adiciona apenas os valores que foram habilitados
        if (nameEnabled) {
          payload.name = nameControl?.value;
        }
        if (emailEnabled) {
          payload.email = emailControl?.value;
        }

        // A requisição só é enviada se houver pelo menos um campo habilitado E com valor
        if (Object.keys(payload).length > 0) {
          this.http
            .patch<any>(`${environmentDev.apiUrl}/user/emailname`, payload, {
              headers,
            })
            .subscribe({
              next: (response) => {
                alert('Perfil atualizado com sucesso! (Nome/Email)');

                // Salva novo token no localStorage
                if (response.token) {
                  localStorage.setItem('token', response.token);
                }

                this.userForm.get('nameUser')?.disable();
                this.userForm.get('emailUser')?.disable();
              },
              error: (err) => {
                console.error('Erro na atualização de Nome/Email:', err);
                alert(
                  `Erro ao atualizar Nome/Email: ${
                    err.error?.msg || 'Erro desconhecido'
                  }`
                );
              },
            });
        }
      } else {
        alert('Preencha corretamente os campos habilitados (Nome e Email).');
        return;
      }
    }

    const passwordControl = this.userForm.get('passwordUser');
    const newPasswordControl = this.userForm.get('newPasswordUser');
    const confirmPasswordControl = this.userForm.get('confirmPasswordUser');

    // VERIFICA SE PELO MENOS O CAMPO DA SENHA ATUAL ESTÁ HABILITADO
    if (passwordControl?.enabled) {
      if (
        passwordControl.valid &&
        newPasswordControl?.valid &&
        confirmPasswordControl?.valid
      ) {
        if (newPasswordControl.value !== confirmPasswordControl.value) {
          alert('A nova senha e a confirmação de senha não coincidem.');
          return;
        }
        updateSent = true;
        const passwordPayload = {
          password: passwordControl.value,
          newPassword: newPasswordControl.value,
        };

        this.http
          .put<any>(`${environmentDev.apiUrl}/user/password`, passwordPayload, {
            headers: headers,
          })
          .subscribe({
            next: () => {
              alert(
                'Senha atualizada com sucesso! Por favor, faça login novamente.'
              );
              this.authService.logout();
              this.router.navigate(['/login']);
            },
            error: (err) => {
              console.error('Erro na atualização de Senha:', err);
              alert(
                `Erro ao atualizar senha: ${
                  err.error?.msg || 'Erro desconhecido'
                }`
              );
              passwordControl.reset();
              newPasswordControl?.reset();
              confirmPasswordControl?.reset();
            },
          });
      } else {
        alert('Preencha corretamente os três campos de senha.');
        return; // Interrompe se a validação de senha falhar
      }
    }

    if (!updateSent) {
      console.log('Nenhum campo habilitado/preenchido para atualização.');
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

  resetPasswordsInput() {
    this.userForm.get('passwordUser')?.reset();
    this.userForm.get('newPasswordUser')?.reset();
    this.userForm.get('confirmPasswordUser')?.reset();
  }

  disableAllInput() {
    this.userForm.get('nameUser')?.disable();
    this.userForm.get('emailUser')?.disable();
    this.userForm.get('passwordUser')?.disable();
    this.userForm.get('newPasswordUser')?.disable();
    this.userForm.get('confirmPasswordUser')?.disable();
  }

  cancelar() {
    this.disableAllInput();
    this.resetPasswordsInput();
    this.loadUserData();
  }
}
