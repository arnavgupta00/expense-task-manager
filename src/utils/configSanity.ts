import {createClient} from "next-sanity"

export const sanityClient = createClient({
    projectId: "hk4kjt8n",
    dataset: "production",
    apiVersion: "2022-03-07",
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
})