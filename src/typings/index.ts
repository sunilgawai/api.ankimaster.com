namespace Express {
	interface Request {
		salesman: {
			username: string;
			salesman_id: string;
		};
		isAdmin: boolean;
		isSuperAdmin: boolean;
		user: any;
		Shop_Code: string;
	}
}

export interface IQueryParams {
	table_id: number;
	item_id: number;
	query: "increase" | "decrease";
}

export interface IJwtPayload {
	salesman_id: string;
	username: string;
}

export interface ITable {
	id: number;
	Shop_Code: string;
	cart_table_id: string;
	cart_table_name: string;
	Cart: ICart;
}

export interface ICart {
	id?: number;
	cart_table_id?: number;

	customer_first_name?: string;
	customer_last_name?: string;
	customer_mobile?: string;
	customer_email?: string;
	customer_reference_by?: string;
	customer_address?: string;
	gst?: string;
	delivery_type_id: number;
	total_price: number;
	payment_method: string;
	payment_status: string;

	Cart_items: ICartItem[];
}

export interface ICartItem {
	id?: number;
	cart_id?: number;
	itemmaster_id: number;
	quantity: number;
	name?: string;
	product_price: number;

	is_special: boolean;
	advanced_weight?: number;
	advanced_flavour_id?: number;
	advanced_shape_id?: number;
	advanced_item_egg_status?: boolean;
}

export interface IOrder {
	shop_code: string;
	customer_first_name: string;
	customer_last_name: string;
	customer_email?: string;
	customer_mobile?: string;

	customer_reference_by?: string;
	customer_address?: string;
	gst?: string;

	delivery_type_id: number;

	order_price?: string;
	payment_method: string;
	payment_status: string;

	// order_items: ICartItem[]
	cartId: string;
}
