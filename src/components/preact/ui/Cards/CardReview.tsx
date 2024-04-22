import type { Reviews } from "@/data/reviews"
import UserIcon from "../../Icons/UserIcon"

interface Props extends Reviews {

}

export const CardReview = ({
    userFullName,
    review,
    id
}: Props
) => {
    return (
        <div id={id} class="flex items-center gap-5 py-5">
            <div class="bg-[#D9D9D9]  rounded-full relative inset-0 size-16 h-fit md:size-16 md:h-fit lg:size-24 lg:h-fit p-4">
                <UserIcon
                    class="  stroke-primary-msb w-full h-full" />
            </div>

            <div class="flex flex-col gap-0 w-100">
                <h1
                    class="text-base md:text-md lg:text-xl font-semibold text-primary-text-msb text-left"
                >
                    {userFullName}
                </h1>
                <p
                    class="lg:text-lg text-primary-text-msb text-left font-normal font-italic text-ellipsis overflow-hidden"
                >
                    {review}
                </p>
            </div>
        </div>
    )
}
