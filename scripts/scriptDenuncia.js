const imagem1 = document.querySelector('#imagemDenuncia');
const imagem2 = document.querySelector('#imagemDenuncia2');
const imagem3 = document.querySelector('#imagemDenuncia3');
const h2Avatar = document.querySelector('#h2Imagem');
const inputTitulo = document.querySelector('#tituloDenuncia')
const inputDescricao = document.querySelector('#descricaoDenuncia')
const listaDenuncias = document.querySelector('#listaDenuncias')

const denuncias = [
    /*{
        titulo: ,
        descricao: ,
        imagem1: ,
        imagem2: ,
        imagem3: 
    },*/

]
function imagens(imagens) {
    let imagem = imagens 
    imagem.addEventListener('change', event => {
        const preview = document.querySelector('#preview-image');
      
        if (preview) {
          preview.remove();
        }
      
        const reader = new FileReader;
      
        reader.onload = function(event) {
          const previewImage = document.createElement('img');
          previewImage.width = 115;
          previewImage.height = 100;
          previewImage.id = 'preview-image';
          previewImage.src = event.target.result;
          h2Avatar.insertAdjacentElement('afterend', previewImage);
        }
      
        reader.readAsDataURL(imagem.files[0]);
      
      })
    
}




btnCriar.addEventListener('click', function (infosDoEvento){
    infosDoEvento.preventDefault();

    criarDenuncia();


})


window.onload = renderizarNaTela();



function criarDenuncia() {

    //Pegar oq o usuário digitou 
    let denuncia = {
        titulo: inputTitulo.value, 
        descricao: inputDescricao.value,
        imagem: imagem1.files[0]

    }
    //Armazenando no array
    denuncias.unshift(denuncia)

    
    
    
    
    //atualizar o DOM
    renderizarNaTela();

}


function renderizarNaTela() {

    listaDenuncias.innerHTML = ""

    denuncias
    .forEach(
        denuncia => {
            let novaDenuncia = document.createElement('li')
            novaDenuncia.innerHTML = `
            <h1>${denuncia.titulo}</h1>
            <h3>${denuncia.descricao}</h3>
            <img src="${imagem1.files[0]}" > 
            <button onclick="editarFilme(${denuncias.indexOf(denuncia)})"> Editar </button>
            <button onclick="apagarFilme(${denuncias.indexOf(denuncia)})"> Apagar </button>`


            listaDenuncias.append(novaDenuncia)
        }
    )
    
}

function editarDenuncia(idDenuncia) {
    //pegar as informações que a pessoa quer inserir
    let titulomodificado = prompt('Digite o novo titulo',filmes[idDenuncia].titulo)
    let descricaoModificado = prompt('Digite uma nova descrição',filmes[idDenuncia].descricao)
    //mudar as informações
    denuncias[idDenuncia].titulo = titulomodificado
    denuncias[idDenuncia].descricao = diretorModificado 
    //atualiza a tela
    renderizarNaTela()
}

function apagarDenuncia(idDenuncia) {
    //apagar filmes (o segundo número é a quantidade de elementos que será deletado)
    denuncias.splice(idDenuncia,1)
    //atualiza tela
    renderizarNaTela()
}

//para pegar a data da publicação

const date = new Date()
console.log(date)