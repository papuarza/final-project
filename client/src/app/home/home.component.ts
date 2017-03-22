import { Component, OnInit } from '@angular/core';
import {ElementRef} from '@angular/core';


@Component({
  selector: 'app-home',
  host: {
        '(document:click)': 'handleClick($event)',
    },
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {
  search:any;
  searchQuery: any;
  public query = '';
  public countries = [ "Madrid", "Miami", "Murcia"];
  public filteredList = [];
  public elementRef;
  constructor(myElement: ElementRef) {
  this.elementRef = myElement; }

  ngOnInit() {

  }
  filter() {
    if (this.query !== ""){
        this.filteredList = this.countries.filter(function(el){
            return el.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
        }.bind(this));
    }else{
        this.filteredList = [];
    }
}

select(item){
    this.query = item;
    this.filteredList = [];
}

handleClick(event){
   var clickedComponent = event.target;
   var inside = false;
   do {
       if (clickedComponent === this.elementRef.nativeElement) {
           inside = true;
       }
      clickedComponent = clickedComponent.parentNode;
   } while (clickedComponent);
    if(!inside){
        this.filteredList = [];
    }
}
  eventHandler(event) {
   console.log(this.searchQuery);
  }
}
