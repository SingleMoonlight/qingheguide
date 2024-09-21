import { printLog } from '../utils/common'
export function createJsonp(url, callbackName, params) {
    return new Promise((resolve, reject) => {
        // Generate a unique ID for the script tag
        const id = `jsonp_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
        // Define the callback function name
        const uniqueCallbackName = `${callbackName}_${id}`;

        // Add the callback function to the window object
        window[uniqueCallbackName] = (response) => {
            resolve(response);
            // Remove the script tag and the callback from the window object
            document.body.removeChild(script);
            delete window[uniqueCallbackName];
        };

        // Construct the URL with the callback parameter
        let finalUrl = url + (url.includes('?') ? '&' : '?') + 'callback=' + uniqueCallbackName;
        Object.keys(params).forEach(key => {
            finalUrl += '&' + key + '=' + encodeURIComponent(params[key]);
        });

        // Create a script element and append it to the document
        const script = document.createElement('script');
        script.src = finalUrl;
        script.id = id;
        document.body.appendChild(script);
    });
}
export function useJsonpRequest(url, callbackName, params) {
    const fetchJsonp = async () => {
        try {
            const response = await createJsonp(url, callbackName, params);
            return response;
        } catch (error) {
            printLog('error', 'Error fetching JSONP:', error);
            throw error;
        }
    };

    return { fetchJsonp };
}