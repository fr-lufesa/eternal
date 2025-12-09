import { Component, ElementRef, inject, ViewChild } from "@angular/core";
import { Product } from "../home-page/models/item.model";
import { CurrencyPipe, Location } from "@angular/common";

@Component({
  selector: "app-detail-page",
  imports: [CurrencyPipe],
  templateUrl: "./detail-page.component.html",
  styleUrl: "./detail-page.component.scss",
})
export default class DetailPageComponent {
  @ViewChild("content")
  content!: ElementRef<HTMLInputElement>;

  product!: Product;

  private location = inject(Location);

  ngOnInit() {
    const { product } = history.state;
    this.product = product;
    // this.content.nativeElement.innerHTML = this.product.body_html;
  }

  goBack() {
    this.location.back();
  }
}
