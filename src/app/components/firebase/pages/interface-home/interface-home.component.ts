import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-interface-home',
  templateUrl: './interface-home.component.html',
  styleUrls: ['./interface-home.component.scss'],
})
export class InterfaceHomeComponent implements OnInit {
  isLoggedIn: boolean;
  loggedInUser: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private loader: LoadingService
  ) {}

  ngOnInit(): void {
    this.authService.getAuth().subscribe((auth: any) => {
      if (auth) {
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      } else {
        this.isLoggedIn = false;
      }
      this.loader.loading(false);
    });
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['']);
  }
}
