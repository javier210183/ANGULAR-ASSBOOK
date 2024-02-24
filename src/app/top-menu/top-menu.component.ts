import { Component, computed, inject,} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../posts/services/auth.service';

@Component({
  selector: 'top-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.css'
})
export class TopMenuComponent {
  [x: string]: any;
  title = 'AssBook';
  #authService = inject(AuthService);
  #router = inject(Router);
  logged = computed(() => this.#authService.logged());
  logout()
  {this.#authService.logout();
    this.#router.navigate(['/auth/login']);
    
  }
  
}
