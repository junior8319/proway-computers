import { Component, OnInit } from '@angular/core';
import { IItem, IProduto } from '../../produtos';
import { ProdutosService } from '../../produtos.service';
import { ActivatedRoute } from '@angular/router';
import { NotificacaoService } from 'src/app/notificacao.service';
import { CarrinhoService } from 'src/app/carrinho.service';

@Component({
  selector: 'app-detalhes-produto',
  templateUrl: './detalhes-produto.component.html',
  styleUrls: ['./detalhes-produto.component.css']
})
export class DetalhesProdutoComponent implements OnInit {
  produto: IProduto | undefined;
  id: number | null = null;
  quantidade: number = 1;
  quantidadeMax: number = 0;
  indisponivel: boolean = false;
  
  constructor(
    private produtosService: ProdutosService,
    private notificacaoService: NotificacaoService,
    private carrinhoService: CarrinhoService,
    private route: ActivatedRoute,
  ) {

  }

  ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        this.id = Number(params.get("id"));
      });
      if (this.id) {
        this.produto = this.produtosService.getOne(this.id);
        if (this.produto && this.produto.quantidadeEstoque > 0) {
          this.quantidadeMax = this.produto?.quantidadeEstoque;
        }
        if (this.produto && this.produto.quantidadeEstoque === 0) {
          this.indisponivel = true;
        }
      }
  }

  adicionarAoCarrinho() {
    const produto: IItem = {
      ...this.produto!,
      quantidade: this.quantidade,
    };
    const notificacao = this.carrinhoService.adicionarAoCarrinho(produto);

    this.notificacaoService.notificar(notificacao);
  }
}
