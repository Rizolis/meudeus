
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      let reg;
      reg = await navigator.serviceWorker.register('/sw.js', { type: "module" });

      console.log('Service worker registrada! ', reg);
      postNews();
    } catch (err) {
      console.log(' Service worker registro falhou: ', err);
    }
  });
}

let param = 'AI'
const apiKey = '1c5598189934416296973da78eec0273';
let url = `https://newsapi.org/v2/everything?q=${param}&apiKey=${apiKey}`;
const main = document.querySelector('main');
const botao = document.getElementById('buscar');


botao.addEventListener('click', () => {
  param = document.getElementById('texto_busca').value;
  url = `https://newsapi.org/v2/everything?q=${param}&apiKey=${apiKey}`
  postNews();
});

async function postNews() {
  const res = await fetch(url);
  const data = await res.json();
  console.log(url)
  main.innerHTML = data.articles.map(createArticle).join('\n');
}

function createArticle(article) {
  return `
           <div class="article">
                <a href="${article.url}" target="_blank">
                    <img src="${article.urlToImage}" 
                      class="image" alt="${article.content}"/>
                    <h2>${article.title}</h2>
                    <p>${article.description}</p>
                </a>
           </div>
    `
}
