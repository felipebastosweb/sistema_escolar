

class Company
{
    constructor(data = {})
    {
        this.name = data.nome || '';
        this.name_fantasy = data.nome_fantasia || '';
        this.federal_number = data.nome || '';

        // Localização e infraestrutura
        this.endereco = {
            rua: data.endereco?.rua || '',
            numero: data.endereco?.numero || '',
            bairro: data.endereco?.bairro || '',
            cidade: data.endereco?.cidade || '',
            estado: data.endereco?.estado || '',
            cep: data.endereco?.cep || ''
        };
        
        this.telephone = data.telefoneContato || '';
        this.email = data.emailContato || '';
    }

}



