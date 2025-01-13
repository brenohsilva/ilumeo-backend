# Folha de Ponto - Backend

Este projeto é o backend de uma aplicação de folha de ponto, desenvolvido com Node.js e NestJS. Ele utiliza PostgreSQL como banco de dados, Prisma como ORM, e Docker Compose para containerização. Também inclui testes automatizados escritos com Jest.

## Características Principais

- **Framework:** NestJS
- **Banco de Dados:** PostgreSQL
- **ORM:** Prisma
- **Containerização:** Docker Compose
- **Testes Automatizados:** Jest
- **Autenticação:** Baseada em tokens JWT


## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- [Node.js](https://nodejs.org/) (v18 ou superior)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Configuração do Ambiente

1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
   ```

2. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz do projeto e defina as variáveis necessárias, como:
   ```env
   DATABASE_URL=postgresql://postgres:admin@db:5432/ilumeo
   ```

## Como Executar a Aplicação

### Com Docker Compose

1. Certifique-se de que o Docker e o Docker Compose estão instalados.

2. Execute o seguinte comando para iniciar os contêineres:
   ```bash
   docker-compose up --build
   ```

3. Acesse a aplicação no endereço:
   ```
   http://localhost:3000
   ```

### Sem Docker

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Gere os arquivos do Prisma:
   ```bash
   npx prisma generate
   ```

4. Inicie o servidor:
   ```bash
   npm run start:dev
   ```

5. Acesse a aplicação no endereço:
   ```
   http://localhost:3000
   ```

## Executando Testes

Para executar os testes automatizados:

```bash
npm run test
```

Para visualizar a cobertura de testes:

```bash
npm run test:cov
```

## Endpoints Principais

### Autenticação
- **POST** `/auth/login` - Login do usuário e obtenção de token JWT

### Funcionários
- **GET** `/employees/profile` - Obter informações do funcionário logado
- **GET** `/employees/balances` - Obter saldo de horas trabalhadas

### Registros de Ponto
- **POST** `/records` - Registrar ponto
- **GET** `/records/today` - Obter registros do dia atual

## Seed do Prisma

Para popular o banco de dados com dados iniciais, execute o seguinte comando:

```bash
npx prisma db seed
```

O arquivo `prisma/seed.ts` contém o script de seed. Certifique-se de ajustar os dados conforme necessário:

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.employees.create({
    data: {
      name: 'Funcionário Exemplo',
      code: '123456',
    },
  });

  console.log('Seed executado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

## Tecnologias Utilizadas

- **Node.js**
- **NestJS**
- **PostgreSQL**
- **Prisma ORM**
- **Docker & Docker Compose**
- **Jest** (testes automatizados)

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e enviar pull requests.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

