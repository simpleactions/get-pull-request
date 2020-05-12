import * as core from '@actions/core'
import * as github from '@actions/github'

async function run(): Promise<void> {
  const token = (core.getInput('github_token') ||
    process.env.GITHUB_TOKEN) as string

  const octokit = new github.GitHub(token)
  const context = github.context

  const pull_number = parseInt(core.getInput('pull_number'), 0)

  const request = await octokit.pulls.get({
    ...context.repo,
    pull_number
  })

  const pull = request.data
  core.setOutput('base_ref', pull.base.ref)
  core.setOutput('base_sha', pull.base.sha)
  core.setOutput('head_ref', pull.head.ref)
  core.setOutput('head_sha', pull.head.sha)
  core.setOutput('state', pull.state)
  core.setOutput('mergeable', pull.mergeable)
  core.setOutput('mergeable_state', pull.mergeable_state)
  core.setOutput('title', pull.title)
  core.setOutput('user_login', pull.user.login)
}

run().catch((error: Error) => {
  core.setFailed(error.message)
})
