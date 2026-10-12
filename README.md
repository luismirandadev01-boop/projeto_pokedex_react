# Pokédex

Aplicação web de página única (SPA) que consome a [PokéAPI](https://pokeapi.co/) para listar Pokémon, buscar por nome ou número e ver os detalhes de cada um.

🔗 **Demo online:** 

![Captura de tela da Pokédex](docs/screenshot.png)

## Funcionalidades

- Lista de Pokémon em cards coloridos de acordo com o tipo principal
- **Paginação com botão "Carregar mais"** (24 por vez) e contador de quantos estão sendo exibidos
- **Busca** por qualquer trecho do nome (ex.: `chu`) ou pelo número exato (ex.: `25`)
- **Modal de detalhes** com arte oficial, tipos, status base, altura, peso, experiência base e habilidades
- Estados de carregamento, de erro e de "nenhum pokémon encontrado"
- Se o carregamento de uma página falhar, a lista atual é mantida e há o botão "Tentar novamente"

## Tecnologias

- [React 18](https://react.dev/) com Hooks (`useState`, `useEffect`, `useCallback`, `useRef`) e um hook próprio (`usePokemon`)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- CSS Modules
- [PokéAPI](https://pokeapi.co/) (API pública, sem chave de acesso)

## Como rodar

Pré-requisito: [Node.js](https://nodejs.org/) 18 ou superior.

```bash
# 1. clonar o repositório
git clone [url-do-seu-repositorio]
cd [nome-da-pasta]

# 2. instalar as dependências
npm install

# 3. iniciar em modo de desenvolvimento
npm run dev
```

Abra o endereço mostrado no terminal (normalmente http://localhost:5173).

## Estrutura do projeto

```
src/
├── components/   # Header, SearchBar, PokemonList, PokemonCard, PokemonModal
├── hooks/        # usePokemon: estado, paginação e busca
├── services/     # api: comunicação com a PokéAPI
├── types/        # interfaces TypeScript (Pokemon, PokemonListItem)
├── utils/        # cores por tipo e funções auxiliares
├── App.tsx
└── main.tsx
```
## Créditos

- Dados fornecidos pela [PokéAPI](https://pokeapi.co/).
- Pokémon e os nomes dos personagens são marcas de Nintendo, Game Freak e The Pokémon Company. Este é um projeto de estudo, sem fins lucrativos.

## Autor

Luis Gustavo Miranda Feitosa · [LinkedIn] https://linkedin.com/in/luis-gustavo-miranda-feitosa · [GitHub] https://github.com/luismirandadev01-boop
