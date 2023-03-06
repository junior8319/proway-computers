import { Injectable } from '@angular/core';
import { IItem } from './produtos';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  itens: IItem[] = [];

  constructor(
    private router: Router,
  ) { }

  obtemCarrinho() {
    this.itens = JSON.parse(localStorage.getItem("carrinho") || "[]");
    return this.itens;
  }

  adicionarAoCarrinho(produto: IItem): string {
    if (this.itens.find(item => item.id === produto.id)) {
      this.router.navigate(["carrinho"]);
      return `Você já adicionou o produto ${produto.descricao} ao seu carrinho`;
    }

    this.itens.push(produto);
    
    localStorage.setItem("carrinho", JSON.stringify(this.itens));

    return `${produto.descricao} adicionado ao seu carrinho com sucesso`;
  }
  
  removerProduto(idProduto: number) {
    this.itens = this.itens.filter((item) => item.id !== idProduto);
    
    localStorage.setItem("carrinho", JSON.stringify(this.itens));
  }

  limparCarrinho() {
    this.itens = [];
    localStorage.clear();
  }
}
