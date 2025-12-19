
import { TangPhase, IdentityType, PhaseConfig, IdentityConfig } from './types';

export const PHASES: Record<TangPhase, PhaseConfig> = {
  [TangPhase.EARLY]: {
    id: TangPhase.EARLY,
    name: '初唐·贞观',
    yearRange: '公元 627 - 649 年',
    colorBg: '#fdf6e3', // Light cream
    colorAccent: '#8b4513', // Saddle Brown
    historicalContext: '太宗励精图治，魏征直言进谏，玄奘法师西行求法，气象万千。',
    prices: '米斗四钱，绢一匹直钱两百。虽初定天下，民生渐稳。',
    diBao: '圣上纳魏征之言，轻徭薄赋；安西都护府初设，西域商路渐启。',
    newsTitle: '《贞观邸报》· 万物始兴'
  },
  [TangPhase.HIGH]: {
    id: TangPhase.HIGH,
    name: '盛唐·开元',
    yearRange: '公元 713 - 741 年',
    colorBg: '#f9f3e0', // Pale Gold/Parchment
    colorAccent: '#b8860b', // Dark Goldenrod
    historicalContext: '巅峰盛世，万国来朝。李白斗酒百篇，教坊新奏霓裳羽衣。',
    prices: '米斗五钱。黄金一两兑钱十贯。长安街头胡姬压酒，春意正浓。',
    diBao: '圣上幸温泉宫，敕命天下节度使入朝朝觐。王维迁监察御史。',
    newsTitle: '《开元通报》· 极盛之巅'
  },
  [TangPhase.MID]: {
    id: TangPhase.MID,
    name: '中唐·元和',
    yearRange: '公元 806 - 820 年',
    colorBg: '#f2ece0', // Aged Paper
    colorAccent: '#5d4037', // Brown
    historicalContext: '安史之乱后，白居易感叹长恨歌。藩镇割据，宪宗虽力求复兴，然大势已变。',
    prices: '米斗两百钱。战乱频仍，物价渐涨，私钱泛滥。',
    diBao: '宪宗力平藩镇之乱；白居易授江州司马。坊间传闻圣上崇佛求长生。',
    newsTitle: '《元和纪实》· 忧患复兴'
  },
  [TangPhase.LATE]: {
    id: TangPhase.LATE,
    name: '晚唐·大顺',
    yearRange: '公元 890 - 891 年',
    colorBg: '#e8e2d0', // Dusty/Dull Paper
    colorAccent: '#424242', // Gray
    historicalContext: '夕阳余晖，李商隐忧郁叹残阳。黄巢之乱后，长安凋零，朱温权倾朝野。',
    prices: '米斗千钱。战火焚城，金银尽散，民不聊生。',
    diBao: '黄巢之乱余波未平，圣上播迁。长安宫阙半毁。',
    newsTitle: '《残唐遗志》· 夕阳余晖'
  }
};

export const IDENTITIES: Record<IdentityType, IdentityConfig> = {
  [IdentityType.MERCHANT]: {
    id: IdentityType.MERCHANT,
    title: '西市胡商',
    persona: '萨勒曼',
    greeting: '愿祆神保佑你的钱包，贵客！我这儿有最正宗的波斯香料和上等丝绸，来看看？',
    accentColor: '#b8860b',
    marketGuide: '西市乃我等外商云集之地，多胡姬、香料与奇珍。东市则是贵人们挥霍的雅地，咱们这儿更重利钱。',
    systemPrompt: '你是一位精明的波斯胡商。言谈充满生意经，性格圆滑，常提及丝绸、香料、骆驼和西域轶事。严禁现代词汇。回复控制在300字内。'
  },
  [IdentityType.MUSICIAN]: {
    id: IdentityType.MUSICIAN,
    title: '平康坊乐人',
    persona: '弄玉',
    greeting: '这曲《凉州词》还未终了，客官怎么就急着走？这长安的月色，最是撩人忧思。',
    accentColor: '#ec407a',
    marketGuide: '平康坊乃教坊核心，这里的歌舞虽妙，却也困住了多少痴心人。',
    systemPrompt: '你是一位优雅忧郁的唐代乐人。精通诗词曲艺，谈吐风雅，常提及教坊八卦和诗画。严禁现代词汇。回复控制在300字内。'
  },
  [IdentityType.GUARD]: {
    id: IdentityType.GUARD,
    title: '金吾卫小吏',
    persona: '陈守城',
    greeting: '暮鼓快响了！还不快回坊去？晚了小心吃鞭子！这几日长安盗匪猖獗，少在街上溜达。',
    accentColor: '#1e88e5',
    marketGuide: '东市重治安，西市多杂鱼。凡不遵宵禁者，格杀勿论！',
    systemPrompt: '你是一位古板严厉的金吾卫。言辞简洁有力，强调法纪与宵禁，关注安全。严禁现代词汇。回复控制在300字内。'
  },
  [IdentityType.SCHOLAR]: {
    id: IdentityType.SCHOLAR,
    title: '落第书生',
    persona: '陆不凡',
    greeting: '举杯邀月，月影成三。今年的榜单又没我的名字... 唉，掌柜的，再来一壶最贱的稠酒！',
    accentColor: '#43a047',
    marketGuide: '书生自当去曲江池畔，那儿有咱们的梦想。至于这市集，不过是些俗人之地。',
    systemPrompt: '你是一位怀才不遇的落第书生。言谈带点愤世嫉俗或故作高深，常引经据典，谈论科举和酒价。严禁现代词汇。回复控制在300字内。'
  }
};
