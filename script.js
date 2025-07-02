const clientes = document.getElementById("listaClientes");

fetch("https://crudcrud.com/api/fe48aa14db2c48bbb623ea177cf72815/clientes")
.then(resposta => resposta.json())
.then(listaDeClientes => {
    
    listaDeClientes.forEach(cliente => {
        
        const item = document.createElement("li");
        item.innerHTML = `${cliente.nome} <button onclick="remove('${cliente._id}')">X</button>`;
        clientes.appendChild(item);
    });
})

document.getElementById("enviar").addEventListener("click", () => {

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;

    fetch("https://crudcrud.com/api/fe48aa14db2c48bbb623ea177cf72815/clientes", {

        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({nome: nome, email: email})
    })
    .then(reposta => reposta.json())
    .then((tarefa) => {

        const item = document.createElement("li");
        item.innerHTML = `${tarefa.nome} <button onclick="remove('${tarefa._id}')">X</button>`;
        clientes.appendChild(item);
    });
})


function remove(id) {
    fetch(`https://crudcrud.com/api/fe48aa14db2c48bbb623ea177cf72815/clientes/${id}`, {
        method: "DELETE"
    })
    .then(() => {
        const item = document.querySelector(`button[onclick="remove('${id}')"`).parentElement;
        item.remove();
    })
    .catch((erro) => {
        console.error("Erro ao remover cliente:", erro);
    });
}


