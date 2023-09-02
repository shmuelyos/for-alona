export default function TotalPrice({ totalPrice }: { totalPrice: number }) {
    return (
        <div className="mb-4">
            <h2 className="text-2xl mb-2">Total Price:</h2>
            <p>{totalPrice}</p>
        </div>
    );
}
