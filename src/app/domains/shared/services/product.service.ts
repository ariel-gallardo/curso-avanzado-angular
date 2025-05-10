import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../models/product.model';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);

  getProducts(params: { category_id?: string; slug?: string }) {
    const {category_id, slug} = params
    const url = new URL(`${environment.apiUrl}/api/v1/products`);
    if (category_id || slug) {
      if(category_id)
        url.searchParams.set('categoryId', category_id);
      else if(slug)
        url.searchParams.set('categorySlug',slug);
    }
    return this.http.get<Product[]>(url.toString());
  }

  getOne(id: string) {
    return this.http.get<Product>(
      `${environment.apiUrl}/api/v1/products/${id}`,
    );
  }
}
