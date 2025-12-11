import { Component, ElementRef, inject, ViewChild } from "@angular/core";
import { Product } from "../home-page/models/item.model";
import { CurrencyPipe, Location } from "@angular/common";
import { Swiper } from "swiper";
import { Pagination } from "swiper/modules";

@Component({
  selector: "app-detail-page",
  imports: [CurrencyPipe],
  templateUrl: "./detail-page.component.html",
  styleUrl: "./detail-page.component.scss",
})
export default class DetailPageComponent {
  @ViewChild("content")
  content!: ElementRef<HTMLInputElement>;
  
  @ViewChild('swiperRef') 
  swiperRef!: ElementRef;
  swiper!: Swiper;

  product!: Product;

  private location = inject(Location);

  ngOnInit() {
    const { product } = history.state;
    this.product = product;
  }

  goBack() {
    this.location.back();
  }

  ngAfterViewInit(): void {
    this.swiper = new Swiper(this.swiperRef.nativeElement, {
      modules: [Pagination],
      slidesPerView: 1,
      spaceBetween: 20,
      // pagination: {
      //   el: '.swiper-pagination',
      //   clickable: true,
      // },
    });
  }
}
