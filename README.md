# Agendamento de Transferências Financeiras

Frontend para agendamento e consulta de transferências financeiras. Desenvolvido com Angular 21, consome a API REST do projeto `agendamento-transferencias-api`.

## Tecnologias

- Angular 21 / TypeScript 5.9
- Node.js 24.15
- Reactive Forms + Signals
- HttpClient
- CSS customizado

## Decisões arquiteturais

O componente principal utiliza a arquitetura standalone, padrão a partir do Angular 19, dispensando NgModules. A lógica de comunicação com a API foi isolada em `TransferenciaService`. O estado da lista de agendamentos é gerenciado com `signal`, evitando subscriptions manuais no template.

## Como executar

```bash
npm install
npm start
```

A aplicação sobe na porta `http://localhost:4200`.

Requer a API rodando em `http://localhost:8080`.

## Funcionalidades

- Agendamento de transferência informando conta de origem, conta de destino, valor e data
- Validação reativa com mensagens de erro inline
- Extrato de todos os agendamentos com valor, taxa, data de transferência e data de agendamento
