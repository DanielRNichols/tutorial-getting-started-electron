import * as React from "react";
import {IComponent} from "../../common/models/component";

interface IProps {
    component: IComponent;
}

// tslint:disable-next-line:variable-name
export const ComponentsListItemDetails = (props: IProps) => {
    const comp = props.component;
    return (
        <div>
            <ul>
                <li>id: {comp.id}</li>
                <li>class: {comp.className}</li>
            </ul>
        </div>
    );
};
