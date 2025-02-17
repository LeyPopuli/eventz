'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { eventFormSchema } from "@/lib/validator"
import { eventDefaultValues } from "@/app/constants"
import Dropdown from "./dropdown"
import DateTimePicker from "../ui/date-time-picker"
import Image from "next/image";
import { ImagePreview } from "../ui/image-preview"
import { useRouter } from "next/navigation"
import { createEvent } from "@/lib/actions/event.actions"



const EventForm = ({ userId, type }: { userId: string, type: string }) => {

  const initialValues = eventDefaultValues;
  const router = useRouter();

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialValues
  })

  
  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    const eventData = values;

    if (type === "create") {
      try{
        const newEvent = await createEvent({event:eventData, userId:userId, path:'/profile'});

        if (newEvent) {
          form.reset();
          router.push(`/events/${newEvent._id}`);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      // updateEvent(eventData);
    }

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Título<span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="Título del evento" {...field} className="text-muted-foreground text-sm" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Etiqueta</FormLabel>
                <FormControl>
                  <Dropdown userId={userId} onChange={field.onChange} value={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full md:basis-1/2">
                <FormLabel>Descripción</FormLabel>
                <FormControl className="h-52">
                  <Textarea placeholder="Descripción del evento" {...field} className="text-muted-foreground text-sm" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-3 md:basis-1/2">
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Imagen</FormLabel>
                <FormControl>
                <Input placeholder="Url de la imagen" type="url" {...field} className="text-muted-foreground text-sm" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <ImagePreview url={form.watch('imageUrl') ?? null} />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-5">
          <FormField
            control={form.control}
            name="site"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Lugar</FormLabel>
                <FormControl>
                  <Input placeholder="Lugar del evento" {...field} className="text-muted-foreground text-sm" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="organizer"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Responsable<span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="Email de la persona responsable" {...field} className="text-muted-foreground text-sm" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          <FormField
            control={form.control}
            name="startDateTime"
            render={() => (
              <FormItem className="w-full">
                <FormLabel>Inicio<span className="text-red-500">*</span></FormLabel>
                <DateTimePicker form={form} fieldName="startDateTime" />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDateTime"
            render={() => (
              <FormItem className="w-full">
                <FormLabel>Fin<span className="text-red-500">*</span></FormLabel>
                <DateTimePicker form={form} fieldName="endDateTime" />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="minAssistance"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Mínimo de asistentes<span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Mínimo de asistentes" {...field} onChange={(e) => field.onChange(Number(e.target.value))} className="text-muted-foreground text-sm" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maxAssistance"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Máximo de asistentes<span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Máximo de asistentes" {...field} onChange={(e) => field.onChange(Number(e.target.value))} className="text-muted-foreground text-sm" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Url</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Image
                      src="/assets/icons/link.svg"
                      alt="link"
                      width={18}
                      height={18}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                    />
                    <Input placeholder="Url de interés" {...field} className="pl-8 text-sm" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" size={"lg"} disabled={form.formState.isSubmitting} 
        className="col-span-2 w-full">{form.formState.isSubmitting ? "Guardando..." 
        : "Guardar"}</Button>
      </form>
    </Form>
  )
}


export default EventForm;
