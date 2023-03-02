
import { ChatGPT } from "./openai/ask"

const createContent = (title: string, content: string) => {
    const summaryContent = `<h4>${title}</h5><p>${content}</5>`;
    const summaryElement = document.createElement("div")
    summaryElement.innerHTML = summaryContent

    return summaryElement
}

const sections = [{
    "section": "Summary",
    "prompt": ""
}, {
    "section": "Similar Projects",
    "prompt": "give 3 examples of similar projects"
}, {
    "section": "Understandability",
    "prompt": "in the range 0f 1 - 10 how understandable is the project description, explain "
}, {
    "section": "Resources",
    "prompt": "What are the required technologies to cover this project "
}
]


async function processData(description: string, nextNode: any) {
    try {

        console.log("des ", description)

        // Setting up the container
        const container = document.createElement("div")
        container.style.backgroundColor = "#CCCCCC"
        container.style.padding = "5px"

        const chatGPT = new ChatGPT()

        let prompt

        for (let i = 0; i < sections.length; i++) {
            const section = sections[i];
            const title = section.section
            prompt = i == 0 ? `This is another project not related to the previous ones. Summarize this  ${description}` : section.prompt

            const response = await chatGPT.askGPT(prompt)

            const content = createContent(title, response)

            container.append(content)
            nextNode.before(container)

        }

        // container.append(summaryElement)

        // console.log("job ", jobDescriptionNode, summaryElement)

        // const one = nextNode.before(container)

        // console.log("one ", one)



        // const newContent = document.createTextNode(summary);

        // display(jobDescriptionNode, newContent)

        // console.log("response ", summary)
    } catch (error) {
        console.log(error)
    }
}

window.onload = () => {

    const _nextNode = document.querySelectorAll('div[data-test="JobTileAttrs"]')
    let i = 0;
    document.querySelectorAll('span[data-test="job-description-text"]').forEach((span) => {

        const jobDescriptionNode = span.textContent
        // const jobDescriptionNode = document.querySelectorAll('span[data-test="job-description-text"]')[i]
        const nextNode = _nextNode[i]
        i++


        if (jobDescriptionNode) {
            processData(jobDescriptionNode, nextNode)
        }

    })

}
