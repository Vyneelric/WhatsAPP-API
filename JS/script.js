"use strict"

"use strict"

async function pesquisarFotos(){
    const url = `http://localhost:8080/v1/whatsapp/contatos/11987876567`
    const response = await fetch(url)
    const data = await response.json()
    return data
}

function criarImagem(contato){
    const mostrarContatos = document.getElementById('contatos')

    const novaDiv = document.createElement('div')
    novaDiv.classList.add('unicoContato')

    const novoContainer = document.createElement('div')
    novoContainer.classList.add('container')

    const novaFoto = document.createElement('div')
    novaFoto.classList.add('foto')
    const img = document.createElement('img')
    img.src = contato.foto || '../IMG/foto.png'
    novaFoto.appendChild(img)

    const infoContato = document.createElement('div')
    infoContato.classList.add('infoContato')

    const spanNome = document.createElement('span')
    spanNome.textContent = `Nome: ${contato.nome}`

    const divDesc = document.createElement('div')
    divDesc.classList.add('desc')
    const spanDesc = document.createElement('span')
    spanDesc.textContent = contato.descricao
    divDesc.appendChild(spanDesc)

    infoContato.appendChild(spanNome)
    infoContato.appendChild(divDesc)

    novoContainer.appendChild(novaFoto)
    novoContainer.appendChild(infoContato)

    const dataDiv = document.createElement('div')
    dataDiv.classList.add('data')
    const pData = document.createElement('p')
    pData.textContent = contato.data || ''
    dataDiv.appendChild(pData)

    novaDiv.appendChild(novoContainer)
    novaDiv.appendChild(dataDiv)

    mostrarContatos.appendChild(novaDiv)
}

async function preencherFotos(){
    const data = await pesquisarFotos()
    const galeria = document.getElementById('contatos')
    galeria.innerHTML = '' // limpando antes de preencher

    contatos.forEach(contato => {
        criarImagem(contato)
    })
}

// executa após carregar
preencherFotos()