import { Component, inject, signal, OnInit, input, linkedSignal, effect } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ProductService } from '@shared/services/product.service';
import { Product } from '@shared/models/product.model';
import { CartService } from '@shared/services/cart.service';
import { Meta, Title } from '@angular/platform-browser';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './product-detail.component.html',
})
export default class ProductDetailComponent{
  readonly id = input<string>();
  $product = rxResource({
    request: () => this.id(),
    loader: ({request}) => this.productService.getOne(request)
  });
  $cover = linkedSignal({
    source: this.$product.value,
    computation: (p, oP) => {
      if (p) {
        const image = p.images[0];
        if (image) return image;
        return '';
      }
      return '';
    },
  });
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  private titleService = inject(Title);
  private metaService = inject(Meta);

  changeCover(newImg: string) {
    this.$cover.set(newImg);
  }

  addToCart() {
    const product = this.$product.value();
    if (product) {
      this.cartService.addToCart(product);
    }
  }

  constructor(){
    effect(() => {
      if(this.$product.hasValue()){
        const p = this.$product.value();
        this.titleService.setTitle(p.title);
        this.metaService.updateTag({
          name: 'description',
          content: p.description
        });
        this.metaService.updateTag({
          name: 'og:title',
          content: p.title,
        });
        this.metaService.updateTag({
          name: 'og:description',
          content: p.description,
        });
        this.metaService.updateTag({
          name: 'og:image',
          content: p.images && p.images.length > 0 ? p.images[0] : ''
        })
      }
    });
  }
}
