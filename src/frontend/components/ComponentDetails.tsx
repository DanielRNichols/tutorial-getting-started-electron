import * as React from "react";
import {IComponent} from "../../common/models/Component";
import { ComponentProperties } from "./ComponentProperties";

interface IProps {
    component: IComponent | undefined;
}

// tslint:disable-next-line:variable-name
export const ComponentDetails = (props: IProps) => {
    const comp = props.component;
    if (comp === undefined) {
      return <div></div>;
    }
    return (
        <div>
            <ul>Details: {comp.tag}
                <li>id: {comp.id}</li>
                <li>class: {comp.className}</li>
                <ComponentProperties properties={comp.properties} />
            </ul>
        </div>
    );
};
