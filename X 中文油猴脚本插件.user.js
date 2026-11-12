// ==UserScript==
// @name         X 中文油猴脚本插件
// @namespace    local.x.zh-cn
// @version      1.4.7
// @description  将 X 常见英文界面文字显示为简体中文，不翻译用户内容。
// @author       zihsowuli
// @homepageURL  https://github.com/wulihdd/X-
// @supportURL   https://x.com/zihsowuli
// @downloadURL  https://raw.githubusercontent.com/wulihdd/X-/main/X%20%E4%B8%AD%E6%96%87%E6%B2%B9%E7%8C%B4%E8%84%9A%E6%9C%AC%E6%8F%92%E4%BB%B6.user.js
// @updateURL    https://raw.githubusercontent.com/wulihdd/X-/main/X%20%E4%B8%AD%E6%96%87%E6%B2%B9%E7%8C%B4%E8%84%9A%E6%9C%AC%E6%8F%92%E4%BB%B6.user.js
// @match        https://x.com/*
// @match        https://twitter.com/*
// @run-at       document-idle
// @grant        none
// 作者的 X 主页：https://x.com/zihsowuli ，喜欢的话欢迎关注，谢谢！
// ==/UserScript==

(() => {
  'use strict';

  // X 的界面文案可能会更新；未收录的文字保留原文。
  const translations = new Map(Object.entries({
    'Home': '主页', 'Explore': '探索', 'Notifications': '通知', 'Messages': '私信',
    'Grok': 'Grok', 'Chat': '聊天', 'Calls': '通话', 'Subscription': '订阅', 'History': '历史记录',
    'Bookmarks': '书签', 'Communities': '社群', 'Premium': '高级订阅',
    'Verified Orgs': '认证组织', 'Profile': '个人资料', 'More': '更多',
    'Post': '发帖', 'Posts': '帖子', 'Reply': '回复', 'Replies': '回复',
    'Repost': '转帖', 'Reposts': '转帖', 'Quote': '引用', 'Quotes': '引用',
    'Like': '喜欢', 'Likes': '喜欢', 'Share': '分享', 'Views': '查看次数',
    'For you': '为你推荐', 'Following': '正在关注', 'Followers': '关注者',
    'Verified': '已认证', 'All': '全部', 'Mentions': '提及', 'Media': '媒体',
    'Articles': '文章', 'Highlights': '精选', 'Subscriptions': '订阅',
    'Lists': '列表', 'Topics': '话题', 'Moments': '瞬间', 'Spaces': '空间',
    'Settings and privacy': '设置和隐私', 'Settings': '设置',
    'Help Center': '帮助中心', 'Display': '显示', 'Keyboard shortcuts': '键盘快捷键',
    'Your account': '你的账号', 'Your Account': '你的账号', 'Account information': '账号信息',
    'Search Settings': '搜索设置',
    'See information about your account, download an archive of your data, or learn about your account deactivation options': '查看账号信息、下载数据存档，或了解停用账号的选项',
    'See your account information like your phone number and email address.': '查看你的手机号和电子邮箱等账号信息。',
    'Change your password at any time.': '随时更改密码。',
    'Get insights into the type of information stored for your account.': '了解账号中存储的信息类型。',
    'Find out how you can deactivate your account.': '了解如何停用你的账号。',
    'Change your password': '更改密码', 'Download an archive of your data': '下载你的数据存档',
    'Deactivate your account': '停用账号', 'Security and account access': '安全和账号访问',
    'Security': '安全', 'Apps and sessions': '应用和会话',
    'Privacy and safety': '隐私和安全', 'Audience and tagging': '受众和标签',
    'Content you see': '你看到的内容', 'Mute and block': '静音和屏蔽',
    'Direct Messages': '私信', 'Discoverability and contacts': '可发现性和联系人',
    'Accessibility, display, and languages': '辅助功能、显示和语言',
    'Accessibility': '辅助功能', 'Languages': '语言', 'Display language': '显示语言',
    'Additional resources': '其他资源', 'About': '关于', 'About X': '关于 X',
    'Monetization': '变现', 'Professional Tools': '专业工具', 'Creator Studio': '创作者工作室',
    'Ads': '广告', 'Analytics': '分析', 'Search': '搜索', 'Search settings': '搜索设置',
    'Advanced search': '高级搜索', 'Search filters': '搜索筛选',
    'Trending': '趋势', 'Trending now': '当前趋势', 'News': '新闻',
    'Sports': '体育', 'Entertainment': '娱乐', 'Show more': '显示更多',
    'Show less': '收起', 'Show': '显示', 'Hide': '隐藏', 'Close': '关闭',
    'Cancel': '取消', 'Save': '保存', 'Done': '完成', 'Next': '下一步',
    'Back': '返回', 'Edit': '编辑', 'Delete': '删除', 'Remove': '移除',
    'Confirm': '确认', 'Continue': '继续', 'Learn more': '了解更多',
    'Follow': '关注', 'Unfollow': '取消关注', 'Follow back': '回关',
    'Edit profile': '编辑个人资料', 'Subscribe': '订阅', 'Sign in': '登录',
    'Log in': '登录', 'Log out': '退出登录', 'Sign up': '注册',
    'Create account': '创建账号', 'Copy link': '复制链接', 'Copy link to post': '复制帖子链接',
    'Bookmark': '添加书签', 'Remove bookmark': '移除书签', 'Report': '举报',
    'Not interested in this post': '对此帖子不感兴趣', 'View post': '查看帖子',
    'Translate post': '翻译帖子', 'Translate bio': '翻译简介',
    'Who to follow': '推荐关注', 'New message': '新消息', 'Message requests': '消息请求',
    'People': '用户', 'Top': '热门', 'Latest': '最新', 'Photos': '照片', 'Videos': '视频',
    'Lists you’re on': '你所在的列表', 'Pinned': '已置顶', 'Drafts': '草稿',
    'Schedule': '定时发布', 'Everyone': '所有人', 'Post your reply': '发布回复',
    'Live on X': 'X 直播', 'You might like': '你可能感兴趣', 'What’s happening': '正在发生',
    "What's happening": '正在发生', 'posts': '帖子',
    'Programs': '项目', 'Original Content Rewards': '原创内容奖励',
    'Earn from your posts': '通过发帖赚取收入', 'Ineligible': '不符合条件', 'Tools': '工具',
    'Live Studio': '直播工作室', 'Go live professionally': '专业直播', 'Inspiration': '灵感',
    'Top posts by engagement': '按互动量排序的热门帖子', 'Creator Academy': '创作者学院',
    'Tips and guides for creators': '创作者技巧和指南', 'New': '新', 'Support': '支持',
    'Contact support': '联系支持', 'Check back later': '请稍后再来查看',
    'You’re a few steps away from joining the Original Content Rewards Program and getting paid for posting original content. To enroll, you must:': '你距离加入原创内容奖励计划并通过发布原创内容获得收入还差几步。要加入，你必须：',
    "You're a few steps away from joining the Original Content Rewards Program and getting paid for posting original content. To enroll, you must:": '你距离加入原创内容奖励计划并通过发布原创内容获得收入还差几步。要加入，你必须：',
    'Subscribe to a paid X Subscription plan or Premium Business': '订阅 X 的付费订阅计划或企业高级订阅',
    'Be at least 18 years old': '年满 18 周岁',
    'Have at least 500 Verified followers': '至少拥有 500 名已认证的关注者',
    'Have at least 500K Verified Home Timeline impressions in the last 90 days': '最近 90 天内，主页时间线的已认证用户展示量至少达到 50 万次',
    'Does not include replies': '不包括回复', 'Click here': '点击此处',
    'for more details on the Original Content Rewards Program.': '了解原创内容奖励计划的更多详情。',
    'The ultimate guide to Articles on X': 'X 文章终极指南',
    'Live Studio: A New Home for Livestreaming on X': '直播工作室：X 直播的新平台',
    'The ultimate guide to Grok Imagine images': 'Grok Imagine 图片终极指南',
    'The ultimate guide to Grok Imagine videos': 'Grok Imagine 视频终极指南',
    'The ultimate guide to Grok Bot for creators': '面向创作者的 Grok Bot 终极指南',
    'Filter by': '筛选条件', 'Unread': '未读', 'Direct': '私聊', 'Groups': '群聊',
    'Requests': '消息请求', 'Show all bots': '显示所有机器人', 'Number': '号码',
    'Mark all as read': '全部标记为已读', 'Start Conversation': '开始对话',
    'Choose from your existing conversations, or start a new one.': '选择已有对话，或开始新的对话。',
    'New chat': '新建聊天', 'Suggested': '推荐', "You've chatted before": '你们之前聊过',
    'You interact a lot on X': '你们在 X 上经常互动',
    'Quick access': '快捷访问', 'More benefits': '更多权益', 'Customization': '个性化设置',
    'Radar': '雷达', 'Media Studio': '媒体工作室', 'Boost': '推广',
    'Bookmark Folders': '书签文件夹', 'Reply boost': '回复推广',
    'Level-up your content': '提升你的内容', 'Request an inactive handle': '申请未使用的用户名',
    'Edit your photo with Imagine': '使用 Imagine 编辑照片', 'Customize yourself in seconds': '几秒钟即可自定义你的形象',
    'Edit Photo': '编辑照片', 'Name': '名称', 'Bio': '简介',
    'Your blue checkmark will be hidden for a period of time after you edit your display name or profile photo until it is reviewed.': '修改显示名称或个人资料照片后，你的蓝色认证标记将暂时隐藏，直到审核完成。',
    'Save posts for later': '保存帖子，稍后查看',
    'Bookmark posts to easily find them again in the future.': '将帖子加入书签，以便日后轻松找到。',
    'Overview': '概览', 'Audience': '受众', 'Content': '内容', 'Video': '视频', 'Live': '直播',
    'Account overview': '账号概览', 'Impressions': '展示量', 'Select secondary metric': '选择次要指标',
    'Daily': '按天', 'Weekly': '按周', 'Monthly': '按月', 'Bar': '柱状图', 'Line': '折线图',
    'Follows over time': '关注数变化趋势', 'Engagement rate': '互动率', 'Engagements': '互动次数',
    'Profile visits': '个人资料访问量', 'Shares': '分享次数', 'New follows': '新增关注',
    'Location': '所在地', 'Website': '网站', 'Birth date': '出生日期',
    'Switch to professional': '切换到专业账号',
    'Usage': '使用情况', 'Private': '私密', 'What should we explore?': '你想探索什么？',
    'Ask anything': '有什么问题尽管问', 'Auto': '自动',
    'Create a query and let Radar track real-time updates': '创建查询，让雷达跟踪实时动态',
    'Clear search': '清除搜索', 'Examples': '示例',
    'General Settings': '常规设置', 'Manage Sources': '管理来源', 'New Livestream': '新建直播',
    'No livestreams yet. Click New Livestream to start streaming.': '暂无直播。点击“新建直播”开始直播。',
    "Unfortunately, you don't meet our eligibility requirements for Subscriptions at this time.": '很遗憾，你目前尚未满足订阅功能的资格要求。',
    'Unfortunately, you don’t meet our eligibility requirements for Subscriptions at this time.': '很遗憾，你目前尚未满足订阅功能的资格要求。',
    'Get verified with a paid X Subscription plan or Premium Business': '通过 X 付费订阅计划或企业高级订阅获得认证',
    '2,000 verified followers': '拥有 2,000 名已认证的关注者',
    '5M organic impressions in the past 3 months': '过去 3 个月内获得 500 万次自然展示',
    'Active in the past 30 days': '过去 30 天内保持活跃', 'Eligible for X Money': '符合 X Money 的使用资格',
    'Verified followers': '已认证的关注者', 'Active followers': '活跃关注者',
    'Followers who were active on X in the last 24 hours, out of all your followers.': '所有关注者中，过去 24 小时内在 X 上活跃过的关注者。',
    'Age': '年龄', 'Gender': '性别', 'Gender data may be inferred': '性别数据可能基于推断',
    'Male': '男性', 'Female': '女性', 'Not specified': '未指定', 'Country': '国家和地区',
    'United States': '美国', 'Hong Kong SAR China': '中国香港特别行政区', 'Singapore': '新加坡',
    'Japan': '日本', 'Taiwan': '中国台湾', 'China': '中国', 'Other': '其他', 'Device': '设备',
    'Web': '网页', 'Active times': '活跃时段', 'Last 28 days': '过去 28 天',
    'Least engaged': '互动最少', 'Most engaged': '互动最多', 'Non-followers': '非关注者',
    'Mo': '周一', 'Tu': '周二', 'We': '周三', 'Th': '周四', 'Fr': '周五', 'Sa': '周六', 'Su': '周日',
    'Posts and replies': '帖子和回复', 'Community posts': '社群帖子',
    'Published': '已发布', 'Your drafts live here': '你的草稿会显示在这里',
    'This is where you write': '在这里撰写文章', 'Continue a draft or create a new Article': '继续编辑草稿或创建新文章',
    'Write': '写文章', 'Create a new Article': '创建新文章', 'Your published articles live here': '已发布的文章会显示在这里',
    'Timelines': '时间线', 'Politics': '政治', 'Iran Conflict': '伊朗冲突',
    'Business & Finance': '商业与金融', 'Science': '科学', 'Technology': '科技',
    'Crypto': '加密货币',
    'Everyone can reply': '所有人都可以回复', 'Who can reply?': '谁可以回复？',
    'Accounts you follow': '你关注的账号', 'Accounts you follow and who they follow': '你关注的账号及其关注的账号',
    'Only accounts you mention': '仅你提及的账号', 'Verified accounts': '已认证的账号', 'Regions': '地区',
    'Date': '日期', 'Month': '月', 'Day': '日', 'Year': '年', 'Time': '时间',
    'Hour': '小时', 'Minute': '分钟', 'Time zone': '时区', 'Hong Kong Standard Time': '香港标准时间',
    'Scheduled posts': '已定时发布的帖子', 'Search for GIFs': '搜索 GIF', 'Auto-play GIFs': '自动播放 GIF',
    'Content disclosure': '内容披露', 'Paid partnership': '付费合作',
    'Let others know this post promotes a brand or business.': '告知他人此帖子推广了某个品牌或商家。',
    'Made with AI': '使用 AI 制作', 'Mark this post as containing synthetically generated content.': '将此帖子标记为包含人工合成内容。',
    'What’s happening?': '有什么新鲜事？', "What's happening?": '有什么新鲜事？',
    'January': '1月', 'February': '2月', 'March': '3月', 'April': '4月', 'May': '5月', 'June': '6月',
    'July': '7月', 'August': '8月', 'September': '9月', 'October': '10月', 'November': '11月', 'December': '12月',
    'Business': '商务', 'Create your Space': '创建你的空间',
    'Select the kinds of notifications you get about your activities, interests, and recommendations.': '选择要接收的活动、兴趣和推荐相关通知类型。',
    'Filters': '筛选条件', 'Preferences': '偏好设置',
    'Choose the notifications you’d like to see — and those you don’t.': '选择你希望看到和不希望看到的通知。',
    "Choose the notifications you'd like to see — and those you don't.": '选择你希望看到和不希望看到的通知。',
    'Select your preferences by notification type.': '按通知类型选择你的偏好。',
    'Accessibility, display and languages': '辅助功能、显示和语言',
    'Manage how X content is displayed to you.': '管理 X 内容向你展示的方式。',
    'Manage aspects of your X experience such as limiting color contrast and motion.': '管理 X 的使用体验，例如限制颜色对比度和动态效果。',
    'Manage your font size, color, and background. These settings affect all the X accounts on this browser.': '管理字体大小、颜色和背景。这些设置会影响此浏览器中的所有 X 账号。',
    'Manage which languages are used to personalize your X experience.': '管理用于个性化 X 使用体验的语言。',
    'Data usage': '数据使用', 'Limit how X uses some of your network data on this device.': '限制 X 在此设备上使用部分网络数据的方式。',
    'Manage your account’s security and keep track of your account’s usage including apps that you have connected to your account.': '管理账号安全，并查看账号的使用情况，包括已连接的应用。',
    'Manage your account’s security.': '管理账号安全。',
    'See information about when you logged into your account and the apps you connected to your account.': '查看账号登录时间及已连接的应用。',
    'Connected accounts': '已关联的账号', 'Manage Google or Apple accounts connected to X to log in.': '管理用于登录 X 的 Google 或 Apple 账号。',
    'Delegate': '委托管理', 'Manage your shared accounts.': '管理你的共享账号。',
    'Manage what information you see and share on X.': '管理你在 X 上看到和分享的信息。',
    'Your X activity': '你的 X 活动', 'Audience, media and tagging': '受众、媒体和标签',
    'Manage what information you allow other people on X to see.': '管理允许 X 上其他人看到的信息。',
    'Your posts': '你的帖子', 'Manage the information associated with your posts.': '管理与你的帖子关联的信息。',
    'Decide what you see on X based on your preferences like interests': '根据兴趣等偏好决定你在 X 上看到的内容',
    'Manage the accounts, words, and notifications that you’ve muted or blocked.': '管理你已静音或屏蔽的账号、词语和通知。',
    'Manage who can message you directly.': '管理谁可以向你发送私信。',
    'Manage who can see your Spaces listening activity': '管理谁可以看到你在空间中的收听活动',
    'Control your discoverability settings and manage contacts you’ve imported.': '控制账号的可发现性设置，并管理已导入的联系人。',
    'About your account': '关于你的账号', 'Manage the location associated with your account': '管理与你的账号关联的位置信息',
    'Data sharing and personalization': '数据共享和个性化', 'Ads preferences': '广告偏好',
    'Manage your ads experience on X.': '管理你在 X 上的广告体验。', 'Inferred identity': '推断身份',
    'Allow X to personalize your experience with your inferred activity, e.g. activity on devices you haven’t used to log in to X.': '允许 X 使用推断出的活动来个性化你的体验，例如你未用于登录 X 的设备上的活动。',
    'Data sharing with business partners': '与商业合作伙伴共享数据',
    'Allow sharing of additional information with X’s business partners.': '允许与 X 的商业合作伙伴共享其他信息。',
    'Location information': '位置信息', 'Manage the location information X uses to personalize your experience.': '管理 X 用于个性化你体验的位置信息。',
    'Grok & Third-party Collaborators': 'Grok 和第三方合作伙伴',
    'Allow your public data as well as your interactions, inputs, and results with Grok and xAI to be used for training and fine-tuning': '允许将你的公开数据以及你与 Grok 和 xAI 的交互、输入和结果用于训练及微调',
    'Learn more about privacy on X': '了解更多 X 隐私信息', 'Privacy center': '隐私中心',
    'Privacy policy': '隐私政策', 'Contact us': '联系我们',
    'Check out other places for helpful information to learn more about X products and services.': '前往其他资源了解更多有关 X 产品和服务的信息。',
    'Release notes': '更新说明', 'Legal': '法律信息', 'Ads & Business': '广告与商务',
    'Cookies': 'Cookie', 'Privacy': '隐私', 'Terms': '条款', 'Miscellaneous': '其他',
    'Careers': '招聘', 'Developers': '开发者', 'Get App': '获取应用', 'Help': '帮助',
    'Profile customization': '个人资料自定义', 'Verification & Security': '认证与安全',
    'ID Verification': '身份验证', 'Get support': '获取支持', 'Manage your subscription': '管理你的订阅',
    'Introducing Grok Bot': '介绍 Grok Bot', 'Give it any task. Watch it come back with finished work.': '交给它任务，查看完成的结果。',
    'Ask a question': '提出问题', 'Choice 1': '选项 1', 'Choice 2': '选项 2', 'Choice 3': '选项 3', 'Choice 4': '选项 4',
    'Poll length': '投票时长', 'Days': '天', 'Hours': '小时', 'Minutes': '分钟', 'Remove poll': '移除投票',
    'Suggested Lists': '推荐列表', 'Choose your Lists': '选择你的列表',
    "When you follow a List, you'll be able to quickly keep up with the experts on what you care about most.": '关注列表后，你可以快速了解你最关心的领域中专家们的动态。',
    'When you follow a List, you’ll be able to quickly keep up with the experts on what you care about most.': '关注列表后，你可以快速了解你最关心的领域中专家们的动态。',
    'Discover new Lists': '发现新列表', 'Create your own List': '创建你自己的列表',
    'You can create your own Lists by adding the people who are already talking about what you want to keep up with most.': '你可以将正在讨论你最关注话题的人加入列表，创建自己的列表。',
    'Get Started': '开始使用'
  }));

  // 官方时间线分类限定在分类窗口处理，避免把同名的用户列表或用户名翻译掉。
  const timelineTopics = new Map(Object.entries({
    'Cryptocurrency': '加密货币', 'Artificial Intelligence': '人工智能', 'Soccer': '足球',
    'Stocks & Economy': '股票与经济', 'Art': '艺术', 'Movies & TV': '电影与电视', 'Gaming': '游戏',
    'College Football': '大学橄榄球', 'Anime': '动漫', 'Travel': '旅行', 'Food & Drink': '美食与饮品',
    'Beauty': '美妆', 'Boxing': '拳击', 'Career': '职业', 'Cars': '汽车', 'Pets': '宠物',
    'Celebs': '名人', 'Music': '音乐', 'Country Music': '乡村音乐', 'Dance': '舞蹈',
    'Dating & Relationships': '约会与情感', 'Design': '设计', 'Education': '教育',
    'Electronic Music': '电子音乐', 'Startups': '创业公司', 'Esports': '电子竞技',
    'Marriage & Family': '婚姻与家庭', 'Fashion': '时尚', 'Pop': '流行音乐', 'Golf': '高尔夫',
    'Memes': '网络迷因', 'Health & Fitness': '健康与健身', 'MMA & Wrestling': '综合格斗与摔跤',
    'Racing & Motorsports': '赛车与汽车运动', 'Motorcycles': '摩托车', 'Nature & Outdoors': '自然与户外',
    'Olympics': '奥运会', 'Personal Finance': '个人理财', 'Photography': '摄影', 'Podcasts': '播客',
    'Real Estate': '房地产', 'Robotics': '机器人技术', 'Rock': '摇滚乐', 'Rugby': '橄榄球',
    'Shopping': '购物', 'Snow Sports': '冰雪运动', 'Software Development': '软件开发', 'Space': '太空',
    'Tennis': '网球', 'Home & Garden': '家居与园艺', 'Cricket': '板球', 'Formula 1': '一级方程式赛车',
    'Cycling': '自行车运动', 'Concerts': '演唱会', 'Hip Hop': '嘻哈', 'Jazz': '爵士乐',
    'Crime': '犯罪', 'Elections': '选举', 'Biotech': '生物技术', 'Mental Health': '心理健康', 'Digital Art': '数字艺术'
  }));

  // 左侧导航只用 CSS 显示译文，保留原文和元素属性供其他扩展读取。
  const navLabels = {
    '[data-testid="AppTabBar_Home_Link"]': '主页', '[data-testid="AppTabBar_Explore_Link"]': '探索',
    '[data-testid="AppTabBar_Notifications_Link"]': '通知', '[data-testid="AppTabBar_DirectMessage_Link"]': '聊天',
    '[data-testid="AppTabBar_Calls_Link"]': '通话', '[data-testid="premium-hub-tab"]': '订阅',
    'a[href="/i/history"]': '历史记录', 'a[href="/compose/articles"]': '文章',
    '[data-testid="AppTabBar_Profile_Link"]': '个人资料', 'button[data-testid="AppTabBar_More_Menu"]': '更多'
  };
  const style = document.createElement('style');
  const navRules = Object.entries(navLabels).map(([selector, label]) => [
    `header[role="banner"] nav > ${selector} > div > div[dir="ltr"] > span:first-child`, label
  ]);
  navRules.push(['header[role="banner"] [data-testid="SideNav_NewTweet_Button"] > div[dir="ltr"] > div > span > div > div > span > span', '发帖']);
  style.textContent = navRules.map(([target, label]) =>
    `${target}{position:relative;display:inline-block;min-width:${label.length}em;-webkit-text-fill-color:transparent!important}` +
    `${target}::after{content:"${label}";position:absolute;left:0;top:0;white-space:nowrap;-webkit-text-fill-color:currentColor}`
  ).join('\n');
  document.head.appendChild(style);

  const ui = 'nav, main, [role="navigation"], [role="main"], [role="dialog"], [role="menu"], [role="menuitem"], [role="listbox"], [role="option"], [role="tooltip"], [role="tab"], [role="button"], button, [data-testid="primaryColumn"], [data-testid="Dropdown"], [data-radix-popper-content-wrapper], [data-testid="SideNav_NewTweet_Button"], a[href="/compose/post"], a[href="/compose/tweet"], aside [role="heading"], aside h2, aside h3';
  const protectedContent = 'article, header[role="banner"], [data-testid="SideNav_NewTweet_Button"], [data-testid="tweetText"], [data-testid="User-Name"], [data-testid="UserName"], [data-testid="UserDescription"], [data-testid="UserCell"], [data-testid="conversation"], [data-testid="messageEntry"], [data-testid="messageText"], [data-testid="SideNav_AccountSwitcher_Button"], input, textarea, select, option, [contenteditable="true"], [role="textbox"]';
  const attributes = ['aria-label', 'title', 'placeholder'];
  const optionLabels = new WeakMap();
  const monthNames = new Set(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);

  function translate(value) {
    const match = value.match(/^(\s*)(.*?)(\s*)$/s);
    const replacement = match && translations.get(match[2]);
    return replacement ? match[1] + replacement + match[3] : value;
  }

  function translateProfile(value, element) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const verifiedSince = value.match(/^(\s*)Verified since (January|February|March|April|May|June|July|August|September|October|November|December) (\d{4})(\s*)$/);
    if (verifiedSince) return `${verifiedSince[1]}自 ${verifiedSince[3]}年${months.indexOf(verifiedSince[2]) + 1}月起已认证${verifiedSince[4]}`;
    if (element.closest('[role="dialog"]')) {
      const birthDate = value.match(/^(\s*)(January|February|March|April|May|June|July|August|September|October|November|December) (\d{1,2}), (\d{4})(\s*)$/);
      if (birthDate) return `${birthDate[1]}${birthDate[4]}年${months.indexOf(birthDate[2]) + 1}月${birthDate[3]}日${birthDate[5]}`;
    }
    if (element.closest('[data-testid="UserJoinDate"]')) {
      return value.replace(/\b(Joined\s+)?(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{4})\b/g,
        (_, joined, month, year) => `${year}年${months.indexOf(month) + 1}月${joined ? '加入' : ''}`)
        .replace(/\bJoined\b/g, '加入于');
    }
    if (element.closest('a[href$="/following"], a[href$="/followers"], a[href$="/verified_followers"]')) {
      return value.replace(/\bFollowing\b/g, '正在关注').replace(/\bFollowers\b/g, '关注者');
    }
    return value;
  }

  function updateElement(element) {
    // 用 label 而非 textContent 翻译月份，保持未显式设置 value 的 option 原有值。
    if (element.matches('option') && element.closest('[role="dialog"]')) {
      const previous = optionLabels.get(element);
      const currentLabel = element.getAttribute('label');
      const translated = monthNames.has(element.textContent.trim()) ? translate(element.textContent) : element.textContent;
      if ((currentLabel === null || currentLabel === previous) && translated !== element.textContent) {
        element.setAttribute('label', translated);
        optionLabels.set(element, translated);
      } else if (previous && currentLabel === previous && translated === element.textContent) {
        element.removeAttribute('label');
        optionLabels.delete(element);
      }
    }
    if (element.matches('input[placeholder], textarea[placeholder]') && (element.closest('[role="dialog"]') || location.pathname.startsWith('/settings') || element.matches('[data-testid="SearchBox_Search_Input"]') || location.pathname.startsWith('/i/grok'))) {
      const placeholder = element.getAttribute('placeholder');
      const translated = translate(placeholder);
      if (translated !== placeholder) element.setAttribute('placeholder', translated);
    }
    if (element.closest(protectedContent) || !isInterface(element)) return;
    for (const name of attributes) {
      const original = element.getAttribute(name);
      if (original !== null) {
        const translated = translate(original);
        if (translated !== original) element.setAttribute(name, translated);
      }
    }
  }

  function isInterface(element) {
    return element.closest(ui) || (location.pathname.startsWith('/settings') && element.closest('main'));
  }

  function updateText(node) {
    const parent = node.parentElement;
    if (parent && parent.matches('option')) {
      updateElement(parent);
      return;
    }
    if (!parent || parent.closest(protectedContent) || !isInterface(parent)) return;
    let translated = translateProfile(translate(node.nodeValue), parent);
    const topicName = node.nodeValue.trim();
    if (timelineTopics.has(topicName)) {
      const dialog = parent.closest('[role="dialog"]');
      const row = parent.parentElement?.parentElement?.parentElement;
      const control = row && [...row.querySelectorAll('[aria-label]')].find(element =>
        element.getAttribute('aria-label') === `Pin ${topicName}` || element.getAttribute('aria-label') === `Reorder ${topicName}`);
      const isPinnedTopic = row?.closest('[data-rfd-draggable-id^="tag-"]');
      const isTopicSection = row?.parentElement?.parentElement?.querySelector('button[aria-label="Collapse Topics"]');
      if (dialog?.querySelector('input[aria-label="Search timelines"]') && control && (isPinnedTopic || isTopicSection)) {
        translated = node.nodeValue.replace(topicName, timelineTopics.get(topicName));
      }
    }
    if (parent.closest('[role="dialog"]')) {
      translated = translated.replace(/^(\s*)See ([\d,]+) more(\s*)$/, '$1查看更多（$2）$3');
      translated = translated.replace(/^(\s*)Will send on (Mon|Tue|Wed|Thu|Fri|Sat|Sun), (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{1,2}), (\d{4}) at (\d{1,2}:\d{2} [AP]M)(\s*)$/, (_, before, day, month, date, year, time, after) => {
        const days = { Mon: '周一', Tue: '周二', Wed: '周三', Thu: '周四', Fri: '周五', Sat: '周六', Sun: '周日' };
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${before}将于 ${year}年${months.indexOf(month) + 1}月${date}日（${days[day]}）${time} 发送${after}`;
      });
    }
    if (translated !== node.nodeValue) node.nodeValue = translated;
  }

  function scan(root) {
    if (root.nodeType === Node.TEXT_NODE) return updateText(root);
    if (root.nodeType !== Node.ELEMENT_NODE) return;
    updateElement(root);
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      if (walker.currentNode.nodeType === Node.TEXT_NODE) updateText(walker.currentNode);
      else updateElement(walker.currentNode);
    }
  }

  scan(document.documentElement);
  new MutationObserver(records => {
    for (const record of records) {
      if (record.type === 'characterData') updateText(record.target);
      else if (record.type === 'attributes') updateElement(record.target);
      else for (const node of record.addedNodes) scan(node);
    }
  }).observe(document.documentElement, {
    subtree: true, childList: true, characterData: true,
    attributes: true, attributeFilter: attributes
  });
})();
