import { z } from "zod";

export const eventFormSchema = z.object({
    title: z.string().min(3, {
        message: "El título debe tener al menos 3 caracteres.",
    }),
    description: z.string().max(200).optional(),
    site: z.string().max(100).optional(),
    imageUrl: z.string().optional(),
    organizer: z.string().email({
        message: "Por favor ingresa un email válido"
    }).optional(),
    startDateTime: z.date({
        required_error: "La fecha de inicio es requerida.",
    }),
    endDateTime: z.date({
        required_error: "La fecha de fin es requerida.",
    }),
    minAssistance: z.number().min(0, {
        message: "El número mínimo de asistentes debe ser mayor a 0",
    }),
    maxAssistance: z.number().min(0, {
        message: "El número máximo de asistentes debe ser mayor a 0",
    }),
    url: z
        .string()
        .optional()
        .refine((value) => !value || z.string().url().safeParse(value).success, {
            message: "Por favor ingresa una URL válida",
        }),
    categoryId: z.string().optional(),
})
      .refine(
        (data) => {
          return data.endDateTime >= data.startDateTime;
        },
        {
          message: "La fecha de fin debe ser posterior a la fecha de inicio",
          path: ["endDateTime"],
        }
      )
    .refine(
        (data) => {
            return data.maxAssistance >= data.minAssistance;
        },
        {
            message: "El número máximo de asistentes debe ser mayor al número mínimo de asistentes",
            path: ["maxAssistance"],
        }
    );
