"use client";

import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "../ui/modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const formSchema = z.object({
  name: z.string().min(1),
});

export const StoreModal = () => {
  const storeModal = useStoreModal();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      const response = await axios.post('/api/stores', values);
      
      toast.success("Loja criada.");
      window.location.reload();
      storeModal.onClose();
      router.push("/")
      
      // console.log(response.data);   
    } catch (error) {
      //console.log(error);
      toast.error("Algo de errado aconteceu.");
    }finally{
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Criar loja"
      description="Adicione uma nova loja para gerenciar produtos e categorias"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input 
                              disabled={loading} 
                              placeholder="E-Commerce" 
                              {...field} />
                        </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                    <Button
                        disabled={loading} 
                        variant="outline"
                        type="button"
                        onClick={storeModal.onClose}>
                            Cancelar
                        </Button>
                    <Button
                      disabled={loading} 
                      type="submit">
                        Continuar
                    </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
