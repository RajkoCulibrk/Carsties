import React from 'react';
import {getDetailedViewData} from "@/app/actions/auctionActions";
import Heading from "@/app/components/Heading";
import CountdownTimer from "@/app/auctions/CountdownTimer";
import CarImage from "@/app/auctions/CarImage";
import DetailedSpecs from "@/app/auctions/details/[id]/DetailedSpecs";
import {getCurrentUser} from "@/app/actions/authActions";
import EditButton from "@/app/auctions/details/[id]/EditButton";
import DeleteButton from "@/app/auctions/details/[id]/DeleteButton";

const Details = async ({params}: { params: { id: string } }) => {
    const auction = await getDetailedViewData(params.id)
    const user = await getCurrentUser()
    return <div>
        <div className={"flex justify-between"}>

            <div className={'flex  items-center gap-3'}>
                <Heading title={`${auction.make} ${auction.model}`}/>
                {(user?.username === auction.seller) && <>
                    <DeleteButton id={auction.id}/>
                    <EditButton id={auction.id}/>
                </>
                }
            </div>


            <div className={"flex gap-3"}>
                <h3 className={"text-2xl font-semibold"}>Time remaining</h3>
                <CountdownTimer auctionEnd={auction.auctionEnd}/>
            </div>
        </div>
        <div className={"grid grid-cols-2 gap-6 mt-3"}>
            <div className={"w-full bg-gray-200 aspect-h-10  aspect-w-16 rounded-lg overflow-hidden"}>
                <CarImage url={auction.imageUrl}/>
            </div>
            <div className={"border-2 rounded-lg p-2 bg-gray-100"}>
                <Heading title={"Bids"}/>
            </div>
        </div>
        <div className={"mt-3 grid grid-cols-1 rounded-lg"}>
            <DetailedSpecs auction={auction}/>
        </div>


    </div>
};

export default Details;