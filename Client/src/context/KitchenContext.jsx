import { createContext, useState, useEffect } from "react";

export const KitchenContext = createContext();

export const KitchenProvider = ({ children }) => {
    const [kitchens, setKitchens] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchKitchens = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/kitchen/all"); // API URL
                if (!response.ok) {
                    throw new Error("Failed to fetch kitchens");
                }
                const data = await response.json();
                setKitchens(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchKitchens();
        console.log("",kitchens)
    }, []);

    return (
        <KitchenContext.Provider value={{ kitchens, loading, error }}>
            {children}
        </KitchenContext.Provider>
    );
};
