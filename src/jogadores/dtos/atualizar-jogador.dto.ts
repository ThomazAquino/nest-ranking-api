import { IsNotEmpty } from 'class-validator';


export class AtualizarJogadorDto {
  @IsNotEmpty()
  readonly telefoneCelular: string;

  @IsNotEmpty()
  readonly nome: string;
}

// DTO patter
// Data transfer object