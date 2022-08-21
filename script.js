const selector = (el) => document.querySelector(el)

function renderResponse(response){
    const list = document.getElementById('films-list')
    list.innerHTML = ''
        response.forEach( film =>{  // Faz a iteração dentro do array de objetos descrição de cada filme, percorrendo os objetos
            const filmCard = document.createElement('div')  // Cria uma div para cada filme
            filmCard.style.backgroundImage = `url(${film.image_url})`
            filmCard.className = 'film-card'  // Adicionamos uma class name no film-card
            
            filmCard.addEventListener('click', ()=>{  // Função para abrir o modal
                selector('.modal').style.visibility = 'visible'
                const modalContent = selector('.modal-content')
                modalContent.innerHTML = ''  // Limpa para que seja adicionado somente o próximo título
                
                // Inserindo o título do filme:
                const filmTitle = document.createTextNode(film.title)
                const filmTitleElement = document.createElement('h1')
                filmTitleElement.appendChild(filmTitle)
                modalContent.appendChild(filmTitleElement)

                // Subtítulo:
                const filmSubTitle = document.createTextNode(film.subtitle)
                const filmSubTitleElement = document.createElement('h3')
                filmSubTitleElement.appendChild(filmSubTitle)
                modalContent.appendChild(filmSubTitleElement)

                // Descrição:
                const filmDescription = document.createTextNode(film.description)
                const filmDescriptionElement = document.createElement('p')
                filmDescriptionElement.appendChild(filmDescription)
                modalContent.appendChild(filmDescriptionElement)
            })
            list.appendChild(filmCard)
        })
}

this.onload = ()=>{  // this fora de contextos se refere ao objeto global window, portanto, seria o mesmo que "window.onload"
    fetch('https://sevencoders-starwars-wiki.herokuapp.com/films')
    .then(async (data)=>{  // Recebe os dados da API consumida no fetch
        console.log(data)

        const response = await data.json()  // Pega o resultado buscado na API e transforma em JSON

        renderResponse(response)

    })
    .catch( (error)=>{
        alert('Erro ao carregar os filmes')
        console.log( {error} )  // Exibe no console qual foi o erro
    })
}

function hideModal() {
    selector('.modal').style.visibility = 'hidden'
}

selector('#search').addEventListener('click', ()=>{
    const searchValue = selector('.searchInput').value

    fetch(`https://sevencoders-starwars-wiki.herokuapp.com/search?query=${searchValue}`)
    .then(async (data)=>{
        const response = await data.json()
        const list = selector('#films-list')
        list.innerHTML = ''  // Limpa os que tinham antes
        
        renderResponse(response)
    }).catch((error)=>{
        alert("Falha ao realizar a busca")
    })

})