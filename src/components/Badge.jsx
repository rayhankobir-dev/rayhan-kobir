const colorVariants = {
    default: 'bg-gray-200 text-gray-600',
    blue: 'bg-blue-200 text-blue-600',
    red: 'bg-red-200 text-red-600',
    orange: 'bg-orange-200 text-orange-600',
    green: 'bg-green-200 text-green-600',
    purple: 'bg-purple-200 text-purple-600'
}
const sizeVariants = {
    sm: 'text-sm',
    md: 'text-md',
    lg: 'text-lg',
}

// eslint-disable-next-line react/prop-types
export default function Badge({ children, size = 'sm', color = 'default' }) {
    return (
        <span className={`flex w-fit items-center gap-1 px-2 py-[2px] rounded-md ${colorVariants[color]} ${sizeVariants[size]}`}>{children}</span>
    )
}
