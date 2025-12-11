import { Component, computed, inject } from '@angular/core';
import { CartItem, CartService } from './services/cart.service';
import { CurrencyPipe, Location, NgClass } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, NgClass],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export default class CartComponent {

  private readonly cartService = inject(CartService);
  private readonly location = inject(Location);

  // Usamos directamente las signals/computed del servicio
  readonly items = this.cartService.items;
  readonly totalAmount = this.cartService.totalAmount;
  readonly totalItems = this.cartService.totalItems;

  // Total con envío: si hay más de 1 producto, envío gratis, si no, +150
  readonly total = computed(() =>
    this.totalItems() > 1
      ? this.totalAmount()
      : this.totalAmount() + 150
  );

  add(item: CartItem) {
    this.cartService.increaseQty(item.id);
  }

  sub(item: CartItem) {
    // Esto ya decrementa y elimina si llega a 0
    this.cartService.decreaseQty(item.id);
  }

  remove(itemId: number) {
    this.cartService.removeItem(itemId);
  }

  goBack() {
    this.location.back();
  }

}
