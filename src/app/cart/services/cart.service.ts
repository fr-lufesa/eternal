import { Injectable, signal, computed, effect } from "@angular/core";

export interface CartItem {
  id: number;
  variantId?: string;  // "gid://shopify/ProductVariant/123456789"
  imgSrc: string;
  name: string;
  price: number;
  qty: number;
}

const CART_KEY = 'cart_items';

@Injectable({
  providedIn: "root",
})
export class CartService {
  private _items = signal<CartItem[]>(this.loadInitialItems());

  readonly items = computed(() => this._items());

  readonly totalItems = computed(() =>
    this._items().reduce((acc, item) => acc + item.qty, 0)
  );

  readonly totalAmount = computed(() =>
    this._items().reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  constructor() {
    effect(() => {
      const items = this._items();
      try {
        localStorage.setItem(CART_KEY, JSON.stringify(items));
      } catch (e) {
        console.error('Error guardando carrito en localStorage', e);
      }
    });
  }

  addItem(item: CartItem) {
    this._items.update((items) => {
      const idx = items.findIndex((i) => i.id === item.id);
      if (idx === -1) {
        return [...items, item];
      }
      const updated = [...items];
      updated[idx] = {
        ...updated[idx],
        qty: updated[idx].qty + item.qty,
      };
      return updated;
    });
  }

  removeItem(id: number) {
    this._items.update((items) => items.filter((i) => i.id !== id));
  }

  clear() {
    this._items.set([]);
  }

  /** 🔼 Sumar 1 (o n) a la cantidad */
  increaseQty(id: number, step: number = 1) {
    this._items.update(items =>
      items.map(item =>
        item.id === id
          ? { ...item, qty: item.qty + step }
          : item
      )
    );
  }

  /** 🔽 Restar 1; si llega a 0, se elimina del carrito */
  decreaseQty(id: number, step: number = 1) {
    this._items.update(items =>
      items
        .map(item =>
          item.id === id
            ? { ...item, qty: item.qty - step }
            : item
        )
        .filter(item => item.qty > 0) // si queda en 0 o menos, lo quitamos
    );
  }

  // ------- helpers privados -------
  private loadInitialItems(): CartItem[] {
    if (typeof window === 'undefined') {
      return [];
    }

    try {
      const raw = localStorage.getItem(CART_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed;
    } catch (e) {
      console.warn('Error leyendo carrito de localStorage, se reinicia.', e);
      return [];
    }
  }
}
