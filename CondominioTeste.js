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

  alert(JSON.stringify(dados))

  limpar()
}

function carregarCondominos() {
  document.getElementById("CadastroCondomino").style.display = "none"

  var condominos = [
    {
      id: 1,
      nome: 'João Silva',
      ddd: '11',
      telefone: '98765-4321',
      email: 'joao.silva@example.com',
      bloco: 'A',
      apto: '101',
      cpf: '123.456.789-00'
    },
    {
      id: 2,
      nome: 'Maria Souza',
      ddd: '21',
      telefone: '12345-6789',
      email: 'maria.souza@example.com',
      bloco: 'B',
      apto: '202',
      cpf: '987.654.321-00'
    },
    {
      id: 3,
      nome: 'Pedro Santos',
      ddd: '31',
      telefone: '55555-5555',
      email: 'pedro.santos@example.com',
      bloco: 'C',
      apto: '303',
      cpf: '111.222.333-44'
    }
  ]

  var table = document.getElementById('tableCondominos')
  table.innerHTML = ''

  var thead = table.createTHead();
  var headerRow = thead.insertRow(0);
  var headers = ['Bloco', 'Apartamento', 'Nome', 'DDD', 'Telefone', 'Editar', 'Visualizar', 'Apagar'];
  headers.forEach(function(headerText) {
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
    cellVisualizar.innerHTML = '<button onclick="visualizar(' + condominos[i].id + ')">Visualizar</button>'
    cellEditar.innerHTML = '<button onclick="editar(' + condominos[i].id + ')">Editar</button>'
    cellDeletar.innerHTML = '<button onclick="deletar(' + condominos[i].id + ')">Apagar</button>'
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
}

function novoCondomino() {
  document.getElementById("CadastroCondomino").style.display = "block"
  document.getElementById("ConsultarCondominos").style.display = "none"
  document.getElementById("novoCondomino").style.display = "none"
}

function cancelar() {
  limpar()
  document.getElementById("CadastroCondomino").style.display = "none"
  document.getElementById("ConsultarCondominos").style.display = "block"
  document.getElementById("novoCondomino").style.display = "block"
}