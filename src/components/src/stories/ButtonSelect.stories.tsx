import React, { useState } from "react";
import opts from "../../../lib/src/default-text-options";
import ButtonSelect from "../ButtonSelect";
import { Story } from "@storybook/react";

type ButtonSelectProps = Parameters<typeof ButtonSelect>[0];

export default {
    title: "ButtonSelect",
    component: ButtonSelect,
};

const Template: Story<ButtonSelectProps> = (args) => {
    const [value, setValue] = useState<string>("a");
    return <div>
        <ButtonSelect
            {...args}    
            value={value}
            handleChange={e => setValue(e)}
        />
    </div>;
}

export const Basic = Template.bind({});
Basic.args = {
    options: [
        { value: "a", label: "Option A" },
        { value: "b", label: "Option B" },
        { value: "c", label: "Option C" },
    ],
};