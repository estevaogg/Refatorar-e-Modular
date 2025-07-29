export class Cliente {
    constructor(id, nome, email) {
        this.id = id;
        this.nome = nome;
        this.email = email;
    }
}

export class Serviço {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }

    async fetchClientes() {
        const resposta = await fetch(this.apiUrl);
        const listaDeClientes = await resposta.json();
        return listaDeClientes.map(cliente => new Cliente(cliente._id, cliente.nome, cliente.email));
    }

    async adicionarCliente(nome, email) {
        const resposta = await fetch(this.apiUrl, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ nome, email })
        });
        const cliente = await resposta.json();
        return new Cliente(cliente._id, cliente.nome, cliente.email);
    }

    async removerCliente(id) {
        await fetch(`${this.apiUrl}/${id}`, {
            method: "DELETE"
        });
    }
}
