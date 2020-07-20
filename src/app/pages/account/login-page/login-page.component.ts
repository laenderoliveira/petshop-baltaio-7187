import { Security } from './../../../utils/security.utils';
import { CustomValidator } from './../../../validators/custom.validator';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from './../../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent implements OnInit {
  public form: FormGroup;
  public busy = false;

  constructor(private service: DataService, private fb: FormBuilder, private router: Router,) { 
    this.form = this.fb.group({
      username: ['', Validators.compose([
        Validators.minLength(14),
        Validators.maxLength(14),
        Validators.required,
        CustomValidator.isCpf()
      ])],
      password: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required
      ])]
    })
  }

  ngOnInit(): void {
    const token = Security.getToken();
    if (token) {
      this.busy = true;
      this.service.refreshToken().subscribe((data: any) => { 
        this.setUser(data.customer, data.token);
        this.busy = false;
      }, err => { 
        Security.clear();
        this.busy = false;
      })
      
    }
  }

  subimit(): void {
    this.busy = true;
    this.service.authenticate(this.form.value).subscribe((data: any) => { 
      this.setUser(data.customer, data.token);
      this.busy = false;
    }, err => { 
      console.log(err);
      this.busy = false;
    });
  
  }

  setUser(user: User, token: string) {
    Security.set(user, token);
    this.router.navigate(['/']);
  }

}
