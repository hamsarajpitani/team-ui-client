import React, { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import useIsMobile from "../../utils/hooks/useIsMobile";
import TextContainer from "../../features/IPO/components/TextContainer";

const Step = ({ data, label, index, currentStep, onClick }) => {
    const isActive = index <= currentStep;
    return (
        <div
            onClick={() => onClick(index)}
            className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full text-xl text-white ${isActive ? "bg-green-600" : "bg-gray-400"
                }`}
        >
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                {isActive && <FaCheck className="p-0.5" />}
            </span>
            <TextContainer className="absolute text-left left-full ml-4 md:text-center text-base font-semibold text-primary md:left-auto md:top-full md:ml-0 md:mt-4 whitespace-nowrap md:whitespace-pre-wrap [&>span]:whitespace-nowrap " title={label} desc={data} />
        </div>
    );
};

const ProgressBar = ({ currentStep, stepsLength }) => {
    const isMobile = useIsMobile();
    const progressWidth = currentStep
        ? (currentStep / (stepsLength - 1)) * 100
        : 0;

    return (
        <div className="absolute left-[0.95rem] md:left-0 right-0 flex h-full md:h-0.5 w-0.5 md:w-full justify-between bg-gray-300">
            <div
                style={{ [isMobile ? 'height' : 'width']: `${progressWidth}%` }}
                className={`md:h-0.5 w-0.5 md:w-full bg-green-600 ${currentStep === 0 ? "ml-4" : ""}`}
            ></div>
        </div>
    );
};

const Stepper = ({ data, labels }) => {
    const stepsLength = Object.keys(labels).length;
    const currentStepCount = Object.keys(data).length - 1;
    const [currentStep, setCurrentStep] = useState(currentStepCount);

    const handleClick = (index) => {
        setCurrentStep(index);
    };

    // const handleNext = () => {
    //     setCurrentStep((prev) => (prev === stepsLength - 1 ? prev : prev + 1));
    // };

    if (!data || !labels) return null;

    return (
        <section className="mx-auto md:w-11/12 md:h-32">
            <div className="relative flex flex-col justify-between gap-12 md:flex-row md:items-center">
                {Object.entries(labels).map(([key, value], index) => (
                    <Step
                        key={key}
                        label={value}
                        index={index}
                        data={data[key]}
                        currentStep={currentStep}
                        onClick={handleClick}
                    />
                ))}
                <ProgressBar currentStep={currentStep} stepsLength={stepsLength} />
            </div>
        </section>
    );
};

export default Stepper;
