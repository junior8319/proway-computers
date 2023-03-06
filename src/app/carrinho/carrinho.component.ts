import { Component, OnInit } from '@angular/core';
import { CarrinhoService } from '../carrinho.service';
import { IItem } from '../produtos';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {
  itensCarrinho: IItem[] = [];
  somaDosPrecos: number = 0;

  constructor(
    public carrinhoService: CarrinhoService,
    private router: Router,
  ) {

  }

  calcularTotal() {
    this.somaDosPrecos = this.itensCarrinho.reduce((acumulador, itemAtual) => {
      return acumulador + itemAtual.preco * itemAtual.quantidade;
    }, 0);
  }

  removerProduto(idSelecionado: number) {
    this.carrinhoService.removerProduto(idSelecionado);
    this.itensCarrinho = this.carrinhoService.obtemCarrinho();
    this.calcularTotal();
  }

  comprar() {
    alert("Parabéns, você receberá sua compra em breve.");
    this.carrinhoService.limparCarrinho();
    this.router.navigate(["produtos"]);
  }

  ngOnInit(): void {
      this.itensCarrinho = this.carrinhoService.obtemCarrinho();
      this.calcularTotal();
  }
}
