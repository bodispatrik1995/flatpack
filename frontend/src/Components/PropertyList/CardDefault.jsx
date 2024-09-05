import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import {Link} from "react-router-dom";

export function CardDefault(props) {
        function currencyFormat(num) {
            return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        }
        const currencyPrice = currencyFormat(props.price)
    return (<div key={props.id}>
        <Card className="mt-6 w-96">
            <CardHeader color="blue-gray" className="relative h-56">
                <img
                    src="https://kep.cdn.indexvas.hu/1/0/2098/20980/209807/20980782_1335884_a378a0520a6450953bd777efc34d0fe3_wm.jpg"
                    alt="card-image"
                />
            </CardHeader>
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                   Price: {currencyPrice} $
                </Typography>
                <Typography>
                  Address: {props.address}
                </Typography>
                <Typography>
                    Rooms: {props.rooms}
                </Typography>
                <Typography>
                    Size: {props.size}
                </Typography>
            </CardBody>
            <CardFooter className="pt-0">
                <Button><Link to={`/property/${props.id}`} >Read More</Link></Button>
            </CardFooter>
        </Card>
        </div>
    );
}