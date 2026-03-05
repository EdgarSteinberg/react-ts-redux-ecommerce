import { Badge } from "react-bootstrap";
import { getUserStatus } from "../utils/userStatus";

type Props = {
    lastConnection: Date | null;
}

const UserStatusBadge = ({ lastConnection }: Props) => {
    const status = getUserStatus(lastConnection);

    return (
        <>
            <Badge bg={status.color}>
                {status.text}
            </Badge>
        </>
    )
}

export default UserStatusBadge;