export type MaterialType = 'None' | 'Wood' | 'Steel' | 'Grid' | 'Multiplex' | 'Angled';

export interface Product {
    id: number;
    created_at?: string;
    codigo: string;
    categoria: string;
    descripcion: string;
    medidas_mm: string;
    precio: number;
    // Optional extras if needed later
    image_url?: string;
}

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface ShelfLevel {
    id: string;
    elevation: number; // Height from ground in mm
    material: MaterialType;
}

export interface ShelfModule {
    id: string;
    width: number; // Width of this specific bay
    levels: ShelfLevel[];
}

export interface ShelfConfig {
    height: number; // Global height for the row
    depth: number; // Global depth for the row
    modules: ShelfModule[]; // List of connected bays
}

export interface Pricing {
    uprights: number; // Bastidores
    beams: number; // Largueros
    supports: number; // Puntales
    shelves: number; // Baldas
    total: number;
}
