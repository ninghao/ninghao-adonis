'use strict'

/*
|--------------------------------------------------------------------------
| PostSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const Post = use('App/Models/Post')

class PostSeeder {
  async run () {
    const posts = [
      { title: '停用社交网络', content: '这个月停用社交网络，专心工作，学习，顺道思考一下人生。', user_id: 1 },
      { title: 'Node.js 课程', content: '继续制作一批 Node.js 应用开发课程。', user_id: 1 },
      { title: '改造宁皓网', content: '为了能更好的实行推广，需要改造一下宁皓网，或许可以试试重做，大工程 ~', user_id: 1 },
      { title: '幼儿园作业', content: '完成了幼儿园老师布置给家长的作业，带小羽到大自然体验春天。', user_id: 2 },
      { title: '计划装修', content: '今年有个大工程，需要装修个小房子，哎呀，全得靠我自己啊。', user_id: 2 },
      { title: '北海道面包', content: '再做两个北海道面包，王皓说他喜欢吃。', user_id: 2 }
    ]

    await Post.createMany(posts)
  }
}

module.exports = PostSeeder
