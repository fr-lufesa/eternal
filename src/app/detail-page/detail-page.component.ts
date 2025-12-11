import { Component, ElementRef, inject, ViewChild } from "@angular/core";
import { Product } from "../home-page/models/item.model";
import { CurrencyPipe, Location } from "@angular/common";
import { Swiper } from "swiper";
import { Pagination } from "swiper/modules";
import { CartItem, CartService } from "../cart/services/cart.service";
import { CartIconComponent } from "../cart/components/cart-icon/cart-icon.component";

@Component({
  selector: "app-detail-page",
  imports: [CurrencyPipe, CartIconComponent],
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
  private cartService = inject(CartService);

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

  addToBag(){
    let cartItem: CartItem = {
      id: this.product.id,
      variantId: this.product.variants[0].admin_graphql_api_id,
      imgSrc: this.product.image.src,
      name: this.product.title,
      price: + this.product.variants[0].price,
      qty: 1      
    } 

    this.cartService.addItem(cartItem);    

  }
}
