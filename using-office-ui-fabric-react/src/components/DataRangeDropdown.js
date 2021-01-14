import React, { useEffect, useState } from 'react'

import {
    Stack,
    TextField,
    Dropdown,
    DropdownMenuItemType
} from 'office-ui-fabric-react'

import { Duration } from 'luxon'

const dropdownStyles = {
    dropdown: { width: 300 },
};

const options = [
    { key: 'fruitsHeader', text: 'Fruits', itemType: DropdownMenuItemType.Header },
    { key: 'apple', text: 'Apple' },
    { key: 'banana', text: 'Banana' },
    { key: 'orange', text: 'Orange', disabled: true },
    { key: 'grape', text: 'Grape' },
    { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
    { key: 'vegetablesHeader', text: 'Vegetables', itemType: DropdownMenuItemType.Header },
    { key: 'broccoli', text: 'Broccoli' },
    { key: 'carrot', text: 'Carrot' },
    { key: 'lettuce', text: 'Lettuce' },
];

const stackTokens = { childrenGap: 20 };

const textFieldStyle = {
    width: 80,
    field: {
        color: 'black',
        opacity: '0.8',
        fontSize: 12,
    },
    suffix: {
        backgroundColor: '#FFFFFF',
        color: 'black',
        opacity: '0.8',
        fontSize: 12,
    },
}


export const DropdownBasicExample = (missionDuration, setMissionDuration) => {
    const [durationMonths, setDurationMonths] = useState(undefined)
    const handleDurationMonthsChange = event => {
        setDurationMonths(event.target.value)
    }

    // useEffect(() => {
    //     // https://moment.github.io/luxon/docs/class/src/duration.js~Duration.html#static-method-fromObject
    //     setMissionDuration(
    //         Duration.fromObject({
    //             months: durationMonths ? Number(durationMonths) : 0,
    //         }),
    //     )
    // }, [durationMonths])

    useEffect(() => {
        if (missionDuration) {
            const durationFromProps = Duration.fromISO(missionDuration)
            setDurationMonths(durationFromProps.months)
        }
    }, [])
    return (
        <Stack tokens={stackTokens}>
            <Stack.Item>
                <TextField
                    type="number"
                    value={durationMonths || ''}
                    onChange={handleDurationMonthsChange}
                    min="00"
                    max="11"
                    suffix="mo."
                    styles={textFieldStyle}
                />
            </Stack.Item>
            <Stack.Item>
                <Dropdown
                    placeholder="Select an option"
                    label="Basic uncontrolled example"
                    options={options}
                    styles={dropdownStyles}
                />
            </Stack.Item>
            <Stack.Item>
                <Dropdown
                    label="Disabled example with defaultSelectedKey"
                    defaultSelectedKey="broccoli"
                    options={options}
                    disabled={true}
                    styles={dropdownStyles}
                />
            </Stack.Item>
            <Stack.Item>
                <Dropdown
                    placeholder="Select options"
                    label="Multi-select uncontrolled example"
                    defaultSelectedKeys={['apple', 'banana', 'grape']}
                    multiSelect
                    options={options}
                    styles={dropdownStyles}
                />
            </Stack.Item>
        </Stack>
    );
};
