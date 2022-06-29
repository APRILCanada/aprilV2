import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email:string;
  password: string;

  constructor( 
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.authService.getAuth().subscribe(auth => {
      if(auth) {
        this.router.navigate(['/interface']); 
      }
    })
  }

  onSubmit() {
    this.authService.login(this.email, this.password)
    .then(res => {
      // Success message
      this.router.navigate(['/interface/'])
    })
    .catch(err => {
      alert(err.message)
    })
  }
}