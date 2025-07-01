import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppSiderbarComponent } from '../app-siderbar/app-siderbar.component'; // <-- importa tu sidebar

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, AppSiderbarComponent],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent { }