function abrirProduto(elemento){

const nome = elemento.dataset.nome
const descricao = elemento.dataset.descricao

document.getElementById("modalTitulo").innerText = nome
document.getElementById("modalDescricao").innerText = descricao

document.getElementById("modalProduto").style.display = "flex"

}

function fecharProduto(){
document.getElementById("modalProduto").style.display = "none"
}

let slideAtual = 0;

function mudarslide(direcao){

    const slides = document.querySelector(".slides");
    const totalSlides = document.querySelectorAll(".slides img").length;

    slideAtual += direcao;

    if(slideAtual < 0){
        slideAtual = totalSlides - 1;
    }

    if(slideAtual >= totalSlides){
        slideAtual = 0;
    }

    slides.style.transform = `translateX(-${slideAtual * 100}%)`;

}

// Carrinho armazenado no navegador
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || []

// FUNÇÃO PARA ADICIONAR PRODUTO
function adicionarAoCarrinho(botao){

    const nome = botao.dataset.nome
    const preco = parseFloat(botao.dataset.preco)
    const quantidade = parseInt(botao.dataset.quantidade)

    // Verifica se já existe no carrinho
    const produtoExistente = carrinho.find(item => item.nome === nome)

    if(produtoExistente){
        produtoExistente.quantidade += quantidade
    }else{
        carrinho.push({
            nome: nome,
            preco: preco,
            quantidade: quantidade
        })
    }

    salvarCarrinho()
    atualizarContador()

}

// SALVAR NO LOCALSTORAGE
function salvarCarrinho(){
    localStorage.setItem("carrinho", JSON.stringify(carrinho))
}

// ATUALIZAR CONTADOR DO TOPO
function atualizarContador(){

    const contador = document.getElementById("contadorCarrinho")

    if(!contador) return

    let totalItens = 0

    carrinho.forEach(item => {
        totalItens += item.quantidade
    })

    contador.innerText = totalItens
}

// ABRIR CARRINHO
function abrirCarrinho(){
    window.location.href = "carrinho.html"
}

// FECHAR (caso use modal depois)
function fecharCarrinho(){
    document.getElementById("carrinhoContainer").style.display = "none"
}

// CARREGAR AO ABRIR A PÁGINA
document.addEventListener("DOMContentLoaded", () => {
    atualizarContador()
})

// CARREGAR CARRINHO
function carregarCarrinho(){

    const lista = document.getElementById("listaCarrinho")
    const vazio = document.getElementById("carrinhoVazio")

    if(!lista) return

    lista.innerHTML = ""

    if(carrinho.length === 0){
        vazio.style.display = "block"

        document.getElementById("totalCarrinho").innerText = "0.00"
        return
    }else{
        vazio.style.display = "none"
    }

    carrinho.forEach((item, index) => {

        const div = document.createElement("div")
        div.classList.add("item-carrinho")

        div.innerHTML = `
            <p><strong>${item.nome}</strong></p>
            <p>Quantidade: ${item.quantidade}</p>
            <p>Preço: R$ ${item.preco.toFixed(2)}</p>

            <button onclick="removerItem(${index})">
                ❌ Remover
            </button>
        `

        lista.appendChild(div)

    })

    calcularTotal()
}

// CALCULAR TOTAL
function calcularTotal(){

    let total = 0

    carrinho.forEach(item => {
        total += item.preco * item.quantidade
    })

    const totalElemento = document.getElementById("totalCarrinho")

    if(totalElemento){
        totalElemento.innerText = total.toFixed(2)
    }
}

// REMOVER ITEM
function removerItem(index){

    carrinho.splice(index, 1)

    salvarCarrinho()
    carregarCarrinho()
    atualizarContador()
}

// LIMPAR CARRINHO
function limparCarrinho(){

    carrinho = []

    salvarCarrinho()
    carregarCarrinho()
    atualizarContador()
}

// FINALIZAR COMPRA
function finalizarCompra(){

    if(carrinho.length === 0){
        alert("Seu carrinho está vazio!")
        return
    }

    alert("Compra finalizada com sucesso! 🎉")

    carrinho = []

    salvarCarrinho()
    carregarCarrinho()
    atualizarContador()

    window.location.href = "index.html"
}

