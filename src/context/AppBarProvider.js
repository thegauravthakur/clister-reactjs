import React, {useState} from "react";

export const AppBarContext = React.createContext('dark');
export const AppBarProvider = ({children}) => {
    const [title, setTitle] = useState('Home');
    return (
        <AppBarContext.Provider
            value={{
                title: title,
                toggle: (data) => setTitle(data)
            }}
        >
            {children}
        </AppBarContext.Provider>
    );
};