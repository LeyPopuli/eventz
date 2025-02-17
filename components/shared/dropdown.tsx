import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { startTransition, useEffect, useState } from "react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "../ui/input"
// import { createCategory, getAllCategories } from "@/lib/actions/category.actions"
import { ICategory } from "@/lib/database/models/category.model"
import { createCategory, getAllCategories } from "@/lib/actions/category.actions"

type DropdownProps = {
    value?: string
    onChange?: () => void
    userId: string
}

const Dropdown = ({ value, onChange , userId}: DropdownProps) => {
    const [categories, setCategories] = useState<ICategory[]>([])
    const [newCategory, setNewCategory] = useState('');

    const handleAddCategory = () => {
        createCategory({
            category: {
                name: newCategory.trim()
            },
            userId: userId
        })
            .then((category) => {
                setCategories((prevState) => [...prevState, category])
            })
    }

    useEffect(() => {
        const getCategories = async () => {
            const categoryList = await getAllCategories();

            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            categoryList && setCategories(categoryList as ICategory[])
        }

        getCategories();
    }, [])

    return (
        <Select onValueChange={onChange} defaultValue={value}>
            <SelectTrigger className="text-muted-foreground">
                <SelectValue placeholder="Etiqueta del evento" />
            </SelectTrigger>
            <SelectContent>
                {categories.length > 0 && categories.map((category) => (
                    <SelectItem key={category._id} value={category._id} className="select-item p-regular-14">
                        {category.name}
                    </SelectItem>
                ))}

                <AlertDialog>
                    <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-1.5 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">Añadir etiqueta</AlertDialogTrigger>
                    <AlertDialogContent className="bg-white">
                        <AlertDialogHeader>
                            <AlertDialogTitle>Nueva etiqueta</AlertDialogTitle>
                            <AlertDialogDescription>
                                <Input type="text" placeholder="Nombre de la etiqueta" className="mt-3" onChange={(e) => setNewCategory(e.target.value)} />
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={() => startTransition(handleAddCategory)}>Añadir</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </SelectContent>
        </Select>
    )
}

export default Dropdown