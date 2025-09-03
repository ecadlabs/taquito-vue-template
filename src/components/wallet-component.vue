<!-- 
	This component demonstrates basic wallet connection functionality for Tezos blockchain.
	It provides a simple UI to connect/disconnect wallets using Beacon and to display wallet information.
	
	Features:
	- Connect to Tezos wallet (Temple, Kukai, etc.)
	- Display wallet address when connected
	- Show Tez balance in a user-friendly format
	- Disconnect wallet functionality
-->
<template>
	<div class="flex flex-col text-center">
		<!-- Connect Wallet Button - Only shown when no wallet is connected -->
		<button v-if="!address" @click="connect()"
			class="bg-black/75 text-white px-3 py-1.5 rounded-lg hover:cursor-pointer">
			Connect Wallet
		</button>

		<!-- Disconnect Wallet Button - Only shown when wallet is connected -->
		<button v-else @click="disconnect()"
			class="bg-black/75 text-white px-3 py-1.5 rounded-lg hover:cursor-pointer self-center mb-4">
			Disconnect Wallet
		</button>

		<!-- Display wallet address when connected -->
		<p v-if="address" class="text-gray-500">Wallet Address: {{ address }}</p>

		<!-- Display Tez balance - converts from mutez (smallest unit) to Tez -->
		<p v-if="balance" class="text-orange-400">Tez Balance: {{ `${balance.toNumber() / 1000000} ꜩ` }}</p>
	</div>
</template>

<script setup lang="ts">
import { useWalletStore } from '@/stores/walletStore';
import { computed } from 'vue';

// Get the wallet store (we're using a Pinia store for state management)
// Learn more: https://pinia.vuejs.org/introduction.html
const walletStore = useWalletStore();

/**
 * Computed properties that reactively update when wallet state changes
 */

// Get the current wallet address (returns null if not connected)
const address = computed(() => walletStore.getAddress)

// Get the current wallet balance in mutez (Tezos smallest unit)
const balance = computed(() => walletStore.getBalance)

/**
 * Connect to a Tezos wallet
 * 
 * This function triggers the wallet connection flow via Beacon, which will:
 * 1. Prompt user to select a wallet (Temple, Kukai, etc.)
 * 2. Request permission to connect
 * 3. Fetch wallet address and balance
 * 4. Update the store with wallet information
 */
const connect = async () => {
	await walletStore.initializeWallet();
}

/**
 * Disconnect the current wallet
 * 
 * This function:
 * 1. Clears the wallet connection
 * 2. Resets address and balance in the store
 * 3. Computed properties above then update UI to show disconnected state
 */
const disconnect = async () => {
	await walletStore.disconnectWallet();
}
</script>