import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-wrapper',
  templateUrl: './admin-wrapper.component.html',
  styleUrl: './admin-wrapper.component.css'
})
export class AdminWrapperComponent implements AfterViewInit, OnDestroy {
  @ViewChild('adminIframe') adminIframe!: ElementRef<HTMLIFrameElement>;

  constructor(private authService: AuthService, private router: Router) {}

  ngAfterViewInit() {
    const usuario = this.authService.getUsuario();
    if (this.adminIframe && this.adminIframe.nativeElement && usuario) {
      this.adminIframe.nativeElement.addEventListener('load', () => {
        this.adminIframe.nativeElement.contentWindow?.postMessage({ type: 'usuario-logeado', usuario }, '*');
      });
    }
    window.addEventListener('message', this.handleMessage);
  }

  ngOnDestroy() {
    window.removeEventListener('message', this.handleMessage);
  }

  handleMessage = (event: MessageEvent) => {
    if (event.data && event.data.type === 'logout-admin') {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }
}
