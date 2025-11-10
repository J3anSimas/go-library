
## 📚 Library Management System

O **Library Management System** é uma aplicação web projetada para gerenciar o fluxo de empréstimos, assinaturas e pagamentos de uma biblioteca moderna.
O sistema permite que **clientes se cadastrem, assinem planos de uso e realizem empréstimos de livros**, controlando prazos, devoluções e possíveis multas de forma integrada.

### 🎯 **Objetivo**

Oferecer uma solução completa e escalável para administração de bibliotecas, com foco em **experiência do usuário, rastreabilidade das transações e automação de regras de negócio**.

---

### 🏗️ **Principais funcionalidades**

* **Autenticação e cadastro de usuários**

  * Registro de clientes e empregados com confirmação por e-mail
  * Login via e-mail/senha e OAuth (Google)

* **Gestão de livros**

  * Catálogo completo com categorias hierárquicas (analíticas e sintéticas)
  * Controle de estoque por exemplar

* **Empréstimos (Loans)**

  * Cada livro emprestado gera um registro de *loan* vinculado ao cliente
  * Controle de data de empréstimo, data prevista de devolução e status (`borrowed`, `returned`, `overdue`)
  * Cálculo automático de multas por atraso

* **Pagamentos**

  * Integração com diferentes métodos de pagamento (PIX, cartão via maquininha, dinheiro)
  * Registro de pagamentos tanto de **assinaturas** quanto de **multas**
  * Associação entre `payments` e a entidade que originou a cobrança (`subscription`, `fine`)

* **Assinaturas (Subscriptions)**

  * Planos mensais ou anuais
  * Controle de vigência e status de pagamento
  * Relacionamento direto com usuários e histórico de transações

* **Painel administrativo (opcional)**

  * Gerenciamento de livros, clientes, empréstimos e pagamentos
  * Relatórios de uso e estatísticas de multas e devoluções

---

### 🧩 **Modelagem de dados (visão geral)**

Principais entidades:

* `users` – clientes e funcionários
* `books` – catálogo de livros
* `loans` – empréstimos por exemplar
* `payments` – registros de pagamentos (assinaturas e multas)
* `subscriptions` – planos ativos dos clientes

Relacionamentos:

* **1:N** entre `users` → `loans`
* **1:N** entre `books` → `loans`
* **1:N** entre `users` → `subscriptions`
* **1:N** entre `subscriptions` → `payments`
* **1:N** entre `loans` → `payments` (para multas)

---

### 🛠️ **Stack recomendada**

* **Backend:** Spring Boot (Java)
* **Banco de dados:** PostgreSQL
* **Containerização:** Docker Compose
* **Frontend:** React (ou outro SPA moderno)
* **Integração futura:** Redis (cache) e RabbitMQ (notificações de devolução e alertas de multa)

---

### 💡 **Diferenciais técnicos**

* Arquitetura em camadas (domain → service → controller)
* Boas práticas de modelagem e normalização
* Suporte a múltiplos métodos de pagamento
* Foco em extensibilidade e clareza de relacionamento entre entidades

---

### 🚀 **Possíveis extensões**

* Envio automático de lembretes por e-mail/WhatsApp para devoluções
* Geração de relatórios de performance de leitura e histórico de empréstimos
* Módulo de recomendação de livros baseado no histórico de empréstimos

---



## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
