import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/auth/model/user';

@Component({
  selector: 'app-user-info-header',
  templateUrl: './user-info-header.component.html',
  styleUrls: ['./user-info-header.component.css'],
})
export class UserInfoHeaderComponent implements OnInit {
  @Input()
  user: User;
  constructor() {}

  ngOnInit(): void {}
}
