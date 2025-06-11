import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from './features/layout/dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'comerciante';
}


// import { Component, OnInit } from '@angular/core';
// import { SupabaseService } from './core/services/supabase.service';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [CommonModule],
//   template: `
//     <h2>Conexión a Supabase</h2>
//     <pre>{{ datos | json }}</pre>
//   `,
// })
// export class AppComponent implements OnInit {
//   datos: any[] = [];

//   constructor(private supabase: SupabaseService) {}

//   async ngOnInit() {
//     const { data, error } = await this.supabase.getSupabase()
//       .from('establecimiento') // Reemplaza con el nombre de tu tabla
//       .select('*');

//     if (error) {
//       console.error('❌ Error de conexión:', error.message);
//     } else {
//       console.log('✅ Conectado a Supabase:', data);
//       this.datos = data;
//     }
//   }
// }

