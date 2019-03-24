import {FormEvent} from "react";
import * as React from "react";
import {ControlGroup, InputGroup, Tag, IconName} from "@blueprintjs/core";

export interface NumberInputProps {
    placeholder: string,
    index: number,
    change_function: (index: number, event: FormEvent<HTMLElement>) => void
    value: string,
    unit: string
}

export class NumberInput extends React.Component<NumberInputProps> {

    render() {
        let icon: IconName = "circle-arrow-right";
        if (this.props.value === "") {
            icon = "circle-arrow-right";
        } else if (!isNaN(+this.props.value)) {
            icon = "tick";
        } else {
            icon = "ban-circle";
        }

        return (
            <ControlGroup fill={true}>
                <InputGroup
                    leftIcon={icon} className={'.bp3-fill'} rightElement={<Tag>{this.props.unit}</Tag>}
                    onChange={(event: FormEvent<HTMLElement>) => this.props.change_function(this.props.index, event)}
                    placeholder={this.props.placeholder} value={this.props.value}/>
            </ControlGroup>
        );
    }
}
