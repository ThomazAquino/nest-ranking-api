import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto'
import { Jogador } from './interfaces/jogador.interface'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class JogadoresService {

  constructor(
    /* MongooseModule.forFeature with JogadorSchema */
    @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>
  ) {}

  private readonly logger = new Logger(JogadoresService.name);

  async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {
    const { email } = criarJogadorDto;
    const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec();

    if (jogadorEncontrado) {
      await this.atualizar(criarJogadorDto);
    } else {
      await this.criar(criarJogadorDto);
    }
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return await this.jogadorModel.find().exec()
  }

  async consultarJogadorPeloEmail(email: string): Promise<Jogador> {
    const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec();
    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com email ${email} não encontrado.`)
    }
    return jogadorEncontrado;
  }

  async deletarJogador(email: string): Promise<any> {
    return await this.jogadorModel.remove({email}).exec();
  }

  private async criar(criaJogadorDto: CriarJogadorDto): Promise<Jogador> {

    const jogadorCriado = new this.jogadorModel(criaJogadorDto);
    return await jogadorCriado.save();
    // const { nome, telefoneCelular, email } = criaJogadorDto;
    // const jogador: Jogador = {
    //   nome,
    //   telefoneCelular,
    //   email,
    //   ranking: 'A',
    //   posicaoRanking: 1,
    //   urlFotoJogador: 'www.google.com'
    // }
    // this.logger.log(`criarJogadorDto: ${JSON.stringify(criaJogadorDto)}`);
    // this.jogadores.push(jogador)
  }

  private async atualizar(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
    return await this.jogadorModel.findOneAndUpdate(
      {email: criarJogadorDto.email},
      {$set: criarJogadorDto}
    ).exec();
  }
}
