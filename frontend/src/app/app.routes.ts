import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { CreateComponent } from './pages/create/create.component';
import { HomeComponent } from './pages/home/home.component';
import { ReportComponent } from './pages/report/report.component';

export const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'home', component: HomeComponent },
  { path: 'create', component: CreateComponent },
  { path: 'report', component: ReportComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

export class AppRoutingModule {}
