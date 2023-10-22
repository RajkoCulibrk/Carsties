"use client"
import React, {useState} from 'react';
import {Button} from "flowbite-react";
import {useRouter} from "next/navigation";
import {deleteAuction} from "@/app/actions/auctionActions";
import toast from "react-hot-toast";
type Props = {
    id:string
}
const DeleteButton = ({id}:Props) => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const doDelete = async () => {
        setLoading(true)
        try {
            const res =await deleteAuction(id)
            router.push("/")
        }catch (e:any) {
            toast.error(`${e.status} ${e.message}`)
        }
        finally {
            setLoading(false)
        }

    }


    return (
        <Button color={"failure"} isProcessing={loading} outline onClick={doDelete} >
            Delete Auction
        </Button>
    );
};

export default DeleteButton;