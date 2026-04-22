import { Spinner } from "@/components/spinner";
import { useModalStore } from "@/components/store/use-modal-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useReplaceCampImage } from "@/lib/api/hooks/camps/camps.hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
const UpdateCaptionSchema = z.object({
  caption: z.string().min(1, "Title is required"),
});

type UpdateCaptionFormSchema = z.infer<typeof UpdateCaptionSchema>;

export default function UpdateCaptionForm({
  imqgeId,
  order,
  campId,
}: {
  campId: string;
  imqgeId: string;
  order: number | undefined;
}) {
  const { mutate: replaceImage, isPending } = useReplaceCampImage();

  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);

  const form = useForm<UpdateCaptionFormSchema>({
    resolver: zodResolver(UpdateCaptionSchema),
    defaultValues: {
      caption: "",
    },
  });

  const onSubmit = (data: UpdateCaptionFormSchema) => {
    console.log(data);
    replaceImage(
      {
        campId: campId,
        imageId: imqgeId,
        payload: { caption: data.caption, order },
      },
      {
        onSuccess: () => {
          closeModal("loading");
          closeModal("edit-image-caption");
        },
        onError: () => {
          closeModal("loading");
        },
      },
    );
  };

  useEffect(() => {
    if (isPending) {
      openModal(
        "loading",
        <div className="flex flex-col items-center justify-center gap-4 bg-white p-10 rounded-lg min-w-50">
          <Spinner size={40} />
        </div>,
        { isMutation: true },
      );
    }
  }, [isPending, openModal]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary-text font-semibold text-base mb-4">Update Image Caption</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Controller
            name="caption"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="space-y-2">
                <FieldLabel className="text-[#344054] text-sm mb-2" htmlFor="caption">Caption</FieldLabel>
                <Input
                  id="caption"
                  placeholder="Enter image caption"
                  {...field}
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <CardContent className="mt-6 flex justify-end items-center gap-3">
            <Button type="button" variant={"outline"}>
              Cancel
            </Button>
            <Button type="submit" variant={"regular"}>
              Update Caption
            </Button>
          </CardContent>
        </form>
      </CardContent>
    </Card>
  );
}
