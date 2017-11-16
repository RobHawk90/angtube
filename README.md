# angtube
App AngularJS integrado com a API do YouTube

<h2>Setup Inicial</h2>
<h3>Instalação</h3>
<ol>
  <li>
    <p>Baixe o projeto como .zip ou clone executando em seu terminal: <pre>git clone https://github.com/RobHawk90/angtube.git</pre></p>
  </li>
  <li>
    <p>No diretório do projeto baixado e com o <a href="https://nodejs.org/en/download/" target="_blank">Node</a> instalado, execute o seguinte comando em seu terminal para baixar todas as dependencias: <pre>npm install</pre></p>
  </li>
</ol>

<h3>Configuração</h3>
<p>Note que ao baixar o projeto, você vai precisar <b>criar o arquivo YouTubeKey.js</b> com a chave da API do YouTube está faltando, pois foi configurado no .gitignore.</p>
<pre>
DIRETÓRIO
app/src/services/youtube/YouTubeKey.js:<br>

  CONTEÚDO
  angular.module('youTube')
    .constant('API_KEY', 'SUA_CHAVE_DA_API_AQUI');
</pre>

<h3>Run</h3>
<p>Para rodar a aplicação, após ter seguido os passos anteriores, basta rodar o seguinte comando: <pre>node ./node_modules/live-server/live-server.js . --open=app</pre></p>
<p>Seu browser padrão irá abrir uma janela rodando a aplicação em http://localhost:8080/app</p>
