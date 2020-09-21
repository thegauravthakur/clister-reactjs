import React, {useState} from "react";

export const CurrentListTileContext = React.createContext('');
export const CustomListTileProvider = ({children}) => {
    const [title, setTitle] = useState('');
    return (
        <CurrentListTileContext.Provider
            value={{
                title: title,
                toggle: (data) => setTitle(data)
            }}
        >
            {children}
        </CurrentListTileContext.Provider>
    );
};