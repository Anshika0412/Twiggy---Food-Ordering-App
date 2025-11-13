import { useRouteError } from "react-router-dom";

export default function Error() {
    const err = useRouteError();

    return(
        <div>
            <h2>Oops,</h2>
            <p>Something went wrong !!</p>
            <p>{err.status}: {err.statusText}</p>
            
        </div>
    );
}