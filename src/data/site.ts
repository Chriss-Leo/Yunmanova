import {
  Brain,
  Buildings,
  CloudArrowUp,
  Code,
  DeviceMobile,
  Factory,
  FirstAid,
  Lightning,
  ShoppingBag,
  WechatLogo,
} from '@phosphor-icons/react/dist/ssr'

export const navigation = [
  { label: '首页', href: '/' },
  { label: '产品与服务', href: '/services' },
  { label: '案例', href: '/cases' },
  { label: '常见问题', href: '/faq' },
  { label: '关于我们', href: '/about' },
  { label: '联系我们', href: '/contact' },
]

export const services = [
  {
    title: '软件定制开发',
    description: '围绕业务流程与组织协作，建设企业管理系统、业务中台与数据平台。',
    icon: Code,
  },
  {
    title: 'APP 开发',
    description: '覆盖 iOS、Android 与跨端应用，从产品设计到上线运营持续迭代。',
    icon: DeviceMobile,
  },
  {
    title: '小程序开发',
    description: '连接微信生态、线下服务和企业业务系统，缩短用户转化路径。',
    icon: WechatLogo,
  },
  {
    title: 'AI 应用开发',
    description: '将大模型、知识库、智能流程与既有系统结合，服务真实业务场景。',
    icon: Brain,
  },
]

export const capabilities = [
  '业务咨询与需求梳理',
  '产品策略与体验设计',
  '架构设计与敏捷开发',
  '质量验证与安全测试',
  '部署上线与持续运维',
]

export const scenarios = [
  { title: 'IoT 物联网平台', description: '设备接入、实时监测、告警联动与数据分析。', icon: Factory },
  { title: '能源管理平台', description: '用能监测、能效分析、异常预警与经营决策。', icon: Lightning },
  { title: '企业管理系统', description: '打通人、财、物、项目与跨部门协作流程。', icon: Buildings },
  { title: '电商平台', description: '商品、交易、会员、营销与履约的一体化建设。', icon: ShoppingBag },
  { title: '医疗平台', description: '围绕患者服务、业务协同与数据治理构建产品。', icon: FirstAid },
  { title: '云端业务平台', description: '构建安全、弹性、可持续演进的数字化基础设施。', icon: CloudArrowUp },
]

export const cases = [
  {
    slug: 'energy-operations',
    title: '能源运营数字化平台',
    summary: '统一设备、能耗、告警与运营数据，为管理团队提供清晰的决策界面。',
    tags: ['能源管理', 'IoT', '数据可视化'],
    image: '/media/case-energy.webp',
  },
  {
    slug: 'enterprise-operations',
    title: '企业运营协同系统',
    summary: '重构跨部门流程与权限体系，让项目、合同和执行信息在同一系统中流转。',
    tags: ['企业管理', '流程协同', '系统集成'],
    image: '/media/case-enterprise.webp',
  },
  {
    slug: 'ai-knowledge',
    title: '企业 AI 知识工作台',
    summary: '连接内部文档与业务数据，支持检索、问答、内容生成和任务协作。',
    tags: ['AI 应用', '知识库', '智能流程'],
    image: '/media/case-ai.webp',
  },
]

export const processSteps = [
  { title: '理解业务', description: '访谈关键角色，明确问题、边界、目标与验收标准。' },
  { title: '定义产品', description: '梳理信息架构、核心流程与迭代优先级，形成可执行方案。' },
  { title: '设计开发', description: '产品、设计与工程协同推进，以阶段成果持续校准方向。' },
  { title: '验证上线', description: '完成测试、部署、培训与上线保障，让系统稳定进入业务。' },
  { title: '持续演进', description: '根据运营反馈优化体验、性能与功能，支持业务长期发展。' },
]

export const faqs = [
  {
    question: '定制软件开发通常从哪里开始？',
    answer: '从一次业务访谈开始。我们会先理解目标、用户、流程、现有系统与约束，再给出范围建议、实施路径和阶段计划。',
  },
  {
    question: '可以只负责设计、开发或某个技术模块吗？',
    answer: '可以。合作范围可以覆盖完整产品周期，也可以针对产品设计、前端、后端、移动端、AI 能力或系统集成等模块展开。',
  },
  {
    question: '如何评估项目周期和费用？',
    answer: '周期与费用取决于业务范围、系统复杂度、第三方集成、数据迁移和质量要求。需求梳理后会提供清晰的工作范围与阶段估算。',
  },
  {
    question: '项目过程中如何保证沟通和质量？',
    answer: '通过固定沟通节奏、阶段演示、需求与缺陷追踪、代码审查和测试验收，让进度、风险与决策保持透明。',
  },
  {
    question: '系统上线后是否提供运维和迭代？',
    answer: '可以提供上线保障、监控、问题响应、性能优化与持续迭代，具体服务等级会在合作方案中约定。',
  },
  {
    question: '能否与企业现有系统和设备对接？',
    answer: '可以。我们会评估现有 API、数据库、设备协议、身份体系和安全要求，设计适合的集成方式。',
  },
]
