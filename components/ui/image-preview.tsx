/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";

export const ImagePreview = ({ url }: { url: string | null }) => {
    const [isValid, setIsValid] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!url) {
            setIsValid(false);
            setError(null);
            return;
        }

        const img = new Image();
        img.onload = () => {
            setIsValid(true);
            setError(null);
        };
        img.onerror = () => {
            setIsValid(false);
            setError("No se pudo cargar la imagen. Prueba con otra url y asegúrate de que sea pública.");
        };
        img.src = url;
    }, [url]);

    return (
        <>
            {(isValid && url) && (
                <div className="w-full h-40 rounded border overflow-hidden">
                    <img
                        src={url}
                        alt="Previsualización"
                        className="w-full h-full object-cover"
                    />
                </div>
            )
            }
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </>
    );
};