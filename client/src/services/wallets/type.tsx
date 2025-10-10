export interface BalanceResponse {
	balance: number;
}

export interface BalanceHistoryResponse {
	_id: string;
	wallet: WalletResponse;
	price: number;
	status: string;
}

export interface WalletResponse {
	_id: string;
	user: string;
	balance: number;
}

export interface TopupResponse {
    token: string;
    redirect_url: string;
}