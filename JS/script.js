"use strict"

async function pesquisarFotos(){
    const url = `http://localhost:8080/v1/whatsapp/contatos/11987876567`
    const response = await fetch(url)
    const data = await response.json()
    return data // agora o array já está direto
}

function criarImagem(contato){
    const mostrarContatos = document.getElementById('contatos')

    const novoContato = document.createElement('div')
    novoContato.classList.add('unicoContato')

    const container = document.createElement('div')
    container.classList.add('container')

    const divFoto = document.createElement('div')
    divFoto.classList.add('foto')

    const img = document.createElement('img')
    img.src = contato.foto_de_perfil || '../IMG/foto.png'
    divFoto.appendChild(img)

    const infoContato = document.createElement('div')
    infoContato.classList.add('infoContato')

    const spanNome = document.createElement('span')
    spanNome.textContent = `Nome: ${contato.nome}`

    const descDiv = document.createElement('div')
    descDiv.classList.add('desc')

    const spanDesc = document.createElement('span')
    spanDesc.textContent = contato["descrição"]
    descDiv.appendChild(spanDesc)

    infoContato.appendChild(spanNome)
    infoContato.appendChild(descDiv)

    container.appendChild(divFoto)
    container.appendChild(infoContato)

    const dataDiv = document.createElement('div')
    dataDiv.classList.add('data')
    const pData = document.createElement('p')
    pData.textContent = '' // sem data no JSON, então deixamos vazio
    dataDiv.appendChild(pData)

    novoContato.appendChild(container)
    novoContato.appendChild(dataDiv)

    mostrarContatos.appendChild(novoContato)
}

async function preencherFotos(){
    const contatos = await pesquisarFotos()
    const galeria = document.getElementById('contatos')
    galeria.innerHTML = '' // limpar antes de inserir novos

    contatos.forEach(contato => {
        criarImagem(contato)
    })
}