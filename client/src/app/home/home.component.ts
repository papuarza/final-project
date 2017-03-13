import { Component, OnInit } from '@angular/core';
import { AutocompleteService } from '../autocomplete.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {
  input:any;
  constructor(private autocompleteService: AutocompleteService ) { }

  ngOnInit() {
  }

  autocomplete(event: any) { // without type info
    this.input = event.target.value;
    console.log(this.autocompleteService.autocomplete(this.input));
  }

}
