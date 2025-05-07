interface ProgressProps {
    value: number;
    small?: boolean;
}

export function Progress({ value, small }: ProgressProps) {
    return (
        <div className={`w-full bg-gray-800 rounded ${small ? "h-1" : "h-2"}`}>
            <div
                className={`bg-indigo-500 rounded transition-all ${small ? "h-1" : "h-2"}`}
                style={{ width: `${value}%` }}
            />
        </div>
    );
}
