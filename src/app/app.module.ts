import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderModule } from './layout/header/header.module';
import { FooterModule } from './layout/footer/footer.module';

// Shared Component
const sharedComponents = [HeaderModule, FooterModule];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ...sharedComponents,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
