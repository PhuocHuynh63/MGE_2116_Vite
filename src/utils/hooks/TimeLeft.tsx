import { useEffect, useState } from "react";
import { calculateTimeLeft } from "../helpers/date";
import timerService from "../../services/timer";

export const useTimeLeft = (endTime: string | null) => {
    const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(endTime || "", null));

    useEffect(() => {
        if (!endTime) return;

        const interval = setInterval(() => {
            setTimeLeft(() => {
                const nextTimeLeft = calculateTimeLeft(endTime, null);
                if (
                    nextTimeLeft &&
                    nextTimeLeft.days === "00" &&
                    nextTimeLeft.hours === "00" &&
                    nextTimeLeft.minutes === "00" &&
                    nextTimeLeft.seconds === "00"
                ) {
                    clearInterval(interval);
                    timerService.updateStatusTimerToPending();
                }
                return nextTimeLeft;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [endTime]);

    return timeLeft;
};