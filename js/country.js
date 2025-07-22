
const countryStore = [];

class Country
{
    constructor(data = {})
    {
        this.name = data.name;
        this.code = data.code;
        this.zones = [];
    }
}


class CountryForm
{
  country = new Country();
  onsubmit() {
    const index = countryStore.findIndex(c => c.code === CountryForm.country.code);
    if (index > -1) {
      countryStore[index] = CountryForm.country;
    } else {
      countryStore.push(CountryForm.country);
    }
    CountryForm.country = new Country();
    m.route.set('/countries');
  }

  view() {
    return m('form', { onsubmit: e => { e.preventDefault(); CountryForm.onsubmit(); } }, [
      m('label', 'Nome do País'),
      m('input[type=text]', {
        value: CountryForm.country.name || '',
        oninput: e => CountryForm.country.name = e.target.value
      }),
      m('label', 'Código'),
      m('input[type=text]', {
        value: CountryForm.country.code || '',
        oninput: e => CountryForm.country.code = e.target.value
      }),
      m('button[type=submit]', 'Salvar País')
    ]);
  }
}


class CountryList
{
  view()
  {
    return m('div', [
      m('h2', 'Países'),
      m('button', { onclick: () => m.route.set('/countries/new') }, 'Novo País'),
      m('ul',
        countryStore.map(c => m('li', [
          `${c.name} (${c.code})`,
          m('button', {
            onclick: () => {
              CountryForm.country = c;
              m.route.set('/countries/edit');
            }
          }, 'Editar'),
          m('button', {
            onclick: () => {
              const i = countryStore.indexOf(c);
              countryStore.splice(i, 1);
            }
          }, 'Excluir'),
          // No botão "Excluir" do CountryList
          m('button', {
            onclick: () => {
                CountryForm.country = c;
                m.route.set('/countries/delete-country');
            }
          }, 'Excluir'),
          m('button', {
            onclick: () => {
              CountryForm.country = c;
              m.route.set('/countries/view');
            }
          }, 'Visualizar')
        ]))
      )
    ]);
  }
}

class CountryView
{
  view()
  {
    const c = CountryForm.country;
    return m('div', [
      m('h3', `País: ${c.name}`),
      m('p', `Código: ${c.code}`),
      m('p', `Zonas: ${c.zones.length}`),
      m('ul', c.zones.map(z => m('li', z))),
      m('button', { onclick: () => m.route.set('/countries') }, 'Voltar')
    ]);
  }
}

class CountryDelete
{
  view()
  {
    const c = CountryForm.country;
    return m('div', [
      m('h3', `Tem certeza que deseja excluir o país "${c.name}"?`),
      m('p', `Código: ${c.code}`),
      m('button', {
        onclick: () => {
          const index = countryStore.indexOf(c);
          if (index > -1) countryStore.splice(index, 1);
          CountryForm.country = new Country();
          m.route.set('/countries');
        }
      }, 'Sim, excluir'),
      m('button', {
        onclick: () => m.route.set('/countries')
      }, 'Cancelar')
    ]);
  }
}



