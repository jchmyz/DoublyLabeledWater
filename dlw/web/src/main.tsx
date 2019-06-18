import * as React from "react";
import * as ReactDOM from "react-dom";
import {DLWApp} from "./DLWApp";

let _main: () => void = function () {
    let mount_point = document.getElementById("main");
    try {
        ReactDOM.render(<DLWApp/>, mount_point);
    } catch (e) {
        let error_elements = (
            <div className={"startup-error"}>
                <p>Error rendering application</p>
                <pre>{e.toString()}</pre>
                <p>See error console for stack trace.</p>
            </div>
        );
        console.error("Error with startup", e);
        ReactDOM.render(error_elements, mount_point);
    }
};

export const main = _main;
