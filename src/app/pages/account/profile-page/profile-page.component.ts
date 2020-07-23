import { DataService } from './../../../services/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html'
})
export class ProfilePageComponent implements OnInit {

  public form: FormGroup;
  public busy = false;

  constructor(
    private service: DataService, 
    private fb: FormBuilder, 
    private toastr: ToastrService
    ) {
      this.form = this.fb.group({

          username: [{  value: '', disabled: true }],
    
          email: ['', Validators.compose([
            Validators.compose([
              Validators.required,
              Validators.email
            ])
          ])],
    
          name: ['', Validators.compose([
            Validators.minLength(6),
            Validators.maxLength(20),
            Validators.required
          ])]
      })
     }

  ngOnInit(): void {
    this.busy = true;
    this
    .service
    .getUser()
    .subscribe((data: any) => {
        this.busy = false;
        this.form.controls['name'].setValue(data.name);
        this.form.controls['username'].setValue(data.document);
        this.form.controls['email'].setValue(data.email);
    },
    (err) => {
      this.busy = false;
      console.log(err)
      this.toastr.error("Infelizmente algo deu errado, confira sua conexão", "Algo deu errado :(");
    })
  }

  submit() {
    this.busy = true;
    this
    .service
    .updateUser(this.form.value)
    .subscribe((data: any) => {
      this.busy = false;
      this.toastr.success(data.message, "Dados altreados com sucesso")
    },
    (err) => {
      console.log(err);
      this.toastr.error(err, "Falha ao salvar os dados");
    })
  }
}
