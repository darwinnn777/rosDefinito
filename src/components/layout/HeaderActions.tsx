import { Download, Printer, Trash2 } from 'lucide-react';
import { useConfig } from '../../contexts/ConfigContext';
import { Button } from '../ui';

export const HeaderActions = () => {
    const { pricing, totalCartPrice, cartItems, resetConfig } = useConfig();
    const totalPrice = (pricing.total + totalCartPrice) * 1.3;

    return (
        <div className="flex items-center gap-4">
            <div className="flex flex-col items-end mr-4">
                <span className="text-2xl font-bold text-gray-900 leading-none">
                    {totalPrice.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                </span>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-medium">
                    Precio Total Estimado
                    {cartItems.length > 0 && ` (+${cartItems.length} extras)`}
                </span>
            </div>

            <div className="h-8 w-px bg-gray-200 mx-2" />

            <Button
                variant="outline"
                size="sm"
                onClick={() => window.print()}
                className="hidden sm:flex"
            >
                <Printer className="mr-2 h-4 w-4" />
                Imprimir
            </Button>

            <Button
                variant="outline"
                size="sm"
                onClick={() => {
                    // Logic to export JSON
                    const data = JSON.stringify({ pricing, totalCartPrice, cartItems }, null, 2);
                    const blob = new Blob([data], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'shelf-design.json';
                    a.click();
                }}
            >
                <Download className="mr-2 h-4 w-4" />
                Guardar
            </Button>

            <Button
                variant="ghost"
                size="icon"
                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={() => {
                    if (confirm('¿Estás seguro de que quieres borrar todo el diseño?')) {
                        resetConfig();
                    }
                }}
            >
                <Trash2 className="h-4 w-4" />
            </Button>
        </div>
    );
};
