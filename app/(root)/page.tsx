import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";


export default function Home() {
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className=" flex flex-col justify-center gap-8">
            <h1 className="h1-bold">Título del evento: subtítulo del evento!</h1>
            <p className="p-regular-20 md:p-regular-24">Descripción breve del evento para dar a la gente ganas de ver las actividades en el siguiente botón.</p>
            <Button size={"lg"} asChild className="button w-full sm:w-fit">
              <Link href={"#events"}>
                Ver actividades
              </Link>
            </Button>
          </div>
          <div className="relative w-full h-full">
            <Image
              src={"/assets/images/hero.png"}
              alt="hero"
              width={1000}
              height={100}
              className="max-h-[70vh] object-center 2xl:max-h-[50vh] object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-3xl font-bold px-4 py-2 rounded-lg">
                IMAGEN DEL EVENTO
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="activities" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Actividades</h2>
        <div className="flex w-full flex-col gap-5 md:flex-row">
          Search
          CategoryFilter
        </div>
      </section>
    </>
  );
}
