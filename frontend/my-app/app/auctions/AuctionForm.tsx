"use client"
import React, {useEffect} from 'react';
import {FieldValues, useForm} from "react-hook-form";
import {Button} from "flowbite-react";
import Input from "@/app/components/Input";
import DateInput from "@/app/components/DateInput";
import {createAuction, updateAuction, updateAuctionTest} from "@/app/actions/auctionActions";
import {usePathname, useRouter} from "next/navigation";
import toast from "react-hot-toast";
import {Auction} from "@/types";

type Props = {
    auction?: Auction
}

const AuctionForm = ({auction}: Props) => {
    const router = useRouter()
    const pathname = usePathname()
    const {
        control,
        handleSubmit,
        setFocus,
        reset,
        formState: {
            isValid,
            isSubmitting,
        }
    } = useForm({
        mode: "onTouched"
    })

    async function onSubmit(data: FieldValues) {
        try {
            let id = ""
            let res
            if (pathname === "auctions/create") {
                res = await createAuction(data)
                id = res.id
            } else {
                if (auction) {
                    res = await updateAuction(data, auction.id)
                    id = auction.id
                }
            }
            if (res.error) {
                throw res.error
            }
            router.push(`/auctions/details/${id}`)
        } catch (e: any) {
            toast.error(e.status + " " + e.message)
        }
    }

    useEffect(() => {
        if (auction) {
            const {model, color, mileage, year,make} = auction
            reset({model, color, mileage, year, make})
        }
        setFocus("make")
    }, [setFocus]);

    return (
        <form
            className="flex flex-col mt-3"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Input
                label={"Make"}
                name={"make"}
                control={control}
                rules={{required: "Make is required"}}

            />

            <Input
                label={"Model"}
                name={"model"}
                control={control}
                rules={{required: "Model is required"}}

            />

            <Input
                label={"Color"}
                name={"color"}
                control={control}
                rules={{required: "Color is required"}}

            />

            <div className={"grid grid-cols-2 gap-3"}>
                <Input
                    label={"Year"}
                    name={"year"}
                    control={control}
                    rules={{required: "Year is required"}}

                />
                <Input
                    label={"Mileage"}
                    name={"mileage"}
                    type={"number"}
                    control={control}
                    rules={{required: "Mileage is required"}}

                />
            </div>

            {pathname === "/auctions/create" && <>
                <Input
                    label={"Image URL"}
                    name={"imageUrl"}
                    control={control}
                    rules={{required: "Image URL is required"}}
                />

                <div className={"grid grid-cols-2 gap-3"}>
                    <Input
                        label={"Reserve price (enter 0 if no reserve)"}
                        name={"reservePrice"}
                        control={control}
                        rules={{required: "Reserve price is required"}}

                    />
                    <DateInput
                        label={"Auction end date/time"}
                        name={"auctionEnd"}
                        control={control}
                        dateFormat={"dd MMMM yyyy h:mm a"}
                        showTimeSelect={true}
                        rules={{required: "Auction end date is required"}}

                    />
                </div>
            </>}


            <div className={"flex justify-between"}>
                <Button
                    outline
                    color={'gray'}>
                    Cancel
                </Button>

                <Button
                    isProcessing={isSubmitting}
                    outline
                    color={'success'}
                    disabled={!isValid}
                    type={"submit"}>
                    Submit
                </Button>
            </div>
        </form>
    );
};

export default AuctionForm;