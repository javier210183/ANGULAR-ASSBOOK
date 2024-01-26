import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PostsPageComponent } from './posts/posts-page/posts-page.component';
import { TopMenuComponent } from './top-menu/top-menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PostsPageComponent, TopMenuComponent],//todos los modulos o componentes que quieras usar
  templateUrl: './app.component.html',//renderiza
  styleUrls: ['./app.component.css']//estilos
})
export class AppComponent {
}
