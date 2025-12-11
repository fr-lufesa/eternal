import { Injectable, signal, computed, effect } from "@angular/core";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
}

const CART_KEY = 'cart_items';

@Injectable({
  providedIn: "root",
})
export class CartService {
  // Inicializamos leyendo de localStorage
  private _items = signal<CartItem[]>(this.loadInitialItems());

  // Sólo lectura hacia afuera
  readonly items = computed(() => this._items());

  readonly totalItems = computed(() =>
    this._items().reduce((acc, item) => acc + item.qty, 0)
  );

  readonly totalAmount = computed(() =>
    this._items().reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  constructor() {
    // Efecto: cada que cambie el carrito, lo persistimos en localStorage
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

  removeItem(id: string) {
    this._items.update((items) => items.filter((i) => i.id !== id));
  }

  clear() {
    this._items.set([]);
  }

  // ------- helpers privados -------

  private loadInitialItems(): CartItem[] {
    if (typeof window === 'undefined') {
      // Por si algún día usas SSR
      return [];
    }

    try {
      const raw = localStorage.getItem(CART_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      // Validación ligera por si hay basura
      if (!Array.isArray(parsed)) return [];
      return parsed;
    } catch (e) {
      console.warn('Error leyendo carrito de localStorage, se reinicia.', e);
      return [];
    }
  }
}
