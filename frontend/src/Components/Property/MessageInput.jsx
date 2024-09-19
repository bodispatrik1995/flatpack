import {useEffect, useState} from "react";
import Loading from "../Loading.jsx";

export default function MessageInput({title, propertyId, owner}) {

    const [owner] = useState(owner ? owner : null);

    const [title, setTitle] = useState(title);
    const [message, setMessage] = useState();

    if (!owner) {
        return (
            <div className={"message-box apply-square-background "}>
                <h1>This property has no owner</h1>
            </div>
        )
    }

    return (
        <div className={"message-box apply-square-background col-span-3"}>
            <h1>Messages to {owner.name}</h1>
            <div className={"message-new-message"}>
                <form action="" className={" grid gap-4 grid-rows-4"}>
                    <input className={"row-span-2"} onChange={(e) => setMessage(e.target.value)} placeholder={"Message"} type="text"/>
                    <input className={"row-span-1"} type="submit"/>
                </form>
            </div>
        </div>
    )
}