import { Octokit, App } from "octokit";

const octokit = new Octokit({
    auth: ''
  })

const ORG_NAME = "AustinGaileyDevelopment"
const REPO_NAME = "GithubRepoManager"
const BRANCH_NAME = "main"
const USERS = []
const TEAMS = []
const APPS = []
const restrictions = {
    owner: ORG_NAME,
    repo: REPO_NAME,
    branch: BRANCH_NAME,
    required_status_checks: {
      strict: true,
      contexts: [
      ]
    },
    enforce_admins: true,
    required_pull_request_reviews: {
      dismissal_restrictions: {
        users: USERS,
        teams: TEAMS
      },
      dismiss_stale_reviews: true,
      require_code_owner_reviews: true,
      required_approving_review_count: 0,
      bypass_pull_request_allowances: {
        users: USERS,
        teams: TEAMS
      }
    },
    restrictions: {
        users: USERS,
        teams: TEAMS,
      apps: APPS
    },
    required_linear_history: true,
    allow_force_pushes: true,
    allow_deletions: true,
    block_creations: true,
    required_conversation_resolution: true
  }

async function getBranch() {
    var result =   await octokit.request('GET /repos/' + ORG_NAME + '/' + REPO_NAME + '/branches/' + BRANCH_NAME, {
        owner: ORG_NAME,
        repo: REPO_NAME,
        branch: BRANCH_NAME
      })
    console.log(result.data.protection)
}

async function getRepos() {  
    console.log("List of Repos:")
    var result = await octokit.request('GET /orgs/' + ORG_NAME + '/repos', {
        org: ORG_NAME
    })
    for (var index in result.data){
        console.log(result.data[index].name)
    }
}

async function getAccess() {
    var result = await octokit.request('GET /repos/' + ORG_NAME + '/' + REPO_NAME + '/branches/' + BRANCH_NAME + '/protection/restrictions', {
        owner: ORG_NAME,
        repo: REPO_NAME,
        branch: BRANCH_NAME
      })

    // for (var index in result.data.users){
    //     console.log(result.data.users[index].login)
    // }
    console.log(result.data)
}

async function putRestrictions(restrictions) {
    var result = await octokit.request('PUT /repos/' + ORG_NAME + '/' + REPO_NAME + '/branches/' + BRANCH_NAME + '/protection', restrictions)
      console.log(result.status)
}

//getRepos()
//getBranch()
console.log("Who has Access to this Repo:")
getAccess()
putRestrictions(restrictions)