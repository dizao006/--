//获取博客列表分类数据
import { mock } from 'mockjs'
import request from './request'
export async function getBlogs(page = 1, limit = 10, categoryid = -1, ) {
    return await request.get('/api/blog', {
            params: {
                page,
                limit,
                categoryid,
            }
        })
        
}
//获取博客分类
export async function getBlogCategories() {
    return await request.get('/api/blogtype')
}
// 利用Ajax请求获取单个博客
export async function getBlog(id){
    return await request.get('/api/blog/${id}')
}
// 利用Ajax提交评论
export async function postComment(commentInfo){
    return await request.get('/api/comment',commentInfo)
}
// 利用Ajax获取评论
export async function getComments(blogid,page,limit){
    return await request.get('/api/comment',{
        params:{
            blogid,
            page,
            limit,
        }
    })
}