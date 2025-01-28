// services/notesService.js
export const fetchNotes = async (endpoint, refreshToken) => {
    if (!refreshToken) throw new Error("No access token found");

    const response = await fetch(endpoint, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${refreshToken}`,
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "An error occurred");
    }

    return await response.json();
};

export const updateNoteStatus = async (noteId, status) => {
    const response = await fetch(`/api/notes/${noteId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
    });

    if (!response.ok) throw new Error('Error updating note status');
};