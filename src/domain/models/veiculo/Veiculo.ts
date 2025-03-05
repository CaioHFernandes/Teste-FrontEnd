export interface Veiculo {
  id: string;
  placa: string;
  marca: string;
  modelo: string;
  ano: string;
  cor: string;
  propositoUso: string;
  zeroKm?: boolean;
  nivelConforto: number;
  latitude?: string;
  longitude?: string;
}
