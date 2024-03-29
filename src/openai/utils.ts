
class Utils {
    async wait(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    parseGPTResponse(response: string): string | undefined {
        try {
            let parsedData = ""

            let data = response.split(`"choices": `).slice(1)
            data = data.map((item) => item.replace(/"|\\n/g, ""))
            data.map((item) => parsedData += item.replace(/\[\{text:/g, "").split(", index")[0])

            return parsedData
        } catch (error) {
            console.log("Error parsing the gpt response ", error)
        }

    }
}

export const utils = new Utils()