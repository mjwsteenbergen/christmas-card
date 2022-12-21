import { Event } from "../../scripts/parseTelegram";
import EventCC from "../event/EventCC";
import data from './data.json' assert { type: "json" };

export default () => <div className="event-wrapper">
    <h1>My Year in pictures</h1>
    <div className="flex">
        {
            (data as Event[]).map(event => <EventCC ev={event} />)
        }
    </div>
</div>