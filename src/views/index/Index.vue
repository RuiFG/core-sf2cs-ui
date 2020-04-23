<template lang="pug">
    #index
        section#hero
            v-row(no-gutters='')
                v-img(:min-height="'calc(100vh - ' + $vuetify.application.top + 'px)'", src='../../assets/index/bg1.png')
                    v-theme-provider(dark='')
                        v-container(fill-height='')
                            v-row.white--text.mx-auto(align='center', justify='center')
                                v-col.white--text.text-center(cols='12', tag='h1')
                                    span.font-italic(:class="[$vuetify.breakpoint.smAndDown ? 'display-3' : 'display-4']")
                                        | 机器“看”世界
                                    br
                                    br
                                v-btn.align-self-end(fab='', outlined='', @click="$vuetify.goTo('#about-me')")
                                    v-icon mdi-chevron-double-down
        section#about-me
            .py-12
            v-container.text-center
                h2.display-2.font-weight-bold.mb-3 什么是人脸识别
                v-responsive.mx-auto.mb-8(width='56')
                    v-divider.mb-1
                    v-divider
                v-responsive.mx-auto.title.font-weight-light.mb-8(max-width='800')
                    | 人脸识别，是基于人的脸部特征信息进行身份识别的一种生物识别技术。用摄像机或摄像头采集含有人脸的图像或视频流，并自动在图像中检测和跟踪人脸，进而对检测到的人脸进行脸部识别的一系列相关技术，通常也叫做人像识别、面部识别。
                v-responsive.mx-auto.title.font-weight-light.mb-8(max-width='1000')
                    | “人脸识别系统”集成了人工智能、机器识别、机器学习、模型理论、专家系统、视频图像处理等多种专业技术，同时需结合中间值处理的理论与实现，是生物特征识别的最新应用，其核心技术的实现，展现了弱人工智能向强人工智能的转化。
                v-avatar.elevation-12.mb-12(size='300')
                    v-img(src='../../assets/index/bg2.png')
                div
        section#features.grey.lighten-3
            .py-12
            v-container.text-center
                h2.display-2.font-weight-bold.mb-3 My “人脸识别”
                v-responsive.mx-auto.mb-12(width='56')
                    v-divider.mb-1
                    v-divider
                v-row
                    v-col(v-for='({ icon, title, text }, i) in features', :key='i', cols='12', md='4')
                        v-card.py-12.px-4(color='grey lighten-5', flat='')
                            v-theme-provider(dark='')
                                div
                                    v-avatar(color='primary', size='88')
                                        v-icon(large='', v-text='icon')
                            v-card-title.justify-center.font-weight-black.text-uppercase(v-text='title')
                            v-card-text.subtitle-1(v-text='text')
        section#stats
            .py-12
            v-parallax(:height='$vuetify.breakpoint.smAndDown ? 700 : 500', src='../../assets/index/bg3.png')
                v-container(fill-height='')
                    v-row.mx-auto
                        v-col(v-for='[value, title] of stats', :key='title', cols='12', md='3')
                            .text-center
                                .display-3.font-weight-black.mb-4(v-text='value')
                                .title.font-weight-regular.text-uppercase(v-text='title')
        section#blog
            .py-12
            v-container
                h2.display-2.font-weight-bold.mb-3.text-uppercase.text-center 应用
                v-responsive.mx-auto.mb-12(width='56')
                    v-divider.mb-1
                    v-divider
                v-row
                    v-col(cols='12', md='4')
                        v-img.mb-4(src='../../assets/index/bg5.png', height='300', max-width='100%')
                        v-card.py-12.px-4(color='grey lighten-5', flat='')
                            h3.font-weight-black.mb-4.text-uppercase
                                | 表情识别
                            v-card-text.subtitle-1
                                | 人脸表情识别是指从给定的静态图像或动态视频序列中分离出特定的表情状态 ，从而确定被识别对象的心理情绪，实现计算机对人脸表情的理解与识别 ，从根本上改变人与计算机的关系，从而达到更好的人机交互。
                    v-col(cols='12', md='4')
                        v-img.mb-4(src='../../assets/index/bg4.png', height='300', max-width='100%')
                        v-card.py-12.px-4(color='grey lighten-5', flat='')
                            h3.font-weight-black.mb-4.text-uppercase
                                | 虹膜识别
                            v-card-text.subtitle-1
                                | 虹膜是位于黑色瞳孔和白色巩膜之间的圆环状部分，其包含有很多相互交错的斑点、细丝、冠状、条纹、隐窝等的细节特征。这些特征决定了虹膜特征的唯一性，同时也决定了身份识别的唯一性。因此，可以将眼睛的虹膜特征作为每个人的身份识别对象。
                    v-col(cols='12', md='4')
                        v-img.mb-4(src='../../assets/index/bg6.png', height='300', max-width='100%')
                        v-card.py-12.px-4(color='grey lighten-5', flat='')
                            h3.font-weight-black.mb-4.text-uppercase
                                | 人脸网格生成
                            v-card-text.subtitle-1
                                | 三角剖分是代数拓扑学里最基本的研究方法。 以人脸曲面为例， 我们把人脸曲面剖开成一块块碎片，每块碎片都是曲边三角形；曲面上任何两个这样的曲边三角形，要么不相交，要么恰好相交于一条公共边。
        v-sheet#contact(color='#333333', dark='', tag='section', tile='')
            .py-12
            v-container
                h2.display-2.font-weight-bold.mb-3.text-uppercase.text-center Future
                v-theme-provider(light='')
                    v-row
                        v-col.mx-auto(cols='auto')
                            v-btn(color='accent', x-large='')
                                | 开始探索
</template>
<script>
    export default {
        name: 'index',
        data() {
            return {
                features: [
                    {
                        icon: 'mdi-account-group-outline',
                        title: '用户',
                        text: '受众广泛，学生、教师、公司员工等等；上班打卡，上学签到，一扫得知，方便，实用，免去一切人工操作。',
                    },
                    {
                        icon: 'mdi-update',
                        title: '速度',
                        text: '超高速识别人脸，C++实现底层算法封装动态链接库，识别速度非比寻常；更快，更精准，更智能。',
                    },
                    {
                        icon: 'mdi-shield-outline',
                        title: '安全',
                        text: '基于 spring boot oauth2 角色授权认证；实行更安全，更便捷，更可靠，更高效的用户管理策略。',
                    },
                ],
                stats: [
                    ['2k', 'github star数'],
                    ['330+', '日用户量'],
                    ['1m', '最低识别距离'],
                    ['20m', '最低识别距离'],
                ]
            }
        }
    }
</script>
