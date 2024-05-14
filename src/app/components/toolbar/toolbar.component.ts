import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatToolbarModule, MatToolbar } from '@angular/material/toolbar';
import {MatButtonModule, MatButton} from '@angular/material/button';
import {MatIconModule, MatIcon} from '@angular/material/icon';
import{MatMenuModule} from '@angular/material/menu'
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'toolbar',
  standalone: true,
  imports: [MatToolbarModule, CommonModule, MatButtonModule, MatIconModule, MatMenuModule, RouterLink],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent{
}
