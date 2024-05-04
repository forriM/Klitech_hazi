import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatToolbarModule, MatToolbar } from '@angular/material/toolbar';
import {MatButtonModule, MatButton} from '@angular/material/button';
import {MatIconModule, MatIcon} from '@angular/material/icon';
import{MatMenuModule} from '@angular/material/menu'
import { RouterLink } from '@angular/router';

@Component({
  selector: 'toolbar',
  standalone: true,
  imports: [MatToolbarModule, CommonModule, MatButtonModule, MatIconModule, MatMenuModule, RouterLink],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {

}
