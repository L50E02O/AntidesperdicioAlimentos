import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service/auth.service';

@Component({
  selector: 'app-admin-wrapper',
  templateUrl: './admin-wrapper.component.html',
  styleUrl: './admin-wrapper.component.css'
})
export class AdminWrapperComponent implements AfterViewInit {
  @ViewChild('adminIframe') adminIframe!: ElementRef<HTMLIFrameElement>;

  constructor(private authService: AuthService) {}

  ngAfterViewInit() {
    const usuario = this.authService.getUsuario();
    if (this.adminIframe && this.adminIframe.nativeElement && usuario) {
      this.adminIframe.nativeElement.addEventListener('load', () => {
        this.adminIframe.nativeElement.contentWindow?.postMessage({ type: 'usuario-logeado', usuario }, '*');
      });
    }
  }
}
