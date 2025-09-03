import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { BeaconWallet } from "@taquito/beacon-wallet"
import { TezosToolkit } from "@taquito/taquito"

/**
 * Wallet Store for Tezos dApp
 * 
 * This Pinia store manages wallet connection state, address, balance, and provides
 * methods for wallet operations. It serves as the central state management for
 * all wallet-related functionality in the application.
 * 
 * Key Features:
 * - Beacon wallet integration for multiple wallet support
 * - Balance fetching on connection
 * - Error handling
 * - Reactive state updates across components
 */
export const useWalletStore = defineStore('wallet', () => {
	// Initialize Tezos toolkit with RPC URL from environment
	const Tezos = ref<TezosToolkit>(new TezosToolkit(import.meta.env.VITE_RPC_URL));

	// Reactive state for wallet connection
	const wallet = ref<BeaconWallet>();
	const address = ref<string>();
	const balance = ref<BigNumber>();

	// Computed getters for reactive access to state
	const getTezos = computed(() => Tezos.value);
	const getWallet = computed(() => wallet.value);
	const getAddress = computed(() => address.value);
	const getBalance = computed(() => balance.value);

	/**
	 * Initializes the BeaconWallet using the network configuration from environment variables.
	 * Requests wallet permissions and sets the wallet as the provider for the Tezos instance.
	 *
	 * @async
	 * @returns {Promise<void>} Resolves when the wallet is initialized and permissions are granted.
	 *
	 * @throws {ReferenceError} If a wallet is already initialized in this session.
	 * @throws {Error} If wallet initialization or permission request fails (e.g., user cancels the wallet popup).
	 */
	const initializeWallet = async (): Promise<void> => {
		if (wallet.value) {
			console.error("Failed to initialize wallet due to a wallet already being initialized in this session.")
			throw new ReferenceError("Failed to initialize wallet: a wallet is already initialized.")
		}

		try {
			const options = {
				name: 'Taquito Playground',
				iconUrl: 'https://tezostaquito.io/img/favicon.svg',
				network: {
					type: import.meta.env.VITE_NETWORK_TYPE,
				},
			};

			wallet.value = new BeaconWallet(options);
			await wallet.value.requestPermissions();
			address.value = await wallet.value.getPKH();
			Tezos.value.setWalletProvider(wallet.value);
			await fetchBalance();
		} catch (error) {
			console.error("Failed to initialize wallet or request permissions:", error);
			throw error;
		}
	}

	/**
	 * Disconnects the currently connected wallet.
	 *
	 * This function clears the active account from the wallet client
	 * and resets the wallet, address, and balance state to `undefined`.
	 *
	 * @throws {ReferenceError} If no wallet is currently connected.
	 * @throws {Error} If an error occurs during disconnection.
	 */
	const disconnectWallet = async () => {
		if (!wallet.value) {
			throw new ReferenceError('Failed to disconnect wallet. No wallet currently connected');
		}

		try {
			await wallet.value.client.clearActiveAccount();
			wallet.value = undefined;
			address.value = undefined;
			balance.value = undefined;
		} catch (error) {
			console.error("Error disconnecting wallet:", error);
			throw error;
		}
	};

	/**
	 * Asynchronously fetches the balance for the current wallet address from the Tezos network and updates the `balance` state value.
	 *
	 * @throws {ReferenceError} If there is no saved address to fetch the balance for.
	 * @throws {Error} If an error occurs while fetching the balance from the Tezos network.
	 */
	const fetchBalance = async () => {
		if (!address.value) {
			console.log("Could not fetch balance as there is no saved address.")
			throw new ReferenceError("Could not fetch balance: no address")
		}

		try {
			balance.value = await Tezos.value.tz.getBalance(address.value);
		} catch (error) {
			console.error("Error fetching balance:", error);
			throw error;
		}
	}

	return {
		getTezos,
		getAddress,
		getBalance,
		getWallet,
		initializeWallet,
		disconnectWallet,
		fetchBalance
	}
})