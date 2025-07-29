export function criarElemento(tag, conteudo) {
    const elemento = document.createElement(tag);
    elemento.innerHTML = conteudo;
    return elemento;
}
