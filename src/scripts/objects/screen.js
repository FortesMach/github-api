const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `<div class="info">
                                            <img src=${user.avatarUrl} alt="Foto do perfil do usuário" >
                                            <div class="data">
                                                <h1>${user.name ?? 'Não possui nome cadastrado'}</h1>
                                                <p>${user.bio ?? 'Não possui bio cadastrada'}</p>
                                                <ul class="follow">
                                                    <li>Seguidores: ${user.followers}</li>
                                                    <li>Seguindo: ${user.following}</li>
                                                </ul>
                                            </div>
                                        </div>`

        let repositoriesItens = ""
        user.repositories.forEach(repo => repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name}
                                                                    <br>
                                                                    <span class="repo-item">🍴${repo.forks_count || 'Sem Forks'}</span>
                                                                    <span class="repo-item">⭐${repo.stargazers_count || 'Sem Estrelas'}</span>
                                                                    <span class="repo-item">👀${repo.watchers_count || 'Sem Espectadores'}</span>
                                                                    <span class="repo-item">🖥️${repo.language ?? 'Sem Linguagem Definida'}</span>
                                                                </a></li>`)
        console.log(repositoriesItens)

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class = "repositories section">
                                                <h2>Repositórios</h2>
                                                <ul>${repositoriesItens}</ul>
                                            </div>`
        }

        let eventsItens = ""
        user.eventis.forEach(element =>{
            if (element.type === 'PushEvent'){
                eventsItens += `<li class="event-item">
                                    <strong>${element.repo.name}</strong> -- ${element.payload.commits[0].message}
                                </li>`
            }else{
                eventsItens += `<li class="event-item">
                                    <strong>${element.repo.name}</strong> -- ${element.payload.ref_type}
                                </li>`
            }
        })

        if (user.eventis.length > 0) {
            this.userProfile.innerHTML += `<div class = "events">
                                                <h2>Eventos</h2>
                                                <ul>${eventsItens}</ul>
                                            </div>`
        }

    },
    renderNotFound() {
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    }
}

export { screen }