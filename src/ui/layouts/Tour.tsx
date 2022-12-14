import React, { useState, useEffect } from "react";
import JoyRide from "react-joyride";

// Tour steps
const TOUR_STEPS = [
    {
        target: "#pipelines",
        content: "This is the pipelines",
    },
    {
        target: "#runs",
        content: "this is the runs",
    },
    {
        target: "#stack",
        content: "this is the stack",
    },
    {
        target: "#stack-component",
        content: "this is the stack components",
    },

    {
        target: "#documentation",
        content: "This is the documentation",
    },
    {
        target: "#example",
        content: "this is the example",
    },
    {
        target: "#report",
        content: "this is the report",
    },
    {
        target: "#settings",
        content: "this is the settings",
    },
];

// Tour component
const Tour = () => {

    const [run, setRun] = useState(true)
    const node = document.querySelector('[title="Skip"]');

    // eslint-disable-next-line
    const skipTour = () => localStorage.setItem('runTour', 'false')
    node?.addEventListener("click", skipTour);
    

    useEffect(() => {
        // eslint-disable-next-line
        if (localStorage.getItem('runTour') == 'false') {
            setRun(false)
        } else {
            setRun(true)
        }  
    }, [skipTour])

    return (
        <JoyRide
            steps={TOUR_STEPS}
            run={run}
            hideCloseButton
            continuous
            showSkipButton
            showProgress

            styles={{
                buttonNext: {
                    backgroundColor: '#433E99'
                },
                options: {
                    primaryColor: '#fff',
                    zIndex: 1000,
                },
            }}
        />
    );
};
export default Tour;