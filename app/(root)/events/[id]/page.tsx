import { getEventById } from "@/lib/actions/event.actions";
import { redirect } from "next/navigation";
import Image from "next/image";
import { formatDateTime } from "@/lib/utils";
import Link from "next/link";

async function EventDetails({ params }: { params: { id: string } }) {

    const { id } = await params

    const event = await getEventById(id);

    if (!event) {
        redirect('/events');
    }


    const startDate = formatDateTime(event?.startDateTime);
    const endDate = formatDateTime(event?.endDateTime);

    return (
        <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={event?.imageUrl || "/assets/images/hero.png"} alt={event.title} width={1000} height={1000} className="max-h-[290px] object-cover object-center" />
                <div className="flex w-full flex-col gap-4 p-5 md:py-2">
                    <div className="flex flex-col gap-3">
                        <h2 className="h2-bold">{event?.title}</h2>

                        <div className="flex flex-col gap-3">
                            <div className="flex gap-3">
                                <p className="rounded-full bg-green-100 px-3 py-1 text-green-500 font-semibold">
                                    {event?.minAssistance}/{event?.maxAssistance}
                                </p>

                                {event?.category &&
                                    <p className="rounded-full bg-blue-100 px-3 py-1 text-blue-500 font-semibold">
                                        {event?.category?.name}
                                    </p>
                                }

                            </div>

                            <p className="sm:mt-0 text-sm text-primary-500">
                                {event?.organizer}
                            </p>
                        </div>
                    </div>

                    {"BUTTON"}

                    <div className="flex flex-col gap-3">
                        <div className="flex gap-2 md:gap-3">
                            <Image alt="calendar" src="/assets/icons/calendar.svg" width={25} height={25} className="text-gray-400" />
                            <div className="p-medium-16 flex flex-wrap items-center">
                                <p>
                                    {startDate.dateOnly} / {startDate.timeOnly}
                                </p>

                                {startDate.dateOnly !== endDate.dateOnly ? (
                                    <>
                                        <p className="">{endDate.dateOnly} / {endDate.timeOnly}</p>
                                    </>
                                ) : (
                                    <p className="ml-1"> - {endDate.timeOnly}</p>
                                )}
                            </div>
                        </div>
                        <div className="p-regular-20 flex items-center gap-2 md:gap-3">
                            <Image alt="location" src="/assets/icons/location-grey.svg" width={25} height={25} />
                            <p className="p-medium-16 flex flex-wrap items-center">{event?.site}</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="p-medium-14 font-semibold text-sm">
                            Descripción:
                        </p>
                        <p className="p-medium-14 text-sm text-muted-foreground">
                            {event?.description}
                        </p>
                        <Link
                            href={event?.url || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-medium-14 truncate text-primary-500 underline cursor-pointer"
                        >
                            {event?.url}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EventDetails;