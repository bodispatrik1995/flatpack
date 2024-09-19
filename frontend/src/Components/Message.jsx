export default function Message({title, message, from}){
    return (
        <div className={"message grid grid-rows-5 gap-4 apply-square-background"}>
            <h1 className={"row-span-1"}>Property: {title}</h1>
            <h1 className={"row-span-1"}>From: {from}</h1>
            <p className={"row-span-2"}>Message: {message}</p>
        </div>
    )
}