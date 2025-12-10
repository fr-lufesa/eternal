import { AfterViewInit, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Product, ProductsResponse } from './models/item.model';
import { CurrencyPipe } from '@angular/common';

import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
import { Router, RouterLink } from '@angular/router';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-home-page',
  imports: [CurrencyPipe, RouterLink],
  standalone: true,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements AfterViewInit {
  @ViewChild('swiperRef') swiperRef!: ElementRef;
  private router = inject(Router);
  private productsService = inject(ProductsService);

  swiper!: Swiper;

  products = this.productsService.products;

  options = ['Inicio', 'Servicios', 'Nosotros', 'Contacto'];


  ngAfterViewInit(): void {
    this.swiper = new Swiper(this.swiperRef.nativeElement, {
      modules: [Pagination],
      slidesPerView: 2,
      spaceBetween: 20,
      // pagination: {
      //   el: '.swiper-pagination',
      //   clickable: true,
      // },
    });
  }

  openDetail(product: Product) {
    this.router.navigate(['detail'], {
      state: { product }
    }); 
  }
}
