export const calculateTotalPrice = (roomTypes, prices) => {
    let totalPrice = 0;

    totalPrice += roomTypes.TWN * prices.TWN;
    totalPrice += roomTypes.DBL * prices.DBL;
    totalPrice += roomTypes.SGL * prices.SGL;

    return totalPrice;
};

