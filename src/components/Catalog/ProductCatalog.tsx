import { useEffect, useState } from 'react';
import { Loader2, Plus, ShoppingCart, AlertCircle } from 'lucide-react';
import { supabase, isConfigured } from '../../lib/supabase';
import { useConfig } from '../../contexts/ConfigContext';
import { type Product } from '../../types';

export const ProductCatalog = () => {
    const { addToCart } = useConfig();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                if (!isConfigured) {
                    throw new Error("Faltan las variables de entorno en Vercel (Settings -> Environment Variables).");
                }

                setLoading(true);
                const { data, error } = await supabase
                    .from('productos')
                    .select('*');

                if (error) throw error;
                setProducts(data || []);
            } catch (err: any) {
                console.error("Error fetching products:", err);
                setError(err.message || "Failed to load products");
                // Fallback mock data if DB fails/empty (for dev testing)
                if (import.meta.env.DEV && (!products || products.length === 0)) {
                    // Add mock only if completely needed, but user asked for loading/error.
                    // I'll keep the error state visible but maybe log a hint.
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="h-full w-full flex flex-col items-center justify-center p-8 text-gray-500">
                <Loader2 className="h-8 w-8 animate-spin mb-2 text-brand-blue" />
                <p>Cargando catálogo...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-full w-full flex flex-col items-center justify-center p-8 text-red-500 text-center">
                <AlertCircle className="h-8 w-8 mb-2" />
                <p className="font-medium">Error al cargar productos</p>
                <p className="text-xs mt-1 text-gray-400 max-w-[200px] break-words">{error}</p>
                <div className="mt-4 space-y-2">
                    <p className="text-xs text-gray-500">¿Has configurado el archivo .env?</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="text-xs bg-red-50 text-red-600 px-3 py-1.5 rounded hover:bg-red-100 transition-colors font-medium"
                    >
                        Reintentar / Recargar
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col bg-white border-l border-gray-200 w-full max-w-md">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="font-semibold text-gray-800 flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5 text-brand-blue" />
                    Catálogo de Accesorios
                </h2>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                    {products.length} productos
                </span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {products.length === 0 ? (
                    <div className="text-center text-gray-500 py-10">
                        <p>No se encontraron productos.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="group relative bg-white border border-gray-200 rounded-lg p-3 hover:border-brand-blue/50 hover:shadow-md transition-all flex gap-3"
                            >
                                {/* Icon Placeholder */}
                                <div className="h-20 w-20 bg-gray-100 rounded-md flex items-center justify-center flex-shrink-0 overflow-hidden">
                                    {product.image_url ? (
                                        <img src={product.image_url} alt={product.descripcion} className="h-full w-full object-cover" />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center text-gray-400">
                                            <ShoppingCart className="h-6 w-6" />
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1 flex flex-col justify-between">
                                    <div className="space-y-1">
                                        <div className="flex justify-between items-start">
                                            <span className="text-xs font-semibold text-brand-blue uppercase tracking-wide bg-blue-50 px-2 py-0.5 rounded">{product.categoria}</span>
                                        </div>

                                        <h3 className="font-medium text-gray-900 text-sm line-clamp-2 leading-tight min-h-[2.5em]">{product.descripcion}</h3>

                                        <div className="text-xs text-gray-600 space-y-0.5 pt-1">
                                            <p><span className="text-gray-400">Medidas:</span> {product.medidas_mm}</p>
                                            <p><span className="text-gray-400">Ref:</span> <span className="font-mono">{product.codigo}</span></p>
                                        </div>

                                        <div className="pt-2 flex items-center justify-between border-t border-gray-100 mt-2">
                                            <span className="text-lg font-bold text-gray-900">
                                                {Number(product.precio).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                                            </span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => addToCart(product)}
                                        className="mt-2 w-full flex items-center justify-center gap-1.5 bg-gray-900 hover:bg-brand-blue text-white text-xs font-medium py-1.5 px-3 rounded transition-colors"
                                    >
                                        <Plus className="h-3.5 w-3.5" />
                                        Añadir
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
