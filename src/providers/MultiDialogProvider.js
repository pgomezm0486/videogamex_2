import React, { createContext, useCallback, useContext, useState } from "react";

const MultiDialogContext = createContext();

function MultiDialogProvider({ children }) {
	const [dialog, setDialog] = useState({
		id: "",
		mode: "",
		data: {},
		open: false,
		loading: true
	});

	const openDialog = (mode = "detalle") => {
		setDialog({ ...dialog, mode, open: true, loading: true });
	};

	const closeDialog = (event, reason) => {
		if (reason && reason === "backdropClick") return;
		setDialog({ ...dialog, open: false });
	};

	const handleData = (data) => {
		setDialog({ ...dialog, data });
	};

	const stopLoading = () => {
		setTimeout(() => {
			setDialog((dialog) => ({ ...dialog, loading: false }));
		}, 500);
	};

	const loadData = async (callback, id) => {
		try {
			const result = await callback({ id });
			setDialog((dialog) => ({ ...dialog, data: result.data }));
		} catch (error) {
			throw new Error(error);
		}
		stopLoading();
	};

	const loadEmpty = (empty) => {
		setDialog((dialog) => ({ ...dialog, data: empty }));
		stopLoading();
	};

	const multiDialog = {
		dialog,
		openDialog,
		closeDialog,
		handleData,
		stopLoading,
		loadData,
		loadEmpty
	};

	return <MultiDialogContext.Provider value={multiDialog}>{children}</MultiDialogContext.Provider>;
}

export function useMultiDialog() {
	return useContext(MultiDialogContext);
}

export default MultiDialogProvider;
