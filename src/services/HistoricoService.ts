import { isEmpty } from "../core/utils/functions/is-empty/IsEmpty";
import type { Historico } from "../domain/models/historico/Historico";

export class HistoricoService {
  static async getHistorico(): Promise<Historico[]> {
    const historico = localStorage.getItem("historico");

    if (!isEmpty(historico) && historico !== null) {
      return await Promise.resolve(JSON.parse(historico));
    }

    return await Promise.resolve([]);
  }

  static async adicionarHistorico(
    placa: string,
    acao: "CADASTRADO" | "EDITADO" | "DELETADO"
  ): Promise<void> {
    const historico = await this.getHistorico();
    const novoHistotico: Historico = {
      placa: placa,
      acao: acao,
      data: new Date(),
    };

    localStorage.setItem(
      "historico",
      JSON.stringify([...historico, novoHistotico])
    );
  }
}
