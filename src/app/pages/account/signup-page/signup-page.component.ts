import { Router } from '@angular/router';
import { CustomValidator } from './../../../validators/custom.validator';
import { DataService } from './../../../services/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html'
})
export class SignupPageComponent implements OnInit {

  public form: FormGroup;
  public busy = false;

  constructor(
    private service: DataService, 
    private fb: FormBuilder, 
    private router: Router,
    private toastr: ToastrService
    ) {

    this.form = this.fb.group({
      username: ['', Validators.compose([
        Validators.compose([
          Validators.minLength(14),
          Validators.maxLength(14),
          Validators.required,
          CustomValidator.isCpf()
        ])
      ])],

      email: ['', Validators.compose([
        Validators.compose([
          Validators.required,
          Validators.email
        ])
      ])],

      password: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required
      ])],

      name: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required
      ])]
    })

   }

  ngOnInit(): void {
  }

  submit() {
    this.busy = true;
    this
      .service
      .create(this.form.value)
      .subscribe((data: any) => {
        this.busy = false;
        this.toastr.success(data.message, "Bem-vindo!");
        this.router.navigate(['/login'])
      },
      (err) => {
        console.log(err);
        this.busy = false;
        this.toastr.error("Infelizmente algo deu errado, confira sua conexão", "Algo deu errado :(");

      })
    }
}
