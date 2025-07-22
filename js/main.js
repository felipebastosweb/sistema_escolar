
/*
https://how-to-mithril.js.org/
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
https://mithril.js.org/components.html
https://mithril.js.org/simple-application.html
*/


function createScript(id, src)
{
    // Cria um novo elemento script
    const script = document.createElement('script');
    script.id = id;
    script.src = src;
    script.type = 'text/javascript';
    // Define o atributo async para carregar o script de forma assíncrona
    script.async = true;
    // Callback para quando o script for carregado
    script.onload = () => {
        console.log('Script carregado com sucesso!');
        // Aqui você pode executar qualquer código que dependa do script
    };
    // Callback para lidar com erros no carregamento do script
    script.onerror = () => {
        console.error('Erro ao carregar o script.');
    };
    document.head.appendChild(script);
}

function removeScript(scriptId) {
    // Encontra o elemento script pelo ID
    const script = document.getElementById(scriptId);

    // Verifica se o elemento script foi encontrado
    if (script) {
        // Remove o elemento script do seu pai
        script.parentNode.removeChild(script);
        console.log(`Script com ID ${scriptId} removido.`);
    } else {
        console.log(`Script com ID ${scriptId} não encontrado.`);
    }
}



var Hello = {
    oninit: function(vnode) {
        console.log("Antes de Inicializar")
    },
    onupdate: function() {
		console.log("Redesenhando na tela")
	},
    view: function() {
        console.log("Renderizando na tela")
        return m("main", [
            m("header.container-fluid", []),
            m("article.container-fluid", [
                m("h1", {class: "title"}, "My first app"),
                m("button", "A button"),
                m("div#SchoolScreen"),
                m("div#CountryScreen"),
            ]),
            m("footer.container-fluid", [])
        ])
    },
    oncreate: function(vnode) {
        console.log("Criado e renderizado")
        createScript('country', 'js/country.js');
        createScript('address', 'js/address.js');
    }
}

createScript('company', 'js/company.js');
createScript('school', 'js/school.js');
