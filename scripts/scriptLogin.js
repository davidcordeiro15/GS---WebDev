const inputCpf = document.querySelector('#loginCpf')
const inputNome = document.querySelector('#loginNome')
const inputEmail = document.querySelector('#loginEmail')
const inputCheck = document.querySelector('#loginCheck')
//const inputData = document.querySelector('#loginData')

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

function validaEmail(email, msg) {
    const emailRegex = new RegExp(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/
    )
    if (emailRegex.test(email)) {
        return true
    } else {
        return alert(msg)
    }
}


function criaConta() {
    console.log(inputData.value)
    let a = validaNumero(inputCpf.value, "Digite novamente o Cpf")
    let b = validaEspaços(inputNome.value, "Digite novamente seu nome")
    let c = validaEmail(inputEmail.value, "Digite novamente seu email")
    //let d = validaNumero(inputData.value, "Digite seu ano de nascimento novamente")
    if (a === true & b === true & c === true & inputCheck.checked) {
        alert("Conta criada com sucesso! ")
        location.reload()   
    } else {
        alert("Sua conta não foi criada, verifique se todos os campos estão preenchidos corretamente!")
    }
}