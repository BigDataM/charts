import Axios from "axios"

const BdmApi = {
    getCommentsAndShares: async (clientId, profileId, since, until, interval) => {
        return await Axios.get("assets/comments-and-shares.json")
    },
    getCommentsByTagBarchart: async (clientId, profileId) => {
        return await Axios.get("assets/comments-clasification-barchart.json")  
    },
    getCommentsByTagTimeline: async (clientId, profileId) => {
        return await Axios.get("assets/comments-clasification-timeline.json")
    },
    getCommentsPerDay: async(clientId, profileId) => {
        return await Axios.get("assets/comments-p-day.json")
    },
    getCommentsPerFeeling: async(clientId, profileId) => {
        return await Axios.get("assets/sentiment-p-comments.json")
    },
    getInteractionsPerPost: async(clientId, profileId, since, until, interval) => {
        return await Axios.get("assets/interaction-per-post.json")
    },
    getPostsPerDay: async(clientId, profileId) => {
        return await Axios.get("assets/posts-p-day.json")
    },
    getProfileMetrics: async (clientId, profileId, since, until, interval) => {
        return await Axios.get("assets/followers-timeline.json")
    },
    getPostsMetrics: async(clientId, profileId, since, until, interval) => {
        return await Axios.get("assets/posts-timeline.json")
    },
    getPostsPerType: async(clientId, profileId) => {
        return await Axios.get("assets/format-post.json")
    },
    getPostsPerTag: async(clientId, profileId, since, until, interval) => {
        return await Axios.get("assets/post-clasification-timeline.json")
    },
    getSocialComments: async(clientId, profileId, since, until, interval) => {
        return await Axios.get("assets/social-comments-timeline.json")
    },
    getTotalComments: async(clientId, profileId, since, until, interval) => {
        return await Axios.get("assets/comments-count-by-interval.json")
    },
    getTotalPosts: async(clientId, profileId) => {
        return await Axios.get("assets/posts-timeline.json")
    },
    getWordCloudWords: async(clientId, profileId) => {
        return await Axios.get("assets/word-cloud.json")
    }

}

export default BdmApi;