# Taquito Vue Template

A Vue 3 + TypeScript template for building Tezos dApps using Taquito and Beacon wallet integration.

## Features

- 🔗 **Wallet Integration**: Connect to Tezos wallets (Temple, Kukai, etc.) using Beacon
- ⚡ **Vue 3 + TypeScript**: Modern development with Composition API
- 🎨 **Tailwind CSS**: Utility-first styling framework
- 📦 **Pinia State Management**: Reactive wallet state management
- 🌐 **Multi-Network Support**: Easy switching between Tezos networks with environment variables

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- A Tezos wallet browser extension (Temple, Kukai, etc.)

### Installation

1. **Clone and install dependencies:**
   ```bash
   git clone <your-repo-url>
   cd taquito-vue-template
   npm ci
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your preferred network settings:
   ```bash
   # For Ghostnet (testnet)
   VITE_RPC_URL=https://rpc.ghostnet.teztnets.com
   VITE_NETWORK_TYPE=ghostnet
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   └── wallet-component.vue     # Basic wallet connection demo
├── stores/
│   └── walletStore.ts          # Pinia store for wallet state
├── App.vue                     # Main application component
├── main.ts                     # Application entry point
└── polyfills.ts               # Browser polyfills for crypto
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Learn More

- [Taquito Documentation](https://taquito.io/docs/)
- [Beacon Wallet Docs](https://docs.walletbeacon.io/)
- [Vue 3 Guide](https://vuejs.org/guide/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [Tezos Developer Resources](https://tezos.com/developers/)