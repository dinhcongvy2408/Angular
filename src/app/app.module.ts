import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { ProductComponent } from './product/product.component';
import { FooterComponent } from './footer/footer.component';
import { ArticleComponent } from './article/article.component';
import { MarketingComponent } from './marketing/marketing.component';
import { ProductLeftComponent } from './product/product-left/product-left.component';
import { ProductRightComponent } from './product/product-right/product-right.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CartComponent } from './cart/cart.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ProductListPaginatedComponent } from './product-list-paginated/product-list-paginated.component';
// import { TokenInterceptor } from './services/token.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ProductComponent,
    FooterComponent,
    ArticleComponent,
    MarketingComponent,
    ProductLeftComponent,
    ProductRightComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    CartComponent,
    ProductListPaginatedComponent
  ],
  imports: [
    NgbCarouselModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
