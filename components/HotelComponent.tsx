import React, {useEffect, useState} from 'react';
import FileUpload from '../components/FileUpload';
import {parsePDF} from '@/utils/pdfParser';
import {calculateTotalPrice} from '@/utils/calculatePrice';

export const HotelComponent: React.FC = ({onTotalPriceChange}) => {
    const [roomTypes, setRoomTypes] = useState<{ [key: string]: number }>({TWN: 0, DBL: 0, SGL: 0});
    const [prices, setPrices] = useState<{ [key: string]: number }>({TWN: 0, DBL: 0, SGL: 0});
    const [nights, setNights] = useState<number>(1);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    useEffect(() => {
        // Initialize the totalPrice for this HotelComponent
        onTotalPriceChange(totalPrice);

        // Cleanup: remove the totalPrice from the sum when this component is unmounted
        return () => {
            onTotalPriceChange(0);
        };
    }, []);


    const handleTotalPriceChange = (newPrice: number) => {
        onTotalPriceChange(newPrice)
        setTotalPrice(newPrice)
    }
    const handleFileSelect = async (file: File) => {
        const parsedRoomTypes = await parsePDF(file);
        setRoomTypes(parsedRoomTypes);

        // Calculate total price
        const calculatedTotalPrice = calculateTotalPrice(parsedRoomTypes, prices);
        handleTotalPriceChange(calculatedTotalPrice * nights);
    };

    const handlePriceChange = (type: string, value: number) => {

        if (type === "Nights") {
            setNights(value)
            handleTotalPriceChange(calculateTotalPrice(roomTypes, prices) * value);
            return;
        }

        const updatedPrices = {...prices, [type]: value};
        setPrices(updatedPrices);

        // Recalculate total price
        const calculatedTotalPrice = calculateTotalPrice(roomTypes, updatedPrices);
        handleTotalPriceChange(calculatedTotalPrice * nights);
    };

    return (
        <div style={{textAlign: 'center', margin: '40px'}}>

            {roomTypes.TWN && roomTypes.DBL && roomTypes.SGL ?
                <div className="inline-flex items-center">
                    <h3 className="mr-2">Hotel :
                        <input type="text" placeholder="Hotel's name"/>
                    </h3>
                </div>
                :
                <h3>add new Hotel</h3>
            }

            <FileUpload onFileSelect={handleFileSelect}/>
            <div>
                <input type="number" placeholder="Price for TWN"
                       onChange={(e) => handlePriceChange('TWN', parseFloat(e.target.value))}/>
                <input type="number" placeholder="Price for DBL"
                       onChange={(e) => handlePriceChange('DBL', parseFloat(e.target.value))}/>
                <input type="number" placeholder="Price for SGL"
                       onChange={(e) => handlePriceChange('SGL', parseFloat(e.target.value))}/>
                <input type="number" placeholder="Nights"
                       onChange={(e) => handlePriceChange('Nights', parseFloat(e.target.value))}/>
            </div>
            <div>
                <h3>Total Price: {totalPrice}</h3>
                <div>
                    {Object.keys(roomTypes).map((type) => (
                        <p key={type}>{`${roomTypes[type]}x${type} Rooms`}</p>
                    ))}
                </div>
            </div>
        </div>
    );
};


