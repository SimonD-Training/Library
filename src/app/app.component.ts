import { Component } from '@angular/core';
import { LibrarianService } from './services/librarian.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor (private librarian: LibrarianService) {
    // librarian.auth({ email: "123rrr535", password: "2jfofuowfwbff"}).subscribe( (data) => {
    //   if (data) {
    //     then do something
    //   } else {
    //     do something else
    //   }
    // } );
  }
  title = 'Library';
}
