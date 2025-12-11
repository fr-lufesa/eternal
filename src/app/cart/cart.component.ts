import { Component, computed, inject } from "@angular/core";
import { CartItem, CartService } from "./services/cart.service";
import { CurrencyPipe, Location, NgClass } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Component({
  selector: "app-cart",
  imports: [CurrencyPipe, NgClass],
  templateUrl: "./cart.component.html",
  styleUrl: "./cart.component.scss",
})
export default class CartComponent {
  private readonly cartService = inject(CartService);
  private readonly location = inject(Location);
  private readonly http = inject(HttpClient);

  // Usamos directamente las signals/computed del servicio
  readonly items = this.cartService.items;
  readonly totalAmount = this.cartService.totalAmount;
  readonly totalItems = this.cartService.totalItems;

  // Total con envío: si hay más de 1 producto, envío gratis, si no, +150
  readonly total = computed(() =>
    this.totalItems() > 1 ? this.totalAmount() : this.totalAmount() + 150
  );

  add(item: CartItem) {
    this.cartService.increaseQty(item.id);
    console.table(this.items());
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

  pay() {
    console.log("Entra")
    const payload = this.items().map((item) => ({
      variant_id: item.variantId,
      quantity: item.qty,
    }));

    console.log("PAYLOAD", payload)

    this.http.post<{ checkout_url: string }>(
      `${environment.apiUrl}/eternal/create_checkout`,
      payload
    ).subscribe(res => {
      console.log('Respuesta create_checkout:', res);
      if (res.checkout_url) {
        window.location.href = res.checkout_url;
      }
    });
    
  }
}
