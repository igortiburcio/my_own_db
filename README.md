# my_own_db

Uma implementação simples de banco de dados em TypeScript, seguindo o tutorial [Let's Build a Simple Database](https://cstack.github.io/db_tutorial/).

## Sobre o Projeto

Este projeto é uma implementação educacional de um banco de dados do zero, com o objetivo de entender como bancos de dados funcionam internamente. A implementação inclui um REPL (Read-Eval-Print Loop) interativo que aceita comandos SQL e meta-comandos.

## Tecnologias

- **Runtime:** [Bun](https://bun.sh/)
- **Linguagem:** TypeScript
- **Linting:** ESLint
- **Formatação:** Prettier

## Estrutura do Projeto

```
src/
├── main.ts                    # Ponto de entrada e REPL principal
├── commands_handlers/         # Handlers de comandos
│   ├── metacommand_handler.ts # Handler para meta-comandos (.exit, etc)
│   └── sql_command_handler.ts # Handler para comandos SQL
├── enum/                      # Enumerações
├── types/                     # Definições de tipos
│   ├── input_buffer.ts        # Buffer de entrada do usuário
│   └── sql_statemente.ts      # Estrutura de statements SQL
└── utils/                     # Utilitários
    ├── sql_utils.ts           # Funções auxiliares SQL
    ├── string_utils.ts        # Manipulação de strings
    └── terminal_utils.ts      # I/O do terminal
```

## Funcionalidades

- **REPL Interativo:** Interface de linha de comando para interação com o banco
- **Meta-comandos:** Comandos especiais iniciados com `.` (ex: `.exit`)
- **Parsing SQL:** Interpretação de comandos SQL básicos
- **INSERT:** Preparação de statements de inserção
- **SELECT:** Preparação de statements de seleção

## Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd my_own_db

# Instale as dependências
bun install
```

## Uso

```bash
# Iniciar o banco de dados
bun start
```

### Comandos Disponíveis

| Comando                          | Descrição                 |
| -------------------------------- | ------------------------- |
| `insert <id> <username> <email>` | Insere uma nova linha     |
| `select`                         | Seleciona todas as linhas |
| `.exit`                          | Encerra o programa        |

### Exemplo

```
db > insert 1 user user@example.com
This is where we would do an insert.
EXECUTED
db > select
This is where we would do a select.
EXECUTED
db > .exit
```

## Scripts Disponíveis

```bash
bun start          # Executa o banco de dados
bun run lint       # Verifica problemas de linting
bun run lint:fix   # Corrige problemas de linting automaticamente
bun run format     # Formata o código com Prettier
bun run format:check # Verifica formatação
```

## Roadmap

- [ ] Persistência de dados em disco
- [ ] Implementação de B-Tree para indexação
- [ ] Suporte a mais tipos de dados
- [ ] Transações
- [ ] Mais comandos SQL (UPDATE, DELETE, WHERE)

## Referências

- [Let's Build a Simple Database](https://cstack.github.io/db_tutorial/) - Tutorial original em C
- [SQLite Architecture](https://www.sqlite.org/arch.html) - Arquitetura do SQLite

## Licença

Este projeto é apenas para fins educacionais.
