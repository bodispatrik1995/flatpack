import {useEffect, useState} from "react";
import Loading from "../Loading.jsx";

export default function Messages(props) {

    const testMessages = [
        {
            from : "Sir I' Sell Y' Anything",
            title : "Yes, it has a piano room as well",
            message : " "
        },
        {
            from : "Chin Pens kicseng",
            title : "You buy?",
            message : "it cheap! get good price!"
        },
    ]

    const [owner] = useState(props.owner ? props.owner : null);
    const [user, setUser] = useState(localStorage.getItem('userId') ? localStorage.getItem('userId') : null);

    const [messages, setMessages] = useState([])

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setMessages(testMessages)
        setLoading(false)
        /*const messagesResponse = fetch('http://localhost:8080');
        if (messagesResponse.ok){
            const messagesData = messagesResponse.json();
            setMessages(messagesData);
            setLoading(false);
        }
        else{
            setMessages([]);
        }*/
    }, [user])

    if (loading){
        return(
            <div className={"apply-square-background col-span-3"}>
                <Loading />
            </div>
            )
    }

    if (owner.id == user){
        return <h1 className={"apply-square-background col-span-3"}>You shouldn't message yourself</h1>
    }
    else{
        console.log("its not the same, owner is: " + owner.id + " and user is: " + user)
    }

    if (messages.length === 0){
        return (
            <div className={"apply-square-background col-span-3"}>
                <h1>Failed to load messages!</h1>
            </div>
        )
    }

    return (
        <div className={"message-box apply-square-background col-span-3"}>
            <h1>Messages with {owner.name}</h1>
            {
                messages.map((message) =>
                    <div className={"message border-dotted border-2 border-sky-500"}>
                        <h3>From: {message.from}</h3>
                        <h3>Title: {message.title}</h3>
                        <p>{message.message}</p>
                    </div>
                )
            }
            <div className={"message-new-message grid gap-4 grid-rows-3"}>
                <input className={"row-span-1"} placeholder={"Title"} type="text"/>
                <input className={"row-span-2"} placeholder={"Message"} type="text"/>
            </div>

        </div>
    )
}