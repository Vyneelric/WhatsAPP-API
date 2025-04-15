"use strict";

// A imagem do perfil que você quer usar
const imagemPerfil = './IMG/foto.png'; // Usando a mesma imagem

// Função para carregar os contatos da barra lateral
function carregarContatos() {
    fetch('http://localhost:8080/v1/whatsapp/contatos/11955577796') // Ajuste o endpoint conforme necessário
        .then(response => response.json())
        .then(contatos => {
            const contatosContainer = document.getElementById("contatos");
            contatosContainer.innerHTML = ''; // Limpar contatos existentes

            contatos.forEach(contato => {
                const divContato = document.createElement("div");
                divContato.classList.add("unicoContato");

                const container = document.createElement("div");
                container.classList.add("container");

                const foto = document.createElement("div");
                foto.classList.add("foto");
                const img = document.createElement("img");
                img.src = imagemPerfil; // Usando a mesma imagem do perfil (foto.png)
                foto.appendChild(img);

                const infoContato = document.createElement("div");
                infoContato.classList.add("infoContato");
                const nomeSpan = document.createElement("span");
                nomeSpan.textContent = contato.nome;
                const descDiv = document.createElement("div");
                descDiv.classList.add("desc");
                const descSpan = document.createElement("span");
                descSpan.textContent = contato.descrição;
                descDiv.appendChild(descSpan);
                infoContato.appendChild(nomeSpan);
                infoContato.appendChild(descDiv);

                container.appendChild(foto);
                container.appendChild(infoContato);

                const dataDiv = document.createElement("div");
                dataDiv.classList.add("data");
                const dataP = document.createElement("p");
                dataP.textContent = '12/4/2024'; // Ajuste a data conforme necessário
                dataDiv.appendChild(dataP);

                divContato.appendChild(container);
                divContato.appendChild(dataDiv);

                // Adiciona o evento de clique para carregar a conversa
                divContato.addEventListener("click", function() {
                    carregarConversa(contato.nome); // Chama a função de conversa passando o nome do contato
                });

                contatosContainer.appendChild(divContato);
            });
        })
        .catch(error => console.error('Erro ao carregar contatos:', error));
}

// Função para carregar as mensagens do contato selecionado
function carregarConversa(nomeContato) {
    fetch(`http://localhost:8080/v1/whatsapp/conversas/11955577796`) // Ajuste o endpoint conforme necessário
        .then(response => response.json())
        .then(conversas => {
            const conversa = conversas.find(c => c.Nome === nomeContato); // Encontrar a conversa pelo nome do contato
            
            if (!conversa) {
                console.error('Conversa não encontrada para o contato:', nomeContato);
                return;
            }

            // Atualiza a barra de título da conversa
            const headerImg = document.getElementById("headerImg");
            const headerNome = document.getElementById("headerNome");

            headerImg.src = imagemPerfil; // Usando a mesma imagem do perfil
            headerNome.textContent = conversa.Nome;

            // Exibe as mensagens na tela
            const mainTelaConversa = document.getElementById("mainTelaConversa");
            mainTelaConversa.innerHTML = ''; // Limpar mensagens existentes

            conversa.Messagens.forEach(mensagem => {
                const divMensagem = document.createElement("div");
                divMensagem.classList.add(mensagem.sender === 'me' ? 'minhaMensagem' : 'mensagemRecebida');

                const mensagemP = document.createElement("p");
                mensagemP.textContent = mensagem.content;

                const mensagemSpan = document.createElement("span");
                mensagemSpan.textContent = mensagem.time;

                divMensagem.appendChild(mensagemP);
                divMensagem.appendChild(mensagemSpan);

                mainTelaConversa.appendChild(divMensagem);
            });
        })
        .catch(error => console.error('Erro ao carregar conversa:', error));
}

// Inicializa a página carregando os contatos
carregarContatos();