import { useState, useEffect } from 'react';

const getCols = (width) => {
    if (width < 600) return 1; // xs
    if (width < 900) return 2; // sm
    if (width < 1200) return 3; // md
    return 4; // lg and up
};

const useColumnCount = () => {
    const [cols, setCols] = useState(getCols(window.innerWidth));

    useEffect(() => {
        const handleResize = () => {
            setCols(getCols(window.innerWidth));
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return cols;
};

export default useColumnCount;
