import React from 'react';
import Heading from "@/app/components/Heading";
import AuctionForm from "@/app/auctions/AuctionForm";
import {getDetailedViewData} from "@/app/actions/auctionActions";

const Update = async ({params}:{params:{id:string}}) => {
    const auction = await getDetailedViewData(params.id)

    return (
        <div className={"mx-auto max-w-[75%] shadow-lg p-10 bg-white rounded-lg"} >
            <Heading title={`Update your auction`} subtitle={"Please update the details of your car"} />
            <AuctionForm auction={auction} />
        </div>
    );
};

export default Update;