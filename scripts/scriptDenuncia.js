const imagem1 = document.querySelector('#imagemDenuncia1');
const imagem2 = document.querySelector('#imagemDenuncia2');
const imagem3 = document.querySelector('#imagemDenuncia3');
const h2Avatar = document.querySelector('#h2Imagem');
const inputTitulo = document.querySelector('#tituloDenuncia');
const inputDescricao = document.querySelector('#descricaoDenuncia');
const listaDenuncias = document.querySelector('#listaDenuncias');
const btnCriar = document.querySelector('#btnCriar');
const date = new Date();

const denuncias = [];

function criaImagem(imagem) {
    imagem.addEventListener('change', event => {
        const preview = document.querySelector('#preview-image');

        if (preview) {
            preview.remove();
        }

        const reader = new FileReader();

        reader.onload = function(event) {
            const previewImage = document.createElement('img');
            previewImage.width = 115;
            previewImage.height = 100;
            previewImage.id = 'preview-image';
            previewImage.src = event.target.result;
            h2Avatar.insertAdjacentElement('afterend', previewImage);
        }

        reader.readAsDataURL(imagem.files[0]);
    });
}

criaImagem(imagem1);
criaImagem(imagem2);
criaImagem(imagem3);

btnCriar.addEventListener('click', function (infosDoEvento) {
    infosDoEvento.preventDefault();
    criarDenuncia();
});

window.onload = renderizarNaTela;

function criarDenuncia() {
    //Pegar o que o usuário digitou
    let denuncia = {
        titulo: inputTitulo.value,
        descricao: inputDescricao.value,
        imagem1: imagem1.files[0],
        imagem2: imagem2.files[0],
        imagem3: imagem3.files[0]
    };

    // Armazenando no array
    denuncias.unshift(denuncia);

    // Limpar os campos de input
    inputTitulo.value = '';
    inputDescricao.value = '';
    imagem1.value = '';
    imagem2.value = '';
    imagem3.value = '';

    // Remover a imagem de preview
    const preview = document.querySelector('#preview-image');
    if (preview) {
        preview.remove();
    }

    // Atualizar o DOM
    renderizarNaTela();
}/*
let i = 1;
document.getElementById("radio1").checked = true;

setInterval( function(){
    proximaImagem();

}), 5000;
function proximaImagem(){
    i++;
    if(i>3){
        i = 1;
    }
    document.getElementById("radio"+count).checked = true;
}
*/
function renderizarNaTela() {
    listaDenuncias.innerHTML = "";

    denuncias.forEach(denuncia => {
        let novaDenuncia = document.createElement('li');
        let imageUrl1 = URL.createObjectURL(denuncia.imagem1);
        let imageUrl2 = URL.createObjectURL(denuncia.imagem2);
        let imageUrl3 = URL.createObjectURL(denuncia.imagem3);

        novaDenuncia.innerHTML = `
            <h1>${denuncia.titulo}</h1>
            <h3>${denuncia.descricao}</h3>
            <div class="slider">
                <div class="slides">
                    <input type="radio" name="radio-btn" id="radio1">
                    <input type="radio" name="radio-btn" id="radio2">
                    <input type="radio" name="radio-btn" id="radio3">
                    
                    <div class="slide first">
                        <img src="${imageUrl1}">
                    </div>
                    <div class="slide">
                        <img src="${imageUrl2}">
                    </div>
                        <img src="${imageUrl3}">
                    <div class="slide">

                    </div>

                    <div class="autoNavegacao">
                        <div class="auto-btn1"></div>
                        <div class="auto-btn2"></div>
                        <div class="auto-btn3"></div>
                    </div>

                </div>
                <div class="manual-navigation">
                    <label for="radio1"></label>
                    <label for="radio2"></label>
                    <label for="radio3"></label>
                </div>
            </div>
            <button onclick="editarDenuncia(${denuncias.indexOf(denuncia)})"> Editar </button>
            <button onclick="apagarDenuncia(${denuncias.indexOf(denuncia)})"> Apagar </button>
            <p>Momento do post:</p>
            <p>${date}</p>`;

        listaDenuncias.append(novaDenuncia);
    });
}

function editarDenuncia(idDenuncia) {
    // Pegar as informações que a pessoa quer inserir
    let titulomodificado = prompt('Digite o novo título', denuncias[idDenuncia].titulo);
    let descricaoModificado = prompt('Digite uma nova descrição', denuncias[idDenuncia].descricao);

    // Mudar as informações
    denuncias[idDenuncia].titulo = titulomodificado;
    denuncias[idDenuncia].descricao = descricaoModificado;

    // Atualiza a tela
    renderizarNaTela();
}

function apagarDenuncia(idDenuncia) {
    // Apagar a denúncia (o segundo número é a quantidade de elementos que será deletado)
    denuncias.splice(idDenuncia, 1);

    // Atualiza a tela
    renderizarNaTela();
}
//para pegar a data da publicação

