import EventForm from "@/components/shared/eventForm";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
async function UpdateEvent () {

    const { userId } = await auth()

    if (!userId) {
        redirect('/sign-in');
    }

    return (
        <>
            <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
                <h3 className="wrapper h3-bold text-center sm:text-left">Nuevo evento</h3>
            </section>

            <div className="wrapper my-8">
                <EventForm userId={userId} type="update"/>
            </div>
        </>
    )
}

export default UpdateEvent;