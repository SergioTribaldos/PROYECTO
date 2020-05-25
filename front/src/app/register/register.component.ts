import {
  Component,
  OnInit,
  ViewChild,
  ComponentFactoryResolver,
  AfterViewInit,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';

import { bounceInDown } from 'ng-animate/lib/bouncing';
import { MatDialog } from '@angular/material/dialog';
import { MapDialogComponent } from '../shared/map-dialog/map-dialog.component';
import { Store } from '@ngrx/store';
import { RegisterService } from './register.service';
import { UserRegisterDto } from './user-register.dto';
import { map } from 'rxjs/operators';
import { NotificationsService } from '@shared/notifications.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  isCorrectForm = false;

  condition;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private registerService: RegisterService,
    private notificationsService: NotificationsService,
    private router: Router
  ) {
    this.form = fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
        coordinates: ['', Validators.required],
      },
      { validator: this.passwordMatch('password', 'confirmPassword') }
    );
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(() => {
      this.isCorrectForm = this.form.valid;
    });
  }

  private passwordMatch(type1: any, type2: any) {
    return (checkForm: FormGroup) => {
      let value1 = checkForm.controls[type1];
      let value2 = checkForm.controls[type2];

      if (value1.value === value2.value) {
        return value2.setErrors(null);
      } else {
        return value2.setErrors({ notEquivalent: true });
      }
    };
  }

  selectLocation() {
    const dialogRef = this.dialog.open(MapDialogComponent, {
      data: { coordinates: '' },
      width: '80%',
      height: '70%',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.form.setControl(
        'coordinates',
        new FormControl(result.coordinates, Validators.required)
      );
    });
  }

  registerUser() {
    const userRegisterData: UserRegisterDto = {
      name: this.form.value.name,
      email: this.form.value.email,
      password: this.form.value.password,
      lat: this.form.value.coordinates.lat,
      lng: this.form.value.coordinates.lng,
    };

    this.registerService
      .register(userRegisterData)
      .subscribe(({ msg, status }) => {
        this.notificationsService.showNotification(msg, status);
        setTimeout(() => {
          this.router.navigateByUrl('login');
        }, 3500);
      });
  }
}
