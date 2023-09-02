export default function RoomTypeList({ roomTypes }: { roomTypes: { [key: string]: number } }) {
    return (
        <div className="mb-4">
            <h2 className="text-2xl mb-2">Room Types:</h2>
            <ul className="list-disc list-inside">
                {Object.entries(roomTypes).map(([type, count]) => (
                    <li key={type} className="mb-1">
                        {type}: {count}
                    </li>
                ))}
            </ul>
        </div>
    );
}
