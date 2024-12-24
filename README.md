# WeatherApp 🌦️

## Descrição
**WeatherApp** é uma aplicação web que utiliza a API do OpenWeatherMap para exibir previsões meteorológicas em tempo real. Com uma interface moderna e responsiva, o projeto permite visualizar informações detalhadas sobre o clima atual e previsões futuras de forma organizada e intuitiva.

---

## Funcionalidades

- **Clima Atual e Previsão por 7 Dias**:
  - Exibição de temperatura atual, máxima, mínima e sensação térmica.
  - Informações adicionais, como umidade, pressão, visibilidade e velocidade do vento.
  - Previsões horárias para o dia atual.
  
- **Interface Responsiva**:
  - Ícones visuais que representam as condições climáticas do dia e da noite.
  - Skeleton loading enquanto os dados são carregados.

- **Busca Dinâmica**:
  - Alteração do local pesquisado com atualização em tempo real.

---

## Tecnologias Utilizadas

### Frontend
- **Next.js**: Framework para renderização server-side e geração de páginas estáticas.
- **React Query**: Manipulação de requisições assíncronas e cache de dados.
- **TailwindCSS**: Framework CSS para estilização rápida e responsiva.
- **Jotai**: Gerenciamento de estado global simples e eficaz.

### API
- **OpenWeatherMap API**: Fonte dos dados meteorológicos.

---

## Como Executar o Projeto

1. **Clone o repositório**:
   ```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
