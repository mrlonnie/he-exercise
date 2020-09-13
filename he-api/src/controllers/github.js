'use strict';
const axios = require('axios')

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
exports.getRepository = async (params) => {
  const owner = params.owner;
  const repo = params.repo;
  try {
    const resp = await axios.get('https://api.github.com/repos',{
      params: {
        owner: owner,
        repo: repo
      }
    })
    return resp.data
  } catch (error) {
    console.error(error)
  }
}