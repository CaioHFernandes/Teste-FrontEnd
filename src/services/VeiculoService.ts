// src/services/VeiculoService.ts

import { isEmpty } from "../core/utils/functions/is-empty/IsEmpty";
import type { Historico } from "../domain/models/historico/Historico";
import type { Veiculo } from "../domain/models/veiculo/Veiculo";
import { HistoricoService } from "./HistoricoService";

export class VeiculoService {
  static async getVeiculos(): Promise<Veiculo[]> {
    const veiculos = localStorage.getItem("veiculos");

    if (!isEmpty(veiculos) && veiculos !== null) {
      return await Promise.resolve(JSON.parse(veiculos));
    }

    return await Promise.resolve([]);
  }

  static async salvar(veiculo: Veiculo): Promise<void> {
    const veiculos = await this.getVeiculos();

    localStorage.setItem("veiculos", JSON.stringify([...veiculos, veiculo]));
    this.setHistoricoLocalStorage(veiculo.placa, "CADASTRADO");
  }

  static async editar(veiculo: Veiculo): Promise<void> {
    const veiculos = await this.getVeiculos();

    const veiculosAtualizados = veiculos.map((veiculoAtual) => {
      if (veiculoAtual.id === veiculo.id) {
        return veiculo;
      }

      return veiculoAtual;
    });

    localStorage.setItem("veiculos", JSON.stringify(veiculosAtualizados));
  }

  static async deletar(veiculo: Veiculo): Promise<void> {
    const veiculos = await this.getVeiculos();
    const veiculosAtualizados = veiculos.filter(
      (veiculoAtual) => veiculoAtual.id !== veiculo.id
    );

    localStorage.setItem("veiculos", JSON.stringify(veiculosAtualizados));
    await HistoricoService.adicionarHistorico(veiculo.placa, "DELETADO");
  }

  static setHistoricoLocalStorage(
    placa: string,
    acao: "CADASTRADO" | "EDITADO" | "DELETADO"
  ) {
    const historico = localStorage.getItem("historico");
    const objHistorico = {
      placa: placa,
      acao: acao,
      data: new Date(),
    } as Historico;

    if (historico) {
      const historicoArray = JSON.parse(historico);
      historicoArray.push(objHistorico);
      localStorage.setItem("historico", JSON.stringify(historicoArray));
    }
  }
}
