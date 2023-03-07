import React from "react";
import opts from "../../../lib/src/default-text-options";
import Examples from "../Examples";
import { Story } from "@storybook/react";

type ExamplesProps = Parameters<typeof Examples>[0];

export default {
    title: "Examples",
    component: Examples,
};

const Template: Story<ExamplesProps> = (args) => <div>
    <p>Before example</p>
    <Examples {...args} />
    <p>After Example</p>
</div>;

export const Basic = Template.bind({});
Basic.args = {
    opts: opts,
    ex: [
        { p: "زه کور ته ځم", f: "zu kor ta dzum", e: "I'm going home" },
        { p: "مونږ کور ته ځو", f: "moonG kor ta dzoo", e: "We're going home" },
    ],
};
