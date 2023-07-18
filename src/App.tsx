import { configureAbly, useChannel } from "@ably-labs/react-hooks";
import { useState } from "react";

// Do not use this authentication method for production;
// https://ably.com/docs/auth#token-authentication
configureAbly({ key: import.meta.env.VITE_ABLY_API_KEY });

export const App = () => {
	const [messages, updateMessages] = useState<string[]>([]);

	const [channel] = useChannel("live-update-experiment", (message) => {
		updateMessages((prev) => [...prev, message.data]);
	});

	return (
		<div>
			{channel.state}{" "}
			{messages.map((message, i) => (
				// Can use index as key because existing elements will never change
				<div key={i}>{message}</div>
			))}
		</div>
	);
};
