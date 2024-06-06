
//Variaveis necessárias para criar uma conta
const inputCpf = document.querySelector('#cadastroCpf');
const inputNome = document.querySelector('#cadastroNome');
const inputEmail = document.querySelector('#cadastroEmail');
const inputCheck = document.querySelector('#cadastroCheck');
const inputSenha = document.querySelector('#cadastroSenha');
const listaCadastro = document.querySelector('#listaCadastro');
const btnCriar = document.querySelector('#btnCriar');

//Variaveis necessárias para logar em uma conta 
const btnLogin = document.querySelector('#btnLogin');
const inputLoginEmail = document.querySelector('#loginEmail');
const inputLoginSenha = document.querySelector('#loginSenha');

//Lista das contas
const contas = [
    {
        nome: 'teste',
        cpf: 1234,
        email: 'teste@gmail.com',
        senha: 'teste',
    }
];

//lista que guarda os valores permitindo o código limpar os inputs
const guardaValores = [];

//armazenando os valores permitindo o código limpar os inputs mais adiante
guardaValores.push(contas[0].email);
guardaValores.push(contas[0].senha);

//Validando se os input's de número estão corretos
function validaNumero(valor, msg) {
    let input = valor;
    if (isNaN(input) || input === '') {
        alert(msg);
        //retorna "false" pedindo para o usuario digitar novamente
        return false;
    } else {
        //retorna o valor que será utilizado posteriormente
        return valor;
    }
}

//Valida se os espaços de letra estão sendo preenchidos corretamente
function validaEspaços(espaco, msg) {
    let input = espaco;
    if (input === '') {
        alert(msg);
        //retorna "false" pedindo para o usuario digitar novamente
        return false;
    } else {
         //retorna o valor que será utilizado posteriormente
        return espaco;
    }   
}

//Função específica para validar email, ela exige que o formato do input seja um email válido
function validaEmail(email, msg) {
    const emailRegex = new RegExp(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/
    );
    if (emailRegex.test(email)) {
         //retorna o valor que será utilizado posteriormente
        return email;
    } else {
        alert(msg);
        //retorna "false" pedindo para o usuario digitar novamente
        return false;
    }
}

//Adiciona os elementos na lista de contas, por meio de uma conta criada pelo usuario
function adicionaNaConta(nome, cpf, email, senha) {
    let conta = {
        nome: nome,
        cpf: cpf,
        email: email,
        senha: senha,
    };
    
    contas.push(conta);

    
}

//Função que junta todos os processos necessários para criar uma conta ajustando as funções já criadas
function criaConta() {
    
    let cpfValor = validaNumero(inputCpf.value, "Digite novamente o Cpf");
    let nomeValor = validaEspaços(inputNome.value, "Digite novamente seu nome");
    let emailValor = validaEmail(inputEmail.value, "Digite novamente seu email");
    let senhaValor = validaEspaços(inputSenha.value, "Digite sua senha novamente");
    
    //guarda os valores
    guardaValores.push(emailValor);
    guardaValores.push(senhaValor);

    //Verifica se todos os campos não estão vazios, para criar ou não uma conta
    if (cpfValor !== false && nomeValor !== false && emailValor !== false && senhaValor !== false && inputCheck.checked) {
        adicionaNaConta(nomeValor, cpfValor, emailValor, senhaValor);
        alert("Conta criada com sucesso!");
    } else {
        alert("Sua conta não foi criada, verifique se todos os campos estão preenchidos corretamente!");
    }
}

//Evento criado para quando o botão de criar conta for clickado, criar uma conta
btnCriar.addEventListener('click', function(infosDoEvento) {
    infosDoEvento.preventDefault();
    criaConta();

    inputCpf.value = '';
    inputEmail.value = '';
    inputNome.value = '';
    inputSenha.value = '';
    inputCheck.checked = false;
});

//Evento criado para quando o botão de logar for clickado, logar uma conta
btnLogin.addEventListener('click', function(logar) {
    logar.preventDefault();

    //contador utilizado para recuperar adequadamente os valores de email e senha na hora de logar
    j = 0;
    if (contas.length>1) {
        j = 2
        while (j < contas.length) {
            j+=2
        }
    }


    let i = 0;
    //laço criado para buscar no array "contas" a conta criada, e logar ela
    while (i < contas.length) {
        if (contas[i].email === guardaValores[0+j] && contas[i].senha === guardaValores[1+j]) {
            alert('Login realizado!');

            //entrar na pagina de denuncia após logar 
            window.location = "pages/denuncia.html";
            break;
        } else {
            i++;
        }
    }
    if (i === contas.length) {
        alert('Email ou senha incorretos.');
    }
});
