import { Component, OnInit } from '@angular/core';
import { IProduto } from '../produtos';
import { ProdutosService } from '../produtos.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {
  produtos: IProduto[] = [{
    id: 0,
    descricao: '',
    preco: 0,
    descricaoPreco: '',
    quantidadeEstoque: 0,
    imagem: '',
  }];

  constructor(
    private produtosService: ProdutosService,
    private route: ActivatedRoute,
  ) {

  }

  ngOnInit(): void {
    const produtos = this.produtosService.getAll();

    this.route.queryParamMap.subscribe(params => {
      const descricao = params.get('descricao');

      if (descricao) {
        this.produtos = produtos.filter(produto => produto.descricao.toLowerCase()
          .includes(descricao));
        
        return;
      }

      this.produtos = produtos;
    });
  }
}
