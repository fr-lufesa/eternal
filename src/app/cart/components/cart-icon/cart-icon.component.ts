import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-icon',
  imports: [RouterLink],
  templateUrl: './cart-icon.component.html',
  styleUrl: './cart-icon.component.scss'
})
export class CartIconComponent {

  private cartService = inject(CartService);

  readonly totalItems = this.cartService.totalItems;

  


}
