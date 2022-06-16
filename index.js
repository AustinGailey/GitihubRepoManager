import { Octokit, App } from "octokit";

const octokit = new Octokit({
    auth: ''
  })

async function getBranch() {
    var result =   await octokit.request('GET /repos/AustinGaileyDevelopment/GithubRepoManager/branches/main', {
        owner: 'AustinGaileyDevelopment',
        repo: 'GithubRepoManager',
        branch: 'main'
      })
    console.log(result.data.protection)
}

async function getRepos() {  
    console.log("List of Repos:")
    var result = await octokit.request('GET /orgs/AustinGaileyDevelopment/repos', {
        org: 'AustinGaileyDevelopment'
    })
    for (var index in result.data){
        console.log(result.data[index].name)
    }
}

async function getAccess() {
    console.log("Who has Access to this Repo:")
    var result = await octokit.request('GET /repos/AustinGaileyDevelopment/GithubRepoManager/branches/main/protection/restrictions', {
        owner: 'AustinGaileyDevelopment',
        repo: 'GithubRepoManager',
        branch: 'main'
      })
    console.log(result.data.users)
}

async function putRestrictions() {
    var result = await octokit.request('PUT /repos/austingailey/GithubRepoManager/branches/main/protection', {
        owner: 'austingailey',
        repo: 'GithubRepoManager',
        branch: 'main',
        required_status_checks: {
          strict: true,
          contexts: [
            'continuous-integration/travis-ci'
          ]
        },
        enforce_admins: true,
        required_pull_request_reviews: {
          dismissal_restrictions: {
            users: [
              'austingailey'
            ],
            teams: [
              'sre'
            ]
          },
          dismiss_stale_reviews: true,
          require_code_owner_reviews: true,
          required_approving_review_count: 2,
          bypass_pull_request_allowances: {
            users: [
              'austingailey'
            ],
            teams: [
              'justice-league'
            ]
          }
        },
        restrictions: {
          users: [
            'austingailey'
          ],
          teams: [
            'sre'
          ],
          apps: [
          ]
        },
        required_linear_history: true,
        allow_force_pushes: true,
        allow_deletions: true,
        block_creations: true,
        required_conversation_resolution: true
      })
}

getRepos()
//getBranch()
getAccess()
//putRestrictions()