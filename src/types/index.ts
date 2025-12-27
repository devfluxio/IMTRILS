
export interface ProductImage {
	imageURL: string;
	imageBlur?: string;
}

export interface Product {
	id?: string;
	name: string;
	description: string;
	price: number;
	rate: number;
	published: boolean;
	types: string[];
	sizes: string[];
	colors: string[];
	collection: { connect: { id: number } };
	images: { createMany: { data: ProductImage[] } } | ProductImage[] | string[];
	[key: string]: any;
}

export interface Collection {
	id: number;
	name: string;
	slug: string;
	types: string[];
	parentId?: number;
	children?: Collection[];
}


