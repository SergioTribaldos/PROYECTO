import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/auth/model/user';
import { Product } from 'src/app/home/product/model/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-info-header',
  templateUrl: './user-info-header.component.html',
  styleUrls: ['./user-info-header.component.css'],
})
export class UserInfoHeaderComponent implements OnInit {
  @Input() user: User;
  @Input() product: Product;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  goToChat() {
    this.router.navigate(['user-menu/chat'], {
      queryParams: { sellerId: this.user.id, productId: this.product.id },
    });
  }
}
