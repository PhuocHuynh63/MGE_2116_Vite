'use client'
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface IMenuContext {
    isMenuOpen: boolean;
    toggleMenu: () => void;
}

const MenuContext = createContext<IMenuContext | undefined>(undefined);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(() => {
        if (typeof window !== 'undefined') {
            return window.innerWidth >= 769;
        }
        return true;
    });

    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        if (window.innerWidth < 769) {
            setIsMenuOpen(false);
        }
        setIsInitialized(true);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };


    return (
        <MenuContext.Provider value={{ isMenuOpen, toggleMenu }}>
            {isInitialized && children}
        </MenuContext.Provider>
    );
};

export const useMenu = () => {
    const context = useContext(MenuContext);
    return context;
};
