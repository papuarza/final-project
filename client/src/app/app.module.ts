import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DragulaModule } from 'ng2-dragula';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BoardComponent } from './board/board.component';
import { ListComponent } from './list/list.component';
import { CardComponent } from './card/card.component';
import { ModalComponent } from './card/modal/modal.component';
import { DragulaHandler } from './shared/dragula.service';
import { ListService } from './shared/list.service';
import { CardService } from './shared/card.service';
import { OrderByPipe } from './shared/order-by.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BoardComponent,
    ListComponent,
    CardComponent,
    ModalComponent,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    DragulaModule
  ],
  entryComponents: [
    ModalComponent
  ],
  providers: [
    DragulaHandler,
    ListService,
    CardService,
    OrderByPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
