// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Grafico } from './pages/graficos/grafico'; // Para a rota padrão
import { Login } from './pages/login/login';
import { Cadastro } from './pages/cadastro/cadastro';
import { Home } from './pages/home/home';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: Login,
    data: { animation: 'Login' }, // Identificador para a animação de Login
  },
  {
    path: 'cadastro',
    component: Cadastro,
    data: { animation: 'Cadastro' }, // Identificador para a animação de Cadastro
  },
  {
    path: 'home',
    component: Home,
    canActivate: [AuthGuard], // Adicione o guarda aqui!
  },
  {
    path: 'graficos',
    component: Grafico,
    canActivate: [AuthGuard],
  },
  // Se você tiver outras rotas, adicione-as aqui com 'data: { animation: "Nome" }'
  // { path: '**', redirectTo: '/login' }, // Exemplo de rota curinga
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Use forRoot para o módulo de rotas raiz
  exports: [RouterModule],
})
export class AppRoutingModule {}
