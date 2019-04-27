import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContentComponent } from './pages/content/content.component';
import { ServiceComponent } from './pages/content/service/service.component';
import { ServiceDetailComponent } from './pages/content/service/service-detail/service-detail.component';
import { IndustriesComponent } from './pages/content/industries/industries.component';
import { IndustriesDetailComponent } from './pages/content/industries/industries-detail/industries-detail.component';
import { ProductsComponent } from './pages/content/products/products.component';
import { ProductsDetailComponent } from './pages/content/products/products-detail/products-detail.component';
import { OrderComponent } from './pages/content/order/order.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ClientComponent } from './pages/client/client.component';
import { CareerComponent } from './pages/career/career.component';
import { OurTeamComponent } from './pages/our-team/our-team.component';
import { AdminComponent } from './pages/admin/admin.component';
import { LoginComponent } from './pages/admin/login/login.component';
import { AuthGuard } from './pages/admin/auth-guard.service';

const routes: Routes = [
  { path: 'admin', component: AdminComponent,  canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: '-', component: ContentComponent, children: [
      {
        path: 'services', component: ServiceComponent
      },
      {
        path: 'industries', component: IndustriesComponent
      },
      {
        path: 'products', component: ProductsComponent
      },
      {path: 'idetail', component:  IndustriesDetailComponent},
      { path: 'sdetail', component: ServiceDetailComponent },
      { path: 'pdetail', component: ProductsDetailComponent },
      { path: 'order', component: OrderComponent },
    ]
  },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'client', component: ClientComponent },
  { path: 'career', component: CareerComponent },
  { path: 'our-team', component: OurTeamComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
