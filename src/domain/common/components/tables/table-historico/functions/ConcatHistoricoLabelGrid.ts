export function concatHistoricoLabelGrid(
  placa: string,
  acao: "CADASTRADO" | "EDITADO" | "DELETADO",
  data: Date
): string {
  const diaMesAno = new Date(data).toLocaleDateString("pt-BR");
  const horaMinuto = new Date(data).toLocaleTimeString("pt-BR");
  const dataFormatada = `${diaMesAno} às ${horaMinuto}`;

  return `Veículo <b>${placa}</b> ${acao} em ${dataFormatada}`;
}
