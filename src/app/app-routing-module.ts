import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { AuthGuard } from './auth.guard'; // Importe seu guarda de rota

const routes: Routes = [
  { path: 'login', component: Login },
  {
    path: 'home',
    component: Home,
    canActivate: [AuthGuard], // Adicione o guarda aqui!
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
