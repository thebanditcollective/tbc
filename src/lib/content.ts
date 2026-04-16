import { getCollection } from 'astro:content';

export async function getProjects() {
  const projects = await getCollection('projects');
  return projects
    .filter((project) => {
      const projectSource = [project.id, project.slug, (project as { filePath?: string }).filePath ?? '']
        .join('/')
        .toLowerCase();

      return !projectSource.includes('archive/');
    })
    .sort((a, b) => a.data.sortOrder - b.data.sortOrder);
}

export async function getProjectBySlug(slug: string) {
  const projects = await getProjects();
  return projects.find((project) => project.slug === slug);
}
