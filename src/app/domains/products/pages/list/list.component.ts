import {
  Component,
  inject,
  signal,
  OnInit,
  OnChanges,
  input,
} from '@angular/core';

import {rxResource} from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';
import { ProductComponent } from '@products/components/product/product.component';

import { Product } from '@shared/models/product.model';
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';
import { CategoryService } from '@shared/services/category.service';
import { Category } from '@shared/models/category.model';


@Component({
  selector: 'app-list',
  imports: [CommonModule, ProductComponent, RouterLinkWithHref],
  templateUrl: './list.component.html',
})
export default class ListComponent implements OnInit {
  products = rxResource<Product[], { slug: string }>({
    request: () => ({ slug: this.slug() ?? '' }),
    loader: ({ request }) => this.productService.getProducts(request),
  });
  categories = rxResource({
    loader: () => this.categoryService.getAll(),
  });
  private cartService = inject(CartService);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  readonly slug = input<string>();

  ngOnInit() {
    this.getCategories();
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  private getProducts() {
    this.productService.getProducts({ slug: this.slug() }).subscribe({
      next: (products) => {
        this.products.set(products);
      },
    });
  }

  private getCategories() {
    this.categoryService.getAll().subscribe({
      next: (data) => {
        this.categories.set(data);
      },
    });
  }
}
