import { DataService } from './../../../services/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html'
})
export class ResetPasswordPageComponent implements OnInit {

  public form: FormGroup;
  public busy = false;

  constructor(private service: DataService, private fb: FormBuilder, private router: Router, private toastr: ToastrService) {
    this.form = this.fb.group({
      email: ['', Validators.compose([
        Validators.minLength(10),
        Validators.maxLength(30),
        Validators.email,
        Validators.required
      ])]
    })
   }

  ngOnInit(): void {

  }

  submit() {
    this.busy = true;
    this.service.resetPassword(this.form.value).subscribe((data: any) => {
      this.busy = false;
      this.toastr.success(data.message, "Recupeação de senha")
      this.router.navigate(['/login'])
    },
    (err) => {
      console.log(err)
      this.toastr.error("Falha ao recuperar senha", "")
      this.busy = false;
    })
  }

}
