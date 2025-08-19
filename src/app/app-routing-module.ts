// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Grafico } from './pages/graficos/grafico';
import { Login } from './pages/login/login';
import { Cadastro } from './pages/cadastro/cadastro';
import { Home } from './pages/home/home';
import { AuthGuard } from './auth.guard';
import { AdicionarDespesas } from './pages/adicionar-despesas/adicionar-despesas';
import { AdicionarReceitas } from './pages/adicionar-receitas/adicionar-receitas';
import { EditarDespesas } from './pages/editar-despesas/editar-despesas';
import { EditarReceitas } from './pages/editar-receitas/editar-receitas';
import { Configuracoes } from './pages/configuracoes/configuracoes';

const routes: Routes = [
  {
    path: '',
    component: Login,
    data: { animation: 'Login' },
  },
  {
    path: 'cadastro',
    component: Cadastro,
    data: { animation: 'Cadastro' },
  },
  {
    path: 'home',
    component: Home,
    canActivate: [AuthGuard],
  },
  {
    path: 'graficos',
    component: Grafico,
    canActivate: [AuthGuard],
  },
  {
    path: 'configuracoes',
    component: Configuracoes,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-despesa',
    component: AdicionarDespesas,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-receita',
    component: AdicionarReceitas,
    canActivate: [AuthGuard],
  },
  {
    path: 'editar-despesa/:monthYear/:expenseId',
    component: EditarDespesas,
    canActivate: [AuthGuard],
  },
  {
    path: 'editar-receita/:monthYear/:revenueId',
    component: EditarReceitas,
    canActivate: [AuthGuard],
  },
  // Rota curinga para redirecionar URLs desconhecidas para login (opcional)
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
