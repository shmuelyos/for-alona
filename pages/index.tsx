// index.tsx
import React, {useState} from 'react';
import {HotelComponent} from '@/components/HotelComponent';

const Home: React.FC = () => {
    const [hotelCount, setHotelCount] = useState<number>(1);
    const [arrayOfTotalPrices, setArrayOfTotalPrices] = useState([])

    const handleTotalPriceChange = (index: number, newPrice: number) => {
        setArrayOfTotalPrices(prev => {
            // Create a new array that is a copy of the previous array
            const newArray = [...prev];

            // Modify the new array
            newArray[index] = newPrice;

            // Return the new array
            return newArray;
        });
    };

    return (
        <div style={{textAlign: 'center'}}>
            <button onClick={() => setHotelCount(hotelCount + 1)}>+</button>
            <button onClick={() => setHotelCount(Math.max(0, hotelCount - 1))}>-</button>

            {Array.from({length: hotelCount}, (_, i) => (
                <HotelComponent
                    key={i}
                    onTotalPriceChange={(newPrice) => handleTotalPriceChange(i, newPrice)}
                />
            ))}
            <h2>Total Price of All Hotels : {arrayOfTotalPrices.reduce((a, b) => a + b, 0)}</h2>
        </div>
    );
};

export default Home;
