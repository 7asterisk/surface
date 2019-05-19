import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule, StorageBucket } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ContentComponent } from './pages/content/content.component';
import { ServiceComponent } from './pages/content/service/service.component';
import { ProductsComponent } from './pages/content/products/products.component';
import { IndustriesComponent } from './pages/content/industries/industries.component';
import { IndustriesDetailComponent } from './pages/content/industries/industries-detail/industries-detail.component';
import { ProductsDetailComponent } from './pages/content/products/products-detail/products-detail.component';
import { ServiceDetailComponent } from './pages/content/service/service-detail/service-detail.component';
import { TopnavComponent } from './nav/topnav/topnav.component';
import { SidenavComponent } from './nav/sidenav/sidenav.component';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatToolbarModule, MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatSidenavModule,
  MatListModule,
  MatExpansionModule,
  MatCardModule,
  MatStepperModule,
  MatAutocompleteModule,
  MatProgressBarModule
} from '@angular/material';
import { environment } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailComponent } from './pages/content/detail/detail.component';
import { OrderComponent } from './pages/content/order/order.component';
import { FooterComponent } from './nav/footer/footer.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { ClientComponent } from './pages/client/client.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { CareerComponent } from './pages/career/career.component';
import { OurTeamComponent } from './pages/our-team/our-team.component';
import { AdminComponent } from './pages/admin/admin.component';
import { LoginComponent } from './pages/admin/login/login.component';
import { ASidenavComponent } from './pages/admin/a-sidenav/a-sidenav.component';
import { AuthService } from './pages/admin/auth.service';
import { AuthGuard } from './pages/admin/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContentComponent,
    ServiceComponent,
    ProductsComponent,
    IndustriesComponent,
    IndustriesDetailComponent,
    ProductsDetailComponent,
    ServiceDetailComponent,
    TopnavComponent,
    SidenavComponent,
    DetailComponent,
    OrderComponent,
    FooterComponent,
    ContactUsComponent,
    AboutUsComponent,
    ClientComponent,
    CareerComponent,
    OurTeamComponent,
    AdminComponent,
    LoginComponent,
    ASidenavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    NoopAnimationsModule,
    MatExpansionModule,
    MatCardModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatStepperModule,
    MatAutocompleteModule,
    MatProgressBarModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