// CARREGAR AUTOMATICAMENTE NA PÁGINA
document.addEventListener("DOMContentLoaded", () => {
    atualizarContador()
    carregarCarrinho()
})

// PAGAMENTO

let metodoPagamento = ""

// MOSTRAR ITENS NO PAGAMENTO
function carregarResumoPagamento(){

    const container = document.getElementById("resumoCarrinho")
    const totalElemento = document.getElementById("totalPagamento")

    if(!container) return

    container.innerHTML = ""

    let total = 0

    carrinho.forEach(item => {

        const div = document.createElement("div")

        div.innerHTML = `
            <p>${item.nome} - ${item.quantidade}x</p>
        `

        container.appendChild(div)

        total += item.preco * item.quantidade
    })

    totalElemento.innerText = total.toFixed(2)
}

// ESCOLHER PAGAMENTO
function selecionarPagamento(tipo){

    metodoPagamento = tipo

    document.getElementById("areaCartao").style.display = "none"
    document.getElementById("areaPix").style.display = "none"

    if(tipo === "cartao"){
        document.getElementById("areaCartao").style.display = "block"
    }

    if(tipo === "pix"){
        document.getElementById("areaPix").style.display = "block"
        gerarPix()
    }
}

// GERAR PIX (simulado)
function gerarPix(){

    const valor = document.getElementById("totalPagamento").innerText

    const codigo = `PIX-VITALTEA-${Date.now()}-R$${valor}`

    document.getElementById("codigoPix").value = codigo

    // QR Code fake (API gratuita)
    document.getElementById("qrcodePix").src =
    `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${codigo}`
}

// CONFIRMAR PAGAMENTO
function confirmarPagamento(){

    if(metodoPagamento === ""){
        alert("Escolha uma forma de pagamento!")
        return
    }

    if(carrinho.length === 0){
        alert("Carrinho vazio!")
        return
    }

    alert("Pagamento aprovado com sucesso! 🎉")

    carrinho = []

    salvarCarrinho()
    atualizarContador()

    window.location.href = "index.html"
}

// CARREGAR AUTOMÁTICO
document.addEventListener("DOMContentLoaded", () => {
    carregarResumoPagamento()
})

function pagar(){

    if(metodoPagamento === ""){
        alert("Escolha uma forma de pagamento!")
        return
    }

    if(carrinho.length === 0){
        alert("Carrinho vazio!")
        return
    }

    // Simulação de processamento
    const botao = document.querySelector(".finalizar")
    botao.innerText = "Processando pagamento..."
    botao.disabled = true

    setTimeout(() => {

        alert("Pagamento realizado com sucesso! 🎉")

        carrinho = []

        salvarCarrinho()
        atualizarContador()

        window.location.href = "index.html"

    }, 2000) // 2 segundos simulando pagamento
}

async function carregarUsuarios() {
  try {
    const resposta = await fetch('https://aliyah-detonable-cruciately.ngrok-free.dev/usuarios');
    const dados = await resposta.json();

    console.log(dados); // teste

  } catch (erro) {
    console.error('Erro ao buscar usuários:', erro);
  }
}

document.addEventListener("DOMContentLoaded", carregarUsuarios);

// ==========================
// BUSCAR USUÁRIOS DA API
// ==========================

async function carregarUsuarios() {
  try {
    const resposta = await fetch('https://aliyah-detonable-cruciately.ngrok-free.dev/usuarios');
    const dados = await resposta.json();

    const container = document.getElementById("listaUsuarios");

    // Se não existir na página, não faz nada
    if (!container) return;

    container.innerHTML = "<h3>Usuários cadastrados:</h3>";

    dados.forEach(usuario => {
      const div = document.createElement("div");

      div.innerHTML = `
        <p><strong>${usuario.nome}</strong></p>
        <p>${usuario.email}</p>
        <hr>
      `;

      container.appendChild(div);
    });

  } catch (erro) {
    console.error('Erro ao buscar usuários:', erro);
  }
}

// Carregar automaticamente ao abrir página
document.addEventListener("DOMContentLoaded", carregarUsuarios);