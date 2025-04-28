# 📄 README.md para o projeto AgroVerde Logística

```markdown
# Sistema de Gestão de Frota e Entregas - AgroVerde Logística

### 🚚 Projeto de controle de frota, entregas e motoristas para empresas de transporte de alimentos perecíveis.

---

## 📋 Descrição

Este projeto foi desenvolvido para a empresa **AgroVerde Logística**, que realiza o transporte de frutas, vegetais e carnes no interior de São Paulo.

O sistema visa **otimizar a operação logística**, resolvendo problemas como:
- Falta de controle de manutenção dos caminhões
- Atrasos de entrega por falha na comunicação
- Falta de visibilidade sobre status de entregas para clientes
- Ausência de históricos de manutenção e consumo de combustível

**Principais Funcionalidades:**
- Cadastro de caminhões, motoristas e entregas
- Controle de manutenção e alertas preventivos
- Dashboard de monitoramento de entregas
- App mobile para motoristas iniciarem/finalizarem entregas
- Sistema de notificações de manutenção
- Geração de relatórios mensais de entregas e combustível

---

## 🛠️ Tecnologias Utilizadas

| Camada | Stack |
|:---|:---|
| Backend | [NestJS](https://nestjs.com/) + [MongoDb](https://www.mongodb.com//) |
| Autenticação | JWT (JSON Web Tokens) |
| Hospedagem (simulada) | Vercel

---

## 🚀 Funcionalidades Implementadas

### Painel Web (Admin)

- Login de Administrador
- Dashboard geral com indicadores:
  - Entregas em andamento, pendentes e finalizadas
  - Caminhões ativos
  - Alertas de manutenção
- Cadastro de Caminhões:
  - Placa, tipo, capacidade, última revisão, próxima revisão
- Cadastro de Motoristas
- Cadastro de Entregas:
  - Origem, destino, horário agendado
  - Atribuição de motorista
- Controle de Manutenção:
  - Agendar manutenções
  - Gerar alertas preventivos
- Relatórios:
  - Histórico de entregas
  - Consumo de combustível (manual no MVP)

### App Mobile (Motorista)

- Login de Motorista
- Listagem de entregas do dia
- Botões de:
  - **Iniciar Entrega**
  - **Finalizar Entrega**
- Notificações push de manutenção
- Visualização de entregas em andamento e entregas concluídas

---

## 🧱 Estrutura do Projeto

```bash
backend/
├── src/
│   ├── auth/            # Autenticação JWT
│   ├── user/           # Cadastro de usuários (motoristas e admins)
│   ├── trucks/          # Cadastro de caminhões
│   ├── deliveries/      # Controle de entregas
│   ├── maintenance/     # Controle de manutenção
│   └── dashboard/       # Dashboard geral
---

## 📦 Instalação

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/agroverde-logistica.git
cd agroverde-logistica
```

### 2. Rodar o Backend

```bash
cd backend
npm install
cp .env.example .env
# Configure o .env com seu banco PostgreSQL local
npm run start:dev
```
---

## ⚙️ Configuração de Ambiente

Backend (`backend/.env`):

```env
DATABASE_URL=mongodb://user:password@localhost:5432/agroverde
JWT_SECRET=your_secret_key
```

Frontend e Mobile:

- Configurar API base URL para o backend local

---

## 🧪 Testes

- Backend:
  ```bash
  cd backend
  npm run test
  ```
---

## 🧩 Melhorias Futuras

- Geolocalização em tempo real no app
- Upload de comprovantes de entrega (foto)
- Dashboard avançado com filtros por data e motorista
- Histórico de manutenções por caminhão
- Integração com serviços de email/SMS para alertas


---

## 📑 Licença

Este projeto é de uso livre para fins de estudo e portfólio.

---

# 🌟 Créditos
Desenvolvido por Danilo Nogueira Silva 
Contato: danilo.nogueira1802@gmail.com

---