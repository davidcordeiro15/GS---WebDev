// Variáveis necessárias para criar uma denúncia
const imagem1 = document.querySelector('#imagemDenuncia1');
const imagem2 = document.querySelector('#imagemDenuncia2');
const imagem3 = document.querySelector('#imagemDenuncia3');
const h2Avatar = document.querySelector('#h2Imagem');
const inputTitulo = document.querySelector('#tituloDenuncia');
const inputDescricao = document.querySelector('#descricaoDenuncia');
const listaDenuncias = document.querySelector('#listaDenuncias');
const btnCriar = document.querySelector('#btnCriar');

// Criando uma constante para armazenar a data da postagem
const date = new Date();

// Criando a lista de denúncias
const denuncias = [];

// Função necessária para criar e mostrar um preview da imagem selecionada pelo usuário
function criaImagem(imagem) {
    // Evento de seleção da imagem e preview
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

// Criando as imagens
criaImagem(imagem1);
criaImagem(imagem2);
criaImagem(imagem3);

// Evento necessário para criar uma denúncia nova
btnCriar.addEventListener('click', function (infosDoEvento) {
    infosDoEvento.preventDefault();
    criarDenuncia();
});

// Função para criar denúncia
function criarDenuncia() {
    // Comparação necessária para verificar se os campos estão vazios ou não
    if (inputDescricao.value === '' || inputTitulo.value === '' || imagem1.value === '' || imagem2.value === '' || imagem3.value === '') {
        alert('Preencha todos os campos. Não deixe nenhum vazio!');
    } else {
        // Pega o que o usuário digitou e transforma em uma variável
        let denuncia = {
            titulo: inputTitulo.value,
            descricao: inputDescricao.value,
            imagem1: imagem1.files[0],
            imagem2: imagem2.files[0],
            imagem3: imagem3.files[0],
            date: new Date()
        };
    
        // Armazenando no array "denuncias" a variável com as informações da nova denúncia
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
    }
}

// Função para mostrar na tela a nova denúncia com o título, descrição e o carrossel com as imagens
function renderizarNaTela() {
    listaDenuncias.innerHTML = "";
    denuncias.forEach((denuncia, index) => {
        let novaDenuncia = document.createElement('li');
        let imageUrl1 = URL.createObjectURL(denuncia.imagem1);
        let imageUrl2 = URL.createObjectURL(denuncia.imagem2);
        let imageUrl3 = URL.createObjectURL(denuncia.imagem3);

        //Id's necessários para movimentar cada imagem das denuncias
        let idImagem = `denuncia${index}`;

        novaDenuncia.innerHTML = `
            <style type="text/css">
                .manual-navigation{
                    width: 800px;
                    margin-top: -40px;
                    padding-right: 30px;
                    display: flex;
                    justify-content: center;
                }
                .btn_meio {
                    margin-left: 42px;
                    margin-right: 42px;
                }
                .manual-btn{
                    position: relative;
                    width: 10px;
                    height: 10px;
                    border: 1px solid #20a6ff;
                    border-radius: 50px;
                    cursor: pointer;
                }
                .manual-btn:hover{
                    background-color: #ffffff;
                }
                #${idImagem}-radio1:checked ~ .first{
                    margin-left: 0;
                }
                #${idImagem}-radio2:checked ~ .first{
                    margin-left: -25%;
                }
                #${idImagem}-radio3:checked ~ .first{
                    margin-left: -50%;
                }
            </style>
            <h1 class="texto__denuncia">${denuncia.titulo}</h1>
            <h3 class="texto__denuncia">${denuncia.descricao}</h3>
            <div class="slider">
                <div class="slides">
                    <input type="radio" name="radio-btn-${idImagem}" id="${idImagem}-radio1">
                    <input type="radio" name="radio-btn-${idImagem}" id="${idImagem}-radio2">
                    <input type="radio" name="radio-btn-${idImagem}" id="${idImagem}-radio3">
                    
                    <div class="slide first">
                        <img src="${imageUrl1}">
                    </div>
                    <div class="slide">
                        <img src="${imageUrl2}">
                    </div>
                        
                    <div class="slide">
                        <img src="${imageUrl3}">
                    </div>

                    <div class="autoNavegacao">
                        <div class="auto-btn1"></div>
                        <div class="auto-btn2"></div>
                        <div class="auto-btn3"></div>
                    </div>

                </div>
                <div class="manual-navigation">
                    <label for="${idImagem}-radio1" class="manual-btn"></label>
                    <label for="${idImagem}-radio2" class="manual-btn btn_meio"></label>
                    <label for="${idImagem}-radio3" class="manual-btn"></label>
                </div>
            </div>
            <button class="btn__edicao" onclick="editarDenuncia(${index})"> Editar </button>
            <button class="btn__edicao" onclick="apagarDenuncia(${index})"> Apagar </button>
            <p class="texto__denuncia__data">Momento do post:</p>
            <p class="texto__denuncia__data">${denuncia.date}</p>`;

        listaDenuncias.append(novaDenuncia);
    });
}

// Função para editar o título e a descrição da denúncia
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

// Função para apagar a denúncia
function apagarDenuncia(idDenuncia) {
    // Apagar a denúncia (o segundo número é a quantidade de elementos que será deletado)
    denuncias.splice(idDenuncia, 1);

    // Atualiza a tela
    renderizarNaTela();
}
