import { Serviço } from './classes.js';
import { criarElemento } from './utils.js';

const apiUrl = "https://crudcrud.com/api/e6d81565b4e84173ad4164ad2c9fe9c4/clientes";
const serviço = new Serviço(apiUrl);
const clientesList = document.getElementById("listaClientes");
const formCadastro = document.getElementById("formCadastro");

async function carregarClientes() {
    const clientes = await serviço.fetchClientes();
    clientes.forEach(cliente => {
        adicionarClienteNaLista(cliente);
    });
}

function adicionarClienteNaLista(cliente) {
    const item = criarElemento("li", `${cliente.nome} `);
    item.setAttribute("data-id", cliente.id);

    const botaoRemover = criarElemento("button", "X");
    botaoRemover.addEventListener("click", async () => {
        await removerCliente(cliente.id);
        item.remove();
    });

    item.appendChild(botaoRemover);
    clientesList.appendChild(item);
}

async function removerCliente(id) {
    await serviço.removerCliente(id);
}

formCadastro.addEventListener("submit", async (event) => {
    event.preventDefault();
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;

    const novoCliente = await serviço.adicionarCliente(nome, email);
    adicionarClienteNaLista(novoCliente);

    formCadastro.reset();
});


carregarClientes();
