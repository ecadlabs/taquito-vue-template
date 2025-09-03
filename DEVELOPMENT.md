# Development Guide

This guide will help you extend the Taquito Vue template to build your own Tezos dApp.

## Getting Started

### Understanding the Architecture

The template follows Vue 3 best practices with a clear separation of concerns:

- **Components**: UI components for user interaction
- **Stores**: Pinia stores for state management

### Key Files to Understand

1. **`src/stores/walletStore.ts`**: Central state management for wallet operations
2. **`src/components/wallet-component.vue`**: Example wallet integration component
4. **`src/polyfills.ts`**: Browser compatibility for crypto operations

## Environment Configuration

### Network Switching

The template supports multiple networks through environment variables:

```bash
# .env for Ghostnet (testnet)
VITE_RPC_URL=https://rpc.ghostnet.teztnets.com
VITE_NETWORK_TYPE=ghostnet

# .env for Seoulnet
VITE_RPC_URL=https://rpc.seoulnet.teztnets.com
VITE_NETWORK_TYPE=seoulnet
```

### Contract Interaction Errors

```typescript
const handleContractError = (error: unknown) => {
  if (error instanceof Error) {
    if (error.message.includes('insufficient balance')) {
      showNotification('Insufficient balance for transaction');
    } else if (error.message.includes('invalid parameter')) {
      showNotification('Invalid parameters provided');
    } else {
      showNotification('Transaction failed: ' + error.message);
    }
  }
};
```

## Deployment

### Building for Production

```bash
# Install dependencies
npm ci

# Build for production
npm run build

# Preview the build
npm run preview
```

## Best Practices

### 1. State Management

- Keep wallet state in the store
- Use computed properties for reactive data
- Handle errors gracefully with user feedback

### 2. User Experience

- Show loading states during operations
- Provide clear error messages
- Implement proper transaction confirmations

### 3. Security

- NEVER store private keys in the frontend
- Validate all user inputs
- Use proper error boundaries

### 4. Performance

- Lazy load components when possible
- Minimize RPC calls

## Troubleshooting

### Common Issues

1. **Buffer not defined**: Ensure polyfills are imported in main.ts
2. **Wallet not connecting**: Check network configuration in .env
3. **RPC errors**: Verify RPC URL is accessible and correct

## Resources

- [Taquito Documentation](https://taquito.io/docs/)
- [Beacon Wallet Docs](https://docs.walletbeacon.io/)
- [Vue 3 Guide](https://vuejs.org/guide/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [Tezos Developer Resources](https://tezos.com/developers/)
