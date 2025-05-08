export const MonthYear = (date: any) => {
    const month = new Date(date).toLocaleString('default', { month: 'numeric' })
    const year = new Date(date).getFullYear();
    return `${month}/${year}`;
}

export const DateMonthYear = (date: any) => {
    const day = new Date(date).toLocaleString('default', { day: 'numeric' });
    const month = new Date(date).toLocaleString('default', { month: 'numeric' });
    const year = new Date(date).getFullYear();
    return `${day}/${month}/${year}`;
}

export const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getUTCFullYear();
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    return `${day} ${month} ${year} `;
};

export const calculateTimeLeft = (endTime: string, data: any) => {
    const now = new Date().getTime();
    const end = new Date(endTime).getTime();
    const diff = end - now;

    if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        // Add 0 if less than 10
        return {
            days: days < 10 ? `0${days}` : days.toString(),
            hours: hours < 10 ? `0${hours}` : hours.toString(),
            minutes: minutes < 10 ? `0${minutes}` : minutes.toString(),
            seconds: seconds < 10 ? `0${seconds}` : seconds.toString(),
        };
    }
}