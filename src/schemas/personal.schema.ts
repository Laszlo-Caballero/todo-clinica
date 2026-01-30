import z from "zod";

export const PersonalSchema = z.object({
  nombreCompleto: z
    .string()
    .min(3, "El nombre completo debe tener al menos 3 caracteres"),
});

export type PersonalType = z.infer<typeof PersonalSchema>;

export interface PersonalFormState {
  status: boolean;
  data?: PersonalType;
  errors?: {
    [key in keyof PersonalType]?: string[];
  };
}
