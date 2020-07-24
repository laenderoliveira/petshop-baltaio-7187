import { CartUtil } from './../../../utils/cart.util';
import { Product } from './../../../models/product.model';
import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html'
})
export class ProductCardComponent implements OnInit {

  @Input() product: Product;
  
  constructor(public toastr: ToastrService) { }

  ngOnInit(): void {
  }

  addItem() {
    CartUtil.add(
      this.product._id,
      this.product.title,
      1,
      this.product.price,
      this.product.images,
    );
    this.toastr.success(`${this.product.title} adicionado ao carrinho`, 'Produto adicionado');
  }

}
