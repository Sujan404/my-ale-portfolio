import { BLOGS_INFO } from '@/stores/blogsStore'
import { ref } from 'vue'

const RENDER_ARTICLES = ref([
    {
        title: BLOGS_INFO['buildAndRunTimeIntegration']['title'],
        date: BLOGS_INFO['buildAndRunTimeIntegration']['date'],
        readTime: BLOGS_INFO['buildAndRunTimeIntegration']['readTime'],
        routeName: BLOGS_INFO['buildAndRunTimeIntegration']['routeName'],
        summary: BLOGS_INFO['buildAndRunTimeIntegration']['summary']
      },
  {
    title: BLOGS_INFO['proxy']['title'],
    date: BLOGS_INFO['proxy']['date'],
    readTime: BLOGS_INFO['proxy']['readTime'],
    routeName: BLOGS_INFO['proxy']['routeName'],
    summary: BLOGS_INFO['proxy']['summary']
  },
  {
    title: BLOGS_INFO['bastion_host_architecture']['title'],
    date: BLOGS_INFO['bastion_host_architecture']['date'],
    readTime: BLOGS_INFO['bastion_host_architecture']['readTime'],
    routeName: BLOGS_INFO['bastion_host_architecture']['routeName'],
    summary: BLOGS_INFO['bastion_host_architecture']['summary']
  },
  {
    title: BLOGS_INFO['docker_so_popular']['title'],
    date: BLOGS_INFO['docker_so_popular']['date'],
    readTime: BLOGS_INFO['docker_so_popular']['readTime'],
    routeName: BLOGS_INFO['docker_so_popular']['routeName'],
    summary: BLOGS_INFO['docker_so_popular']['summary']
  },
  {
    title: BLOGS_INFO['hot_reload_vue']['title'],
    date: BLOGS_INFO['hot_reload_vue']['date'],
    readTime: BLOGS_INFO['hot_reload_vue']['readTime'],
    routeName: BLOGS_INFO['hot_reload_vue']['routeName'],
    summary: BLOGS_INFO['hot_reload_vue']['summary']
  },
  {
    title: BLOGS_INFO['css_flex_importance']['title'],
    date: BLOGS_INFO['css_flex_importance']['date'],
    readTime: BLOGS_INFO['css_flex_importance']['readTime'],
    routeName: BLOGS_INFO['css_flex_importance']['routeName'],
    summary: BLOGS_INFO['css_flex_importance']['summary']
  },
  {
    title: BLOGS_INFO['not_found_route_404']['title'],
    date: BLOGS_INFO['not_found_route_404']['date'],
    readTime: BLOGS_INFO['not_found_route_404']['readTime'],
    routeName: BLOGS_INFO['not_found_route_404']['routeName'],
    summary: BLOGS_INFO['not_found_route_404']['summary']
  },
  {
    title: BLOGS_INFO['seo_csr']['title'],
    date: BLOGS_INFO['seo_csr']['date'],
    readTime: BLOGS_INFO['seo_csr']['readTime'],
    routeName: BLOGS_INFO['seo_csr']['routeName'],
    summary: BLOGS_INFO['seo_csr']['summary']
  }
])

export { RENDER_ARTICLES }
