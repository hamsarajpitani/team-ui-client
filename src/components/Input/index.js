const Input = ({ id, label, className, multiline, options, ...props }) => {
    const isTextarea = multiline;
    const isSelect = options && options.length > 0;
    const Component = isTextarea ? 'textarea' : isSelect ? 'select' : 'input';

    return (
        <div className="mb-4">
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <Component
                {...props}
                id={id}
                className={`mt-2 flex ${multiline ? 'min-h-24' : 'h-12'} w-full text-black items-center rounded border border-gray-200 bg-white/0 p-3 text-sm outline-none ${className}`}
            >
                {isSelect &&
                    options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
            </Component>
        </div>
    );
};

export default Input;
