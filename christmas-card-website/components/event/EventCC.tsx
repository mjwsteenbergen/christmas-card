import { Event } from "../../scripts/parseTelegram";
import { Fragment, useState } from "react";
import { ChristmasEvent } from "../stencil-generated";

type Props = {
    ev: Event
}
export default ({ ev }: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    return 
}