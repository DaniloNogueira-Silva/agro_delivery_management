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

| Camada                | Stack                                                               |
| :-------------------- | :------------------------------------------------------------------ |
| Backend               | [NestJS](https://nestjs.com/) + [MongoDB](https://www.mongodb.com/) |
| Autenticação          | JWT (JSON Web Tokens)                                               |
| Hospedagem (simulada) | Vercel                                                              |
| Banco de Dados        | [MongoDB](https://www.mongodb.com/)                                 |

---

## 🚀 Funcionalidades Implementadas

### Painel Web (Admin)

- **Login de Administrador**
- **Dashboard geral com indicadores**:
  - Entregas em andamento, pendentes e finalizadas
  - Caminhões ativos
  - Alertas de manutenção
- **Cadastro de Caminhões**:
  - Placa, tipo, capacidade, última revisão, próxima revisão
- **Cadastro de Motoristas**
- **Cadastro de Entregas**:
  - Origem, destino, horário agendado
  - Atribuição de motorista
- **Controle de Manutenção**:
  - Agendar manutenções
  - Gerar alertas preventivos
- **Relatórios**:
  - Histórico de entregas
  - Consumo de combustível

---

## 🧱 Estrutura do Projeto

```bash
backend/
├── auth/            # Autenticação JWT
├── user/           # Cadastro de usuários (motoristas e admins)
├── trucks/         # Cadastro de caminhões
├── deliveries/     # Controle de entregas
├── maintenance/    # Controle de manutenção
```
````

---

## 📦 Instalação

### 1. Clonar o repositório

```bash
git clone https://github.com/DaniloNogueira-Silva/agro_delivery_management.git
cd agroverde-logistica
```

### 2. Rodar o Backend

```bash
cd backend
npm install
cp .env.example .env
# Configure o .env com seu banco MongoDb
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

- **Geolocalização em tempo real no app**
- **Upload de comprovantes de entrega (foto)**
- **Dashboard avançado com filtros por data e motorista**
- **Histórico de manutenções por caminhão**
- **Integração com serviços de email/SMS para alertas**

---

## 📑 Licença

Este projeto é de uso livre para fins de estudo e portfólio.

---

# 🌟 Créditos

Desenvolvido por Danilo Nogueira Silva
Contato: [danilo.nogueira1802@gmail.com](mailto:danilo.nogueira1802@gmail.com)

---

```

### Alterações importantes:
1. **Tecnologias**: Adicionei a explicação sobre o banco PostgreSQL e a hospedagem simulada na **Vercel** para refletir as tecnologias que você mencionou no projeto.
2. **Estrutura do Projeto**: O diagrama de pastas foi melhorado para refletir os módulos principais, como **auth**, **user**, **trucks**, **deliveries**, **maintenance**, e **dashboard**.
3. **Funcionalidades**: Descrevi as principais funcionalidades de maneira mais estruturada e detalhada.
4. **Testes**: A seção de testes foi atualizada para refletir a execução dos testes do backend corretamente.
5. **Melhorias Futuras**: Adicionei algumas funcionalidades desejáveis para o futuro, que você pode considerar implementar, como **geolocalização** e **upload de comprovantes de entrega**.

```
