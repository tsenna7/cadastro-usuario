# 📦 Mock API com json-server

Este projeto utiliza o **json-server** para simular uma API REST localmente durante o desenvolvimento.

## ✅ Pré-requisitos

- Node.js **v24.13.1**
- npm (instalado junto com o Node)

## 📥 Instalação

Instale as dependências do projeto:

```bash
npm install
```

Para iniciar o servidor, execute:

```bash
npm run mock
```

Após a execução, a API estará disponível em:

```
http://localhost:3000
```

## 🧪 Exemplo de db.json

```json
{
  "users": [
    {
      "id": "d7033ec9-bcfa-42f5-b978-bd3f40c1e9ae",
      "name": "Thiago",
      "lastName": "Sena",
      "gender": {
        "id": 1,
        "name": "Masculino"
      },
      "zipcode": "89037-656",
      "state": "Santa Catarina",
      "city": "Blumenau",
      "street": "Rua Carmelo Bogo",
      "neighbourhood": "Escola Agrícola",
      "number": 74,
      "complement": "apto 301"
    }
  ]
}
```