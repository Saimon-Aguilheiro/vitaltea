import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// 🔗 conexão com supabase
const supabase = createClient(
  'https://dcpazsnudcfmgkmsdqqv.supabase.co',
  'sb_publishable_2vABb5T5vdH8qTBMgdSdWg_bc_hPvGu'
)

// 📦 carregar produtos do banco
async function carregarProdutos() {
  const { data, error } = await supabase
    .from('produtos')
    .select('*')

  if (error) {
    console.log('Erro ao buscar produtos:', error)
    return
  }

  mostrarProdutos(data)
}

// 🖼️ renderizar produtos na tela
function mostrarProdutos(produtos) {
  const container = document.getElementById('produtos')

  if (!container) {
    console.log('Container #produtos não encontrado')
    return
  }

  container.innerHTML = ''

  produtos.forEach(produto => {
    const card = document.createElement('div')
    card.classList.add('produto')

    card.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}">
      <h3>${produto.nome}</h3>
      <p>R$ ${produto.preco}</p>
    `

    container.appendChild(card)
  })
}

// 🚀 inicia tudo
carregarProdutos()