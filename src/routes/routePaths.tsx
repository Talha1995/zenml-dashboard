// const url_string = window.location.href;
// const url = new URL(url_string);
// const workspaceName = url.searchParams.get('workspace');

export const routePaths = {
  login: '/login',
  signup: '/signup',
  userEmail: `/user-email`,
  forgot: '/forgot-password',
  home: `/`,
  dashboard: (workspace: string): string => `/workspaces/${workspace}`,
  pipelines: {
    base: `/pipelines`,
    list: (workspace: string): string =>
      `/workspaces/${workspace}/pipelines/list`,
    allRuns: (workspace: string): string => `/workspaces/${workspace}/all-runs`,
  },
  pipeline: {
    base: (id: TId): string => `/pipelines/${id}`,
    configuration: (id: TId, workspace: string): string =>
      `/workspaces/${workspace}/pipelines/${id}/configuration`,
    runs: (workspace: string, id: TId): string =>
      `/workspaces/${workspace}/pipelines/${id}/runs`,
  },
  run: {
    pipeline: {
      base: (id: TId, pipelineId: TId): string =>
        `/pipelines/${pipelineId}/runs/${id}`,
      statistics: (workspace: string, id: TId, pipelineId: TId): string =>
        `/workspaces/${workspace}/pipelines/${pipelineId}/runs/${id}/dag`,
      results: (workspace: string, id: TId, pipelineId: TId): string =>
        `/workspaces/${workspace}/pipelines/${pipelineId}/runs/${id}/configuration`,
      tensorboard: (id: TId, pipelineId: TId): string =>
        `/pipelines/${pipelineId}/runs/${id}/tensorboard`,
    },
    stack: {
      base: (id: TId, pipelineId: TId): string =>
        `/stacks/${pipelineId}/runs/${id}`,
      statistics: (workspace: string, id: TId, stackId: TId): string =>
        `/workspaces/${workspace}/stacks/${stackId}/runs/${id}/dag`,
      results: (workspace: string, id: TId, pipelineId: TId): string =>
        `/workspaces/${workspace}/stacks/${pipelineId}/runs/${id}/configuration`,
      tensorboard: (id: TId, pipelineId: TId): string =>
        `/stacks/${pipelineId}/runs/${id}/tensorboard`,
    },
    component: {
      base: (id: TId, pipelineId: TId): string =>
        `/components/${pipelineId}/runs/${id}`,
      statistics: (
        type: string,
        stackComponentId: TId,
        id: TId,
        workspace: string,
      ): string =>
        `/workspaces/${workspace}/components/${type}/${stackComponentId}/runs/${id}/dag`,
      results: (
        type: string,
        stackComponentId: TId,
        id: TId,
        workspace: string,
      ): string =>
        `/workspaces/${workspace}/components/${type}/${stackComponentId}/runs/${id}/results`,
      tensorboard: (id: TId, pipelineId: TId): string =>
        `/components/${pipelineId}/runs/${id}/tensorboard`,
    },
    run: {
      base: (runId: TId): string => `/all-runs/${runId}`,
      statistics: (workspace: string, id: TId, type?: string): string =>
        `/workspaces/${workspace}/all-runs/${id}/dag`,
      results: (workspace: string, runId: TId): string =>
        `/workspaces/${workspace}/all-runs/${runId}/configuration`,
      tensorboard: (runId: TId): string => `/runs/${runId}/tensorboard`,
    },
  },
  stacks: {
    base: '/stacks',
    list: (workspace: string): string => `/workspaces/${workspace}/stacks/list`,
    allRuns: '/stacks/all-runs',
    createStack: (workspace: string): string =>
      `/workspaces/${workspace}/create-stack/all-component`,
  },
  stack: {
    base: (id: TId): string => `/stacks/${id}`,
    configuration: (id: TId, workspace: string): string =>
      `/workspaces/${workspace}/stacks/${id}/configuration`,
    runs: (workspace: string, id: TId): string =>
      `/workspaces/${workspace}/stacks/${id}/runs`,
    components: (id: TId, workspace: string): string =>
      `/workspaces/${workspace}/stacks/${id}/component`,
  },
  runs: {
    base: (id: TId): string => `/stacks/${id}`,
    configuration: (id: TId): string => `/runs/${id}/configuration`,
    runs: (id: TId): string => `/stacks/${id}/runs`,
  },

  stackComponents: {
    base: (type: string, workspace: string): string =>
      `/workspaces/${workspace}/components/${type}`,
    configuration: (type: string, id: TId, workspace: string): string =>
      `/workspaces/${workspace}/components/${type}/${id}/configuration`,
    runs: (type: string, id: TId, workspace: string): string =>
      `/workspaces/${workspace}/components/${type}/${id}/runs`,
    stacks: (type: string, id: TId, workspace: string): string =>
      `/workspaces/${workspace}/components/${type}/${id}/stacks`,
    registerComponents: (type: string, workspace: string): string =>
      `/workspaces/${workspace}/registerComponents/${type}`,
    configureComponent: (type: string, workspace: string, id: string): string =>
      `/workspaces/${workspace}/registerComponents/${type}/${id}/configuration`,
  },

  plugins: {
    list: (workspace: string): string => `/workspaces/${workspace}/plugins`,
    create: (workspace: string): string =>
      `/workspaces/${workspace}/plugins/create`,
    detail: {
      base: (workspace: string, plugin: TId): string =>
        `/workspaces/${workspace}/plugins/${plugin}`,
      overview: (workspace: string, plugin: TId): string =>
        `/workspaces/${workspace}/plugins/${plugin}/overview`,
      changelogs: (workspace: string, plugin: TId): string =>
        `/workspaces/${workspace}/plugins/${plugin}/changelogs`,
      requirements: (workspace: string, plugin: TId): string =>
        `/workspaces/${workspace}/plugins/${plugin}/requirements`,
      installing: (workspace: string, plugin: TId): string =>
        `/workspaces/${workspace}/plugins/${plugin}/installing`,
    },
    update: (workspace: string, id: TId): string =>
      `/workspaces/${workspace}/plugins/${id}/update`,
    creationLogs: (workspace: string, id: TId): string =>
      `/workspaces/${workspace}/plugins/${id}/creation-logs`,
  },

  settings: {
    base: '/settings',
    personalDetails: '/settings/personal-details',
    organizationSettings: '/settings/organization',
    starredPlugins: '/settings/starred-plugins',
    myPlugins: '/settings/my-plugins',
  },
  logout: '/logout',
};
