# 🌱 IrrigaFácil - Aplicativo Mobile

Sistema de Irrigação Inteligente para Pequenos Produtores em Tempos de Seca

## 👥 Integrantes do Grupo

- Robert Daniel da Silva Coimbra - RM555881 – Desenvolvedor Full Stack

- Marcos Antonio Ramalho Neto - RM554611 – Arquiteto de Solução / UX Designer

- Arthur Ramos Dos Santos - RM558798 – Desenvolvedor Full Stack / DevOps

## 🎥 Demonstração

📺 **Vídeo demonstrativo no YouTube:** [ADICIONE SEU LINK AQUI]

## 📱 Sobre o Aplicativo

O IrrigaFácil Mobile é parte de uma solução integrada que visa auxiliar pequenos e médios produtores rurais no enfrentamento de períodos de seca através de um sistema de irrigação inteligente e automatizada.

### 🎯 Funcionalidades Principais

- **Dashboard Inteligente**: Visão geral do sistema com alertas e estatísticas
- **Gerenciamento de Zonas**: CRUD completo para zonas de irrigação  
- **Monitoramento de Sensores**: Visualização em tempo real dos dados
- **Controle de Irrigação**: Ativação manual e automática
- **Perfil do Usuário**: Configurações pessoais

### 🚀 Tecnologias Utilizadas

- **React Native** - Framework principal
- **Expo Router** - Navegação entre telas
- **TypeScript** - Tipagem estática
- **Axios** - Integração com API REST
- **AsyncStorage** - Armazenamento local
- **Expo Vector Icons** - Biblioteca de ícones

## 🚀 Como Executar

### Pré-requisitos
- Node.js 16+
- Expo CLI
- Emulador ou dispositivo físico

### Instalação
```bash
# Clone o repositório
git clone [URL_DO_SEU_REPOSITORIO]

# Entre na pasta do projeto
cd IrrigaFacilApp

# Instale as dependências
npm install

# Execute o projeto
npx expo start
```

### Configuração da API
1. Edite o arquivo `src/services/api.ts`
2. Altere a `API_BASE_URL` para o endereço da sua API
3. Certifique-se de que a API está rodando e acessível

## 📋 Telas Implementadas

1. **Dashboard** (index.tsx) - Painel Principal  
2. **Zonas** (explore.tsx) - Gerenciamento de Zonas com CRUD
3. **Sensores** (sensors.tsx) - Monitoramento em tempo real
4. **Irrigação** (irrigation.tsx) - Controle de irrigação
5. **Perfil** (profile.tsx) - Configurações do usuário

## 🎨 Design System

- **Primária**: Verde floresta (#2E8B57)
- **Secundária**: Azul céu (#87CEEB)  
- **Accent**: Dourado (#FFD700)
- **Sucesso**: Verde limão (#32CD32)
- **Alerta**: Laranja (#FFA500)
- **Perigo**: Vermelho (#DC143C)

## 📊 Features Implementadas

### ✅ Navegação (10 pontos)
- [x] 5+ telas com navegação fluida
- [x] Expo Router com Tabs Navigation
- [x] TypeScript completo

### ✅ CRUD com API (40 pontos)  
- [x] Create: Criação de zonas
- [x] Read: Listagem de dados
- [x] Update: Edição de zonas
- [x] Delete: Exclusão com confirmação
- [x] Integração com API REST
- [x] Tratamento de erros

### ✅ Estilização (10 pontos)
- [x] Design system consistente
- [x] Cores temáticas personalizadas
- [x] Layout responsivo

### ✅ Arquitetura (20 pontos)
- [x] Estrutura TypeScript organizada
- [x] Separação de responsabilidades  
- [x] Código tipado e limpo

### ✅ Demonstração (20 pontos)
- [x] Todas as funcionalidades implementadas
- [x] Interface responsiva e funcional

## 🔧 Melhorias Implementadas

- ✅ **TypeScript**: Tipagem completa para melhor manutenibilidade
- ✅ **Interfaces**: Definição clara de tipos de dados
- ✅ **Error Handling**: Tratamento robusto de erros
- ✅ **Responsividade**: Layout adaptável
- ✅ **Performance**: Código otimizado

## 🤝 Contribuições

Este projeto foi desenvolvido como parte da **Global Solution FIAP 2024** para a disciplina de **Mobile Application Development**.

---

**Global Solution FIAP 2024** - Desenvolvido com 💚 para um futuro mais sustentável
