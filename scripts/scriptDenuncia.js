//variavies necessárias para criar uma denúncia
const imagem1 = document.querySelector('#imagemDenuncia1');
const imagem2 = document.querySelector('#imagemDenuncia2');
const imagem3 = document.querySelector('#imagemDenuncia3');
const h2Avatar = document.querySelector('#h2Imagem');
const inputTitulo = document.querySelector('#tituloDenuncia');
const inputDescricao = document.querySelector('#descricaoDenuncia');
const listaDenuncias = document.querySelector('#listaDenuncias');
const btnCriar = document.querySelector('#btnCriar');

//Criando uma constante para armazenar a data da postagem
const date = new Date();

//Criando a lista de denúncias
const denuncias = [];

//Função necessária para criar e mostrar um preview da imagem selecionada pelo usuario
function criaImagem(imagem) {
    //Evento de seleção da imagem e preview
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

//Criando as imagens
criaImagem(imagem1);
criaImagem(imagem2);
criaImagem(imagem3);

//Evento necessário para criar uma denúncia nova
btnCriar.addEventListener('click', function (infosDoEvento) {
    infosDoEvento.preventDefault();
    criarDenuncia();
});


//Função para criar denuncia
function criarDenuncia() {
    //Comparação necessária para verificar se os campos estão vazios, ou não
    if (inputDescricao.value === '' || inputTitulo.value === '' || imagem1 ==='' ||imagem2===""||imagem3==='') {
        alert('Preencha todos os campos. Não deixe nenhum vazio!')

    } else {

        //Pega o que o usuário digitou e transforma em uma variável
        let denuncia = {
            titulo: inputTitulo.value,
            descricao: inputDescricao.value,
            imagem1: imagem1.files[0],
            imagem2: imagem2.files[0],
            imagem3: imagem3.files[0]
        };
    
        // Armazenando no array "denuncias" a variável com as informações da nova denuncia
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

//Função necessária para rodar as imagens no carrossel, que será criado posteriormente
function proximaImagem() {
    let i = 1;
    document.getElementById('radio1').checked = true;
    //Criando a animação do carrossel
    setInterval(function() {
        i++;
        if (i > 3) {
            i = 1;
        }
        document.getElementById('radio' + i).checked = true;
    }, 3000);
}

//Função para mostrar na tela a nova denúncia com o título, descrição e o carrossel com as imagens
function renderizarNaTela() {
    listaDenuncias.innerHTML = "";
    denuncias.forEach(denuncia => {
        let novaDenuncia = document.createElement('li');
        let imageUrl1 = URL.createObjectURL(denuncia.imagem1);
        let imageUrl2 = URL.createObjectURL(denuncia.imagem2);
        let imageUrl3 = URL.createObjectURL(denuncia.imagem3);

        novaDenuncia.innerHTML = `
            <h1 class="texto__denuncia">${denuncia.titulo}</h1>
            <h3 class="texto__denuncia">${denuncia.descricao}</h3>
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
                    <label for="radio1" class="manual-btn"></label>
                    <label for="radio2" class="manual-btn btn_meio"></label>
                    <label for="radio3" class="manual-btn"></label>
                </div>
            </div>
            <button class="btn__edicao" onclick="editarDenuncia(${denuncias.indexOf(denuncia)})"> Editar </button>
            <button class="btn__edicao" onclick="apagarDenuncia(${denuncias.indexOf(denuncia)})"> Apagar </button>
            <p class="texto__denuncia__data" >Momento do post:</p>
            <p class="texto__denuncia__data" >${date}</p>`;

        listaDenuncias.append(novaDenuncia);
    });
    proximaImagem();
}

//função para editar o titulo e a descrição da denuncia
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

//Função para apagar a denuncia
function apagarDenuncia(idDenuncia) {
    // Apagar a denúncia (o segundo número é a quantidade de elementos que será deletado)
    denuncias.splice(idDenuncia, 1);

    // Atualiza a tela
    renderizarNaTela();
}


