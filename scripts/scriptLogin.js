const inputCpf = document.querySelector('#loginCpf')
const inputNome = document.querySelector('#loginNome')
const inputEmail = document.querySelector('#loginEmail')
const inputCheck = document.querySelector('#loginCheck')

function validaNumero(valor, msg) {
    let input = valor
    if (isNaN(input) || input === '') {
        alert(msg)
    } else {
        return true
    }
    
}
function validaEspaços(espaco, msg) {
    let input = espaco
    if (input === '') {
        alert(msg)
    } else {
        return true
    }   
}

function criaConta() {
    console.log(inputCpf.value)
    let a = validaNumero(inputCpf.value, "Digite novamente o Cpf")
    let b = validaEspaços(inputNome.value, "Digite novamente seu nome")
    let c = validaEspaços(inputEmail.value, "Digite novamente seu email")
    if (a === true & b === true & c === true & inputCheck.checked) {
        alert("Conta criada com sucesso! ")
        location.reload()   
    } else {
        alert("Sua conta não foi criada, confirme o checklist para criar")
    }
}