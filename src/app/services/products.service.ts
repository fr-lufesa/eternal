import { HttpClient } from "@angular/common/http";
import { computed, inject, Injectable, signal } from "@angular/core";
import { Product, ProductsResponse } from "../home-page/models/item.model";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  private readonly http = inject(HttpClient);

  // Signal con lista de productos
  private _products = signal<Product[]>([]);

  // Computed que expone la lista
  public products = computed(() => this._products());

  constructor() {
    this.getProducts();
  }

  getProducts() {
    const url = "http://localhost:8000/eternal/get_products";

    this.http.get<ProductsResponse>(url).subscribe({
      next: (resp) => {
        this._products.set(resp.products);
        console.table(resp.products);
      },
      error: (err) => {
        console.log("Error", err);
      },
    });
  }

  // Getter opcional
  get Products() {
    return this._products();
  }
}
