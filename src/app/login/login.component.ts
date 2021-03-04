import { Component, OnInit } from '@angular/core';
import { validateBasis } from '@angular/flex-layout';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;
  constructor(private authService: AuthServiceService) { }

  ngOnInit(): void {
    this.initForm();
  }
  // tslint:disable-next-line: typedef
  initForm() {
    this.formGroup = new FormGroup(
      {
        email: new FormControl(null, [Validators.required]),
        password: new FormControl(null, [Validators.required])
      }
    );
  }
  // tslint:disable-next-line: typedef
  loginProcess() {
    if (this.formGroup.valid) {
      this.authService.login(this.formGroup.value).subscribe(result => {
        if (result.success) {
          console.log(result);
          sessionStorage.setItem('accountSuccess', JSON.stringify(this.formGroup.value));
          alert(result.message);
        } else {
          alert(result.data);
        }
      });

    }
  }

}
