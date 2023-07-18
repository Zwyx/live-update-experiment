import { configureAbly, useChannel } from "@ably-labs/react-hooks";
import { useEffect, useState } from "react";
import { Confetti } from "~/lib/confetti.min.js";

// Do not use this authentication method for production;
// https://ably.com/docs/auth#token-authentication
configureAbly({ key: import.meta.env.VITE_ABLY_API_KEY });

export const App = () => {
	const [messages, updateMessages] = useState<string[]>([]);

	const [channel] = useChannel("live-update-experiment", (message) => {
		updateMessages((prev) => [...prev, message.data]);
	});

	useEffect(() => {
		const confetti = new Confetti("confetti");

		confetti.setCount(75);
		confetti.setSize(1);
		confetti.setPower(25);
		confetti.setFade(false);
		confetti.destroyTarget(false);
	}, []);

	useEffect(() => {
		if (messages.length) {
			const confettiElement = document.getElementById("confetti");

			if (confettiElement) {
				const boundingClientRect = confettiElement.getBoundingClientRect();

				confettiElement.dispatchEvent(
					new PointerEvent("click", {
						clientX: boundingClientRect.x + boundingClientRect.width / 2,
						clientY: boundingClientRect.y,
					}),
				);
			}
		}
	}, [messages]);

	return (
		<>
			<div className="m-8 border rounded p-4 max-w-lg flex justify-between mx-auto">
				<div>Channel state:</div>
				<div className="text-blue-500">{channel.state}</div>
			</div>

			<div className="m-8 border rounded p-4 max-w-lg mx-auto">
				{messages.map((message, i) => (
					// Can use index as key because existing elements will never change
					<div key={i} className="mb-4 font-mono">
						- {message}
					</div>
				))}

				{!messages.length && (
					<div className="text-gray-500 text-center mb-4">
						(Waiting for messages)
					</div>
				)}

				<span className="relative flex h-3 w-3 m-auto">
					<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
					<span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
				</span>

				<div id="confetti" />
			</div>
		</>
	);
};
