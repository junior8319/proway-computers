import { Component, OnInit } from '@angular/core';
import { CarrinhoService } from '../carrinho.service';
import { IItem } from '../produtos';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  carrinho: IItem[] = [];
  quantidadeItens: number = 0;

  constructor(
    public carrinhoService: CarrinhoService,
  ) {

  }

  atualizarQuantidadeDeItens() {
    this.quantidadeItens = this.carrinhoService.obtemCarrinho().length;
  }

  ngOnInit(): void {
    this.carrinho = this.carrinhoService.obtemCarrinho();
    this.quantidadeItens = this.carrinho.length;
  }
}
