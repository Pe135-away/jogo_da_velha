
const readlineSync = require('readline-sync');


class JogoDaVelha {
    constructor() {
        
        this.tabuleiro = [
            [' ', ' ', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' ']
        ];

        this.jogadores = ['X', 'O'];

        this.jogadorAtual = 0;

        this.jogadas = 0;
    }


    exibirTabuleiro() {
        console.log('\n=== JOGO DA VELHA ===\n');
        

        for (let i = 0; i < 3; i++) {
            let linha = '';
            

            for (let j = 0; j < 3; j++) {

                linha += this.tabuleiro[i][j];
                

                if (j < 2) {
                    linha += ' | ';
                }
            }
            

            console.log(linha);
            

            if (i < 2) {
                console.log('---------');
            }
        }
        console.log(); 
    }


    jogadaValida(linha, coluna) {

        if (linha < 0 || linha > 2 || coluna < 0 || coluna > 2) {
            return false;
        }
        

        return this.tabuleiro[linha][coluna] === ' ';
    }

    fazerJogada(linha, coluna) {

        if (!this.jogadaValida(linha, coluna)) {
            return false;
        }
        

        this.tabuleiro[linha][coluna] = this.jogadores[this.jogadorAtual];
        

        this.jogadas++;
        
        this.jogadorAtual = (this.jogadorAtual + 1) % 2;
        
        return true;
    }


    verificarVencedor() {
        const simbolo = this.jogadores[(this.jogadorAtual + 1) % 2]; // Símbolo do último jogador
        

        for (let i = 0; i < 3; i++) {
            if (this.tabuleiro[i][0] === simbolo && 
                this.tabuleiro[i][1] === simbolo && 
                this.tabuleiro[i][2] === simbolo) {
                return simbolo;
            }
        }

        for (let j = 0; j < 3; j++) {
            if (this.tabuleiro[0][j] === simbolo && 
                this.tabuleiro[1][j] === simbolo && 
                this.tabuleiro[2][j] === simbolo) {
                return simbolo;
            }
        }
        

        if (this.tabuleiro[0][0] === simbolo && 
            this.tabuleiro[1][1] === simbolo && 
            this.tabuleiro[2][2] === simbolo) {
            return simbolo;
        }
        

        if (this.tabuleiro[0][2] === simbolo && 
            this.tabuleiro[1][1] === simbolo && 
            this.tabuleiro[2][0] === simbolo) {
            return simbolo;
        }
        

        return null;
    }


    verificarEmpate() {
        return this.jogadas === 9 && this.verificarVencedor() === null;
    }


    obterJogada() {
        console.log(`\nVez do jogador ${this.jogadores[this.jogadorAtual]}`);
        

        while (true) {
 
            const linha = readlineSync.question('Digite a linha (1-3): ');

            const coluna = readlineSync.question('Digite a coluna (1-3): ');
            

            const linhaNum = parseInt(linha) - 1;
            const colunaNum = parseInt(coluna) - 1;
            

            if (isNaN(linhaNum) || isNaN(colunaNum)) {
                console.log('Por favor, digite números válidos!');
                continue;
            }
            

            return { linha: linhaNum, coluna: colunaNum };
        }
    }


    jogar() {
        console.log('Bem-vindo ao Jogo da Velha!');
        console.log('As posições são numeradas de 1 a 3 para linha e coluna.');
        

        while (true) {

            this.exibirTabuleiro();
            

            const jogada = this.obterJogada();
            

            if (!this.fazerJogada(jogada.linha, jogada.coluna)) {
                console.log('Jogada inválida! Tente novamente.');
                continue;
            }
            

            const vencedor = this.verificarVencedor();
            if (vencedor) {
                this.exibirTabuleiro();
                console.log(`\n🎉 Parabéns! Jogador ${vencedor} venceu! 🎉`);
                break;
            }
            

            if (this.verificarEmpate()) {
                this.exibirTabuleiro();
                console.log('\n🤝 Empate! O jogo terminou sem vencedores. 🤝');
                break;
            }
        }
    }
}


const jogo = new JogoDaVelha();
jogo.jogar();
