'use strict';
const axios = require('axios')
const token = '44284283e0ffe8f88e26a255f3b8692cfd232cec';

exports.searchRepositories = async (q) => {
  try {
    const resp = await axios.get('https://api.github.com/search/repositories', {
      params: {
        q: q
      }
    })
    return resp.data
  } catch (error) {
    console.error(error)
  }
}
exports.getRepository = async (query) => {
  const owner = query.owner;
  const repo = query.repo;
  try {
    const resp = await axios.get(`https://api.github.com/repos/${owner}/${repo}`)
    console.log(resp.data)
    return resp.data
  } catch (error) {
    console.error(error)
  }
}
