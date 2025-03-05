export interface Historico {
  placa: string;
  acao: "CADASTRADO" | "EDITADO" | "DELETADO";
  data: Date;
}
