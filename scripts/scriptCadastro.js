const inputCpf = document.querySelector('#cadastroCpf');
const inputNome = document.querySelector('#cadastroNome');
const inputEmail = document.querySelector('#cadastroEmail');
const inputCheck = document.querySelector('#cadastroCheck');
const inputSenha = document.querySelector('#cadastroSenha');
const listaCadastro = document.querySelector('#listaCadastro');
const btnCriar = document.querySelector('#btnCriar');



const btnLogin = document.querySelector('#btnLogin');
const inputLoginEmail = document.querySelector('#loginEmail');
const inputLoginSenha = document.querySelector('#loginSenha');

const contas = [
    {
        nome: 'teste',
        cpf: 1234,
        email: 'teste@gmail.com',
        senha: 'teste',
    }
];

function validaNumero(valor, msg) {
    let input = valor;
    if (isNaN(input) || input === '') {
        alert(msg);
        return false;
    } else {
        return valor;
    }
}

function validaEspaços(espaco, msg) {
    let input = espaco;
    if (input === '') {
        alert(msg);
        return false;
    } else {
        return espaco;
    }   
}

function validaEmail(email, msg) {
    const emailRegex = new RegExp(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/
    );
    if (emailRegex.test(email)) {
        return email;
    } else {
        alert(msg);
        return false;
    }
}

function adicionaNaConta(nome, cpf, email, senha) {
    let conta = {
        nome: nome,
        cpf: cpf,
        email: email,
        senha: senha,
    };
    
    contas.push(conta);

    //listaCadastro.innerHTML = ''
}

function criaConta() {
    
    let cpfValor = validaNumero(inputCpf.value, "Digite novamente o Cpf");
    let nomeValor = validaEspaços(inputNome.value, "Digite novamente seu nome");
    let emailValor = validaEmail(inputEmail.value, "Digite novamente seu email");
    let senhaValor = validaEspaços(inputSenha.value, "Digite sua senha novamente");
    //let d = validaNumero(inputData.value, "Digite seu ano de nascimento novamente");
    
    if (cpfValor !== false && nomeValor !== false && emailValor !== false && senhaValor !== false && inputCheck.checked) {
        
        adicionaNaConta(nomeValor, cpfValor, emailValor, senhaValor);
        
        alert("Conta criada com sucesso!");
        
    } else {
        alert("Sua conta não foi criada, verifique se todos os campos estão preenchidos corretamente!");
    }
}

btnCriar.addEventListener('click', function(infosDoEvento) {
    infosDoEvento.preventDefault();
    criaConta();
});

btnLogin.addEventListener('click', function(logar) {
    logar.preventDefault();
   
    let i = 0;
    
    while (i < contas.length) {
        if (contas[i].email === inputLoginEmail.value && contas[i].senha === inputLoginSenha.value) {
            alert('Login realizado!');

            //entrar na pagina
            window.location = "/pages/denuncia.html";
            break;
        } else {
            
            i++;
        }
    }
    if (i === contas.length) {
        alert('Email ou senha incorretos.');
    }
});