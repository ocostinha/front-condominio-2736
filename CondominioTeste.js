function limpar() {
  document.getElementById('nome').value = ''
  document.getElementById('ddd').value = ''
  document.getElementById('telefone').value = ''
  document.getElementById('email').value = ''
  document.getElementById('bloco').value = ''
  document.getElementById('apto').value = ''
  document.getElementById('cpf').value = ''
  document.getElementById('nome').focus()
}

function salvar() {
  var nome = document.getElementById('nome').value
  var ddd = document.getElementById('ddd').value
  var telefone = document.getElementById('telefone').value
  var email = document.getElementById('email').value
  var bloco = document.getElementById('bloco').value
  var apto = document.getElementById('apto').value
  var cpf = document.getElementById('cpf').value

  var dados = {
    nome: nome,
    ddd: ddd,
    telefone: telefone,
    email: email,
    bloco: bloco,
    apto: apto,
    cpf: cpf
  }

  fetch("http://localhost:8080/condomino", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dados)
  })
    .then(res => res.json())
    .then(res => {
      limpar()
      cancelar()
      carregarCondominos()
    })
    .catch(err => {
      console.error(err)
    })
}

function carregarCondominos() {
  document.getElementById("CadastroCondomino").style.display = "none"

  fetch("http://localhost:8080/condomino")
      .then(res => res.json())
      .then(condominos => {

        var table = document.getElementById('tableCondominos')
        table.innerHTML = ''

        var thead = table.createTHead();
        var headerRow = thead.insertRow(0);
        var headers = ['Bloco', 'Apartamento', 'Nome', 'DDD', 'Telefone', 'Editar', 'Visualizar', 'Apagar'];
        headers.forEach(function (headerText) {
          var th = document.createElement('th');
          th.innerHTML = headerText;

          headerRow.appendChild(th);
        });

        var tbody = table.createTBody();
        for (var i = 0; i < condominos.length; i++) {
          var row = tbody.insertRow(i)
          var cellBloco = row.insertCell(0)
          var cellApto = row.insertCell(1)
          var cellNome = row.insertCell(2)
          var cellDDD = row.insertCell(3)
          var cellTelefone = row.insertCell(4)
          var cellEditar = row.insertCell(5)
          var cellVisualizar = row.insertCell(6)
          var cellDeletar = row.insertCell(7)

          cellNome.innerHTML = condominos[i].nome
          cellDDD.innerHTML = condominos[i].ddd
          cellTelefone.innerHTML = condominos[i].telefone
          cellBloco.innerHTML = condominos[i].bloco
          cellApto.innerHTML = condominos[i].apto
          cellVisualizar.innerHTML = '<button onclick="visualizar(\'' + condominos[i].id + '\')">Visualizar</button>'
          cellEditar.innerHTML = '<button onclick="editar(\'' + condominos[i].id + '\')">Editar</button>'
          cellDeletar.innerHTML = '<button onclick="deletar(\'' + condominos[i].id + '\')">Apagar</button>'
        }

        table.style.borderCollapse = 'collapse';
        table.style.border = '1px solid black';

        var cells = table.getElementsByTagName('td');
        for (var i = 0; i < cells.length; i++) {
          cells[i].style.border = '1px solid black';
        }

        var headers = table.getElementsByTagName('th');
        for (var i = 0; i < headers.length; i++) {
          headers[i].style.border = '1px solid black';
        }
      })
}

function novoCondomino() {
  document.getElementById("CadastroCondomino").style.display = "block"
  document.getElementById("ConsultarCondominos").style.display = "none"
  document.getElementById("novoCondomino").style.display = "none"
  document.getElementById('atualizar').style.display = "none"
}

function cancelar() {
  limpar()
  document.getElementById("CadastroCondomino").style.display = "none"
  document.getElementById("ConsultarCondominos").style.display = "block"
  document.getElementById("novoCondomino").style.display = "block"
  document.getElementById('salvar').style.display = "inline"
  document.getElementById('limpar').style.display = 'inline'
  document.getElementById('cancelar').innerHTML = 'Cancelar'
  document.getElementById('atualizar').style.display = 'none'
  document.getElementById('nome').disabled = false
  document.getElementById('ddd').disabled = false
  document.getElementById('telefone').disabled = false
  document.getElementById('email').disabled = false
  document.getElementById('bloco').disabled = false
  document.getElementById('apto').disabled = false
  document.getElementById('cpf').disabled = false
}

function editar(id) {
  document.getElementById("CadastroCondomino").style.display = "block"
  document.getElementById("ConsultarCondominos").style.display = "none"
  document.getElementById("novoCondomino").style.display = "none"
  document.getElementById('salvar').style.display = "none"
  document.getElementById('atualizar').style.display = 'inline'

  fetch("http://localhost:8080/condomino/" + id)
      .then(res => res.json())
      .then(res => {
        document.getElementById('id').value = res.id
        document.getElementById('nome').value = res.nome
        document.getElementById('ddd').value = res.ddd
        document.getElementById('telefone').value = res.telefone
        document.getElementById('email').value = res.email
        document.getElementById('bloco').value = res.bloco
        document.getElementById('apto').value = res.apto
        document.getElementById('cpf').value = res.cpf
        document.getElementById('nome').focus()
      })
}

function visualizar(id) {
  document.getElementById("CadastroCondomino").style.display = "block"
  document.getElementById("ConsultarCondominos").style.display = "none"
  document.getElementById("novoCondomino").style.display = "none"

  fetch("http://localhost:8080/condomino/" + id)
      .then(res => res.json())
      .then(res => {
        document.getElementById('id').value = res.id
        document.getElementById('nome').value = res.nome
        document.getElementById('ddd').value = res.ddd
        document.getElementById('telefone').value = res.telefone
        document.getElementById('email').value = res.email
        document.getElementById('bloco').value = res.bloco
        document.getElementById('apto').value = res.apto
        document.getElementById('cpf').value = res.cpf

        document.getElementById('nome').disabled = true
        document.getElementById('ddd').disabled = true
        document.getElementById('telefone').disabled = true
        document.getElementById('email').disabled = true
        document.getElementById('bloco').disabled = true
        document.getElementById('apto').disabled = true
        document.getElementById('cpf').disabled = true

        document.getElementById('salvar').style.display = 'none'
        document.getElementById('limpar').style.display = 'none'
        document.getElementById('atualizar').style.display = 'none'
        document.getElementById('cancelar').innerHTML = 'Voltar'
      })
}

function atualizar() {
  var id = document.getElementById('id').value
  var nome = document.getElementById('nome').value
  var ddd = document.getElementById('ddd').value
  var telefone = document.getElementById('telefone').value
  var email = document.getElementById('email').value
  var bloco = document.getElementById('bloco').value
  var apto = document.getElementById('apto').value
  var cpf = document.getElementById('cpf').value

  var dados = {
    nome: nome,
    ddd: ddd,
    telefone: telefone,
    email: email,
    bloco: bloco,
    apto: apto,
    cpf: cpf
  }

  fetch("http://localhost:8080/condomino/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dados)
  })
    .then(res => res.json())
    .then(res => {
      limpar()
      cancelar()
      carregarCondominos()
    })
    .catch(err => {
      console.error(err)
    })
}

function deletar(id) {
  fetch("http://localhost:8080/condomino/" + id, {
    method: "DELETE"
  })
    .then(res => carregarCondominos())
    .catch(err => {
      console.error(err)
    })
}