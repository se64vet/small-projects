'use client'
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Copy } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from 'zod'

export default function Home() {

  // create form items and schema with zod validation
  const formItems = [
    {
      value: "uppercase",
      label: "Include Uppercase Letters",
    },
    {
      value: "lowercase",
      label: "Include lowercase Letters",
    },
    {
      value: "numbers",
      label: "Include Numbers",
    },
    {
      value: "symbols",
      label: "Include Symbols",
    },
  ];

  const formSchema = z.object({
    items: z.array(z.string()).refine((array) => array.length > 0, {
      message: "Must select at least one item"
    }),
    length: z.number().min(6, "password must at least 6 character").max(24, "maximum character reached")
  })

  // create form object with react-hook-form taken zod form schema
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      items: ["lowercase"],
      length: 9
    }
  })

  // handle submit function
  const [password, setPassword] = useState("raNdomP4ssw0rd")
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const lowercase = "abcdefghijklmnopqrstuvxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVXYZ";
    const numbers = "0123456789";
    const symbols = "£$&()*+[]@#^-_!?";
    let pw = "";

    const { items, length } = data;
    const seed = items.map((item) => {
      switch (item) {
        case "lowercase":
          return lowercase;
        case "uppercase":
          return uppercase;
        case "numbers":
          return numbers;
        case "symbols":
          return symbols;
      
        default:
          return lowercase;
      }
    })
    
    for (let index = 0; index < length; index++) {
      // choose seed set
      let setIdx = Math.floor(Math.random() * seed.length);
      let charIdx = Math.floor(Math.random() * seed[setIdx].length);
      pw = pw + seed[setIdx][charIdx];
    }

    setPassword(pw);
  }

  // handle copy function
    const {toast} = useToast();
    const onCopy = (text: string) => {
      navigator.clipboard.writeText(text);
      toast({description: "Copied."});
    };

  return (
    <main className="container flex min-h-screen flex-col items-center justify-center">
      <div className="w-full sm:w-2/3 lg:w-1/3 space-y-4">
        <div className="bg-secondary flex items-center justify-between p-4">
          <span className="text-xl text-muted-foreground font-bold">
            {password}
          </span>
          <Button variant={'secondary'} onClick={() => onCopy(password)}>
            <Copy className="h-6 w-6 text-primary" />
          </Button>
        </div>
        <div className="bg-secondary p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

              <FormField
                control={form.control}
                name="length"
                render={({field}) => {
                  return (
                    <FormItem>
                      <FormLabel className="my-4 flex flex-row justify-between items-center">
                        <span className="text-lg">Password Characters</span>
                        <span className="text-2xl font-bold text-primary">{field.value}</span>
                      </FormLabel>

                      <FormControl>
                        <Slider
                          defaultValue={[field.value]}
                          min={6}
                          max={24}
                          step={1}
                          onValueChange={(e) => field.onChange(Number(e))}
                        />
                      </FormControl>
                    </FormItem>
                  );
                }}
              />

              {/* Form Field Wrapper */}
              <FormField
                control={form.control}
                name="items"
                render={() => (
                  <FormItem>
                    {formItems.map((item) => (
                      <FormField
                        key={item.label}
                        control={form.control}
                        name="items"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.value}
                              className="flex flex-row items-center space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  className="rounded"
                                  checked={field.value.includes(item.value)}
                                  onCheckedChange={(checked: boolean) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          item.value,
                                        ])
                                      : field.onChange(
                                          field.value.filter(
                                            (value) => value !== item.value,
                                          ),
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-xl font-normal">
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      ></FormField>
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                variant={"default"}
                type="submit"
                className="w-full rounded-none text-xl dark:text-secondary-foreground"
              >
                GENERATE <ArrowRight className="inline-block w-6 h-6 ml-2" />
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
}
