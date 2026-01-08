import { ButtonProps } from '@/types/type'
import { Text, TouchableOpacity } from 'react-native'

const getBgVariantStyle = (Variant:ButtonProps['bgVariant'])=>{
    switch(Variant){
        case "secondary":
            return 'bg-gray-500'
        case "danger":
            return 'bg-red-500'
        case "success":
            return 'bg-green-500'
        case "outline":
            return 'bg-transparent border-neutral-300 border-[1px]'
        default:
            return 'bg-[#0286ff]'
    }
}
const getTextVariantStyle = (Variant:ButtonProps['textVariant'])=>{
    switch(Variant){
        case "primary":
            return "text-black";
        case "secondary":
            return "text-gray-100";
        case "danger":
            return "text-red-100";
        case "success":
            return "text-green-100";
        default:
            return "text-white";
    }
}
export default function CustomButton({
    onPress,
    title,
    bgVariant = "primary",
    textVariant = "default",
    IconLeft,
    IconRight,
    className,
    ...props}:ButtonProps) {
    return (
        <TouchableOpacity onPress={onPress} className={`w-full rounded-full flex-row
        items-center justify-center shadow-md shadow-neutral-400/70 py-4
        ${getBgVariantStyle(bgVariant)} ${className}`} {...props}>
            {IconLeft&&<IconLeft/>}
            <Text className={`text-lg font-bold ${getTextVariantStyle(textVariant)}`}>{title}</Text>
            {IconRight&&<IconRight/>}
        </TouchableOpacity>
    )
}