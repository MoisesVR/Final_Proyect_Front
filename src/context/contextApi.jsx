import React, { createContext, useState, useEffect } from "react"

export const DataContext = createContext();

export const DataProvider = ({ children }) => {

    const [data, setData] = useState([]);

    useEffect(() => {
        const getApi = async () => {
            try {
                const resp = await fetch("../data.json");
                const data = await resp.json();
                setData(data)
            } catch (error) {
                return (
                    <div>
                        <h1>Error al cargar la data</h1>
                    </div>
                )
            }
        }
        getApi();
    }, []);

    return(
        <DataContext.Provider value={{
            data,
            setData
        }}>
            { children }
        </DataContext.Provider>
    )
}