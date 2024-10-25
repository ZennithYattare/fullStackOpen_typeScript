import { atom, useAtom } from "jotai";

export const notificationAtom = atom<{
	message: string | null;
	alert: "success" | "error" | null;
}>({
	message: null,
	alert: null,
});

export const useNotifier = () => {
	const [, setNotification] = useAtom(notificationAtom);

	const notify = ({
		message,
		alert,
	}: {
		message: string | null;
		alert: "success" | "error" | null;
	}) => {
		setNotification({ message, alert });
		setTimeout(() => {
			setNotification({ message: null, alert: null });
		}, 5000); // 5000 milliseconds = 5 seconds
	};

	return notify;
};
