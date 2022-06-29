import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-aero-admin',
  templateUrl: './aero-admin.component.html',
  styleUrls: ['./aero-admin.component.scss'],
})
export class AeroAdminComponent implements OnInit {
  constructor(private loading: LoadingService) {}

  ngOnInit(): void {
    this.loading.loading(false);
  }
}
