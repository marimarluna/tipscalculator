import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import browserStorage from 'store';

export default function usePersistState<T>(storageKey: string, initialState: T): [T, Dispatch<SetStateAction<T>>] {
    const [state, setInternalState] = useState<T>(initialState);

    useEffect(() => {

        const storageInBrowser = browserStorage.get(storageKey) ;

        if (storageInBrowser) {
            setInternalState(storageInBrowser);
        }

    }, [storageKey]);


    const setState: React.Dispatch<React.SetStateAction<T>> = (newState) => {
        browserStorage.set(storageKey, newState);
        setInternalState(newState);
    };

    return [state, setState];
};
