import {useEffect, useState} from "react";
import Loading from "./Loading.jsx";
import Message from "./Message.jsx";

export default function Inbox(props) {

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

    const [user, setUser] = useState(localStorage.getItem('userId') ? localStorage.getItem('userId') : null);

    const [messages, setMessages] = useState([])

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setMessages(testMessages)
        setLoading(false)
        /*const messagesResponse = fetch('http://localhost:8080/api/user/messages');
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

    return (
        <div className={"message-box apply-square-background col-span-3"}>
            {
                messages.map((message) =>
                    <div className={"message border-dotted border-2 border-sky-500"}>
                        <Message from={message.owner} message={message.message} title={message.title}></Message>
                    </div>
                )
            }
        </div>
    )
}