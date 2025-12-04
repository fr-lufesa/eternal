import { Component, inject } from '@angular/core';
import { Item } from '../home-page/models/item.model';
import { CartComponent } from "../cart/cart.component";
import { CurrencyPipe, Location } from '@angular/common';

@Component({
  selector: 'app-detail-page',
  imports: [CartComponent, CurrencyPipe],
  templateUrl: './detail-page.component.html',
  styleUrl: './detail-page.component.scss',
})
export default class DetailPageComponent {
  item!: Item;

  private location = inject(Location);

  ngOnInit() {
    const { item } = history.state;
    this.item = item;    
  }

  goBack(){
    this.location.back();
  }
}
