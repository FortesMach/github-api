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
        user.repositories.forEach(repo => repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name}<br><span class="repo-item">🍴${repo.forks_count}</span><span class="repo-item">⭐${repo.stargazers_count}</span><span class="repo-item">👀${repo.watchers_count}</span><span class="repo-item">🖥️${repo.language}</span></a></li>`)

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class = "repositories section">
                                                <h2>Repositórios</h2>
                                                <ul>${repositoriesItens}</ul>
                                            </div>`
        }

        let eventsItens = ""
        if (user.eventis.type === 'CreateEvent' || 'PushEvent') {
            user.eventis.forEach(even => {
                if (even.type === 'CreateEvent') { eventsItens += `<li class="event-item"><strong>${even.repo.name}</strong> - ${even.payload.description}</li>` }
                else if (even.type === 'PushEvent') { eventsItens += `<li class="event-item"><strong>${even.repo.name}</strong> - ${even.payload.commits[0].message}</li>` }
            })
        }

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