import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbar} from '@angular/material/toolbar';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, MatToolbar, ToolbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Game of Thrones';
  currentPage?:string
  constructor(private activatedRoute:ActivatedRoute) { 
  }
  ngOnInit(): void {
    this.activatedRoute.title.subscribe((title) => {
      this.currentPage=title
      console.log(title)
    })
  }
}
