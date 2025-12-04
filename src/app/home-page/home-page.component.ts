import { AfterViewInit, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Item } from './models/item.model';
import { CurrencyPipe } from '@angular/common';

import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
import { Router } from '@angular/router';
import { CartComponent } from "../cart/cart.component";

@Component({
  selector: 'app-home-page',
  imports: [CurrencyPipe, CartComponent],
  standalone: true,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements AfterViewInit {
  @ViewChild('swiperRef') swiperRef!: ElementRef;

  swiper!: Swiper;

  items: Item[] = [
    {
      id: 1,
      img: 'img/cap_1.png',
      name: 'Gorra 1',
      price: 23.6,
    },
    {
      id: 2,
      img: 'img/cap_2.png',
      name: 'Gorra 2',
      price: 23.6,
    },
    {
      id: 3,
      img: 'img/cap_2.png',
      name: 'Gorra 3',
      price: 23.6,
    },
  ];

  options = ['Inicio', 'Servicios', 'Nosotros', 'Contacto'];

  private router = inject(Router);

  ngAfterViewInit(): void {
    this.swiper = new Swiper(this.swiperRef.nativeElement, {
      modules: [Pagination],
      slidesPerView: 2,
      spaceBetween: 30,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  }

  openDetail(item: Item) {
    this.router.navigate(['detail'], {
      state: { item }
    }); 
  }
}
