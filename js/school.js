
const schoolStore = [];

class School extends Company {
    
  constructor(data = {}) {
    // Dados básicos da escola
    this.codigoINEP = data.codigoINEP || '';
    this.tipoEscola = data.tipoEscola || 'Pública';
    this.dependenciaAdministrativa = data.dependenciaAdministrativa || 'Municipal'; // Municipal, Estadual, Federal
    this.nivelEnsino = data.nivelEnsino || 'Fundamental';
    this.modalidade = data.modalidade || 'Presencial'; // Presencial, EAD, etc.
    this.segmentos = data.segmentos;

    // Recursos humanos
    this.quantidadeProfessores = data.quantidadeProfessores || 0;
    this.quantidadeFuncionarios = data.quantidadeFuncionarios || 0;

    this.gestores = data.gestores || {
      diretor: '',
      coordenador: '',
      secretario: ''
    };

    this.zona = data.zona || 'Urbana'; // Urbana ou Rural
    this.localizacaoDiferenciada = data.localizacaoDiferenciada || false;

    // Dados do Censo Escolar (EducaCenso)
    this.numeroSalasAula = data.numeroSalasAula || 0;
    this.numeroBanheiros = data.numeroBanheiros || 0;
    this.possuiBiblioteca = data.possuiBiblioteca || false;
    this.possuiLaboratorioInformatica = data.possuiLaboratorioInformatica || false;
    this.possuiAcessibilidade = data.possuiAcessibilidade || false;
    this.ofereceAlimentacao = data.ofereceAlimentacao || false;
    this.ofereceTransporteEscolar = data.ofereceTransporteEscolar || false;


    // Matrículas e turmas
    this.matriculas = data.matriculas || 0;
    this.numeroTurmas = data.numeroTurmas || 0;
    this.periodoFuncionamento = data.periodoFuncionamento || 'Integral'; // Integral, Parcial, etc.

    // Dados adicionais
    this.participaProgramasGoverno = data.participaProgramasGoverno || []; // e.g. ['Mais Educação', 'PDDE']
  }
}


class SchoolForm {
  school = new School();

  onsubmit(vnode)
  {
    const index = schoolStore.findIndex(s => s.codigoINEP === SchoolForm.school.codigoINEP);
    if (index > -1) {
      schoolStore[index] = SchoolForm.school;
    } else {
      schoolStore.push(SchoolForm.school);
    }
    SchoolForm.school = new School(); // Resetar o formulário
    m.route.set('/schools/list');
  }

  view()
  {
    return m('form', { onsubmit: e => { e.preventDefault(); SchoolForm.onsubmit(); } }, [
      m('label', 'Nome'), m('input[type=text]', {
        value: SchoolForm.school.nome,
        oninput: e => SchoolForm.school.nome = e.target.value
      }),
      m('label', 'Código INEP'), m('input[type=text]', {
        value: SchoolForm.school.codigoINEP,
        oninput: e => SchoolForm.school.codigoINEP = e.target.value
      }),
      m('button[type=submit]', 'Salvar')
    ]);
  }
}

class SchoolList {
  view()
  {
    return m('div', [
      m('h2', 'Lista de Escolas'),
      m('button', { onclick: () => m.route.set('/new') }, 'Nova Escola'),
      m('ul',
        schoolStore.map(s => m('li', [
          `${s.nome} (${s.codigoINEP})`,
          m('button', {
            onclick: () => {
              SchoolForm.school = s;
              m.route.set('/edit');
            }
          }, 'Editar'),
          m('button', {
            onclick: () => {
              const i = schoolStore.indexOf(s);
              schoolStore.splice(i, 1);
            }
          }, 'Excluir')
        ]))
      )
    ]);
  }
}

class SchoolView {
  view()
  {
    const school = SchoolForm.school;
    return m('div', [
      m('h3', `Escola: ${school.nome}`),
      m('p', `INEP: ${school.codigoINEP}`),
      m('p', `Dependência: ${school.dependenciaAdministrativa}`),
      m('button', { onclick: () => m.route.set('/list') }, 'Voltar')
    ]);
  }
}

m.route(document.getElementById('SchoolScreen'), '/schools/index', {
  '/schools/index': SchoolList,
  '/schools/new': SchoolForm,
  '/schools/edit': SchoolForm,
  '/schools/view': SchoolView
});