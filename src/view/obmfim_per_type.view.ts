export class Obmfim_per_typeView {
  tipo: string;
  quantidade: string;
  relacao: any[];

  constructor(tipo: string, quantidade: string, relacao: any[]) {
    this.tipo = tipo;
    this.quantidade = quantidade;
    this.relacao = relacao;
  }
}
