export const getBooks = async () => {
    try {
        const response = await fetch('/borrowingHistoryData.json');
        console.log('response', response);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
