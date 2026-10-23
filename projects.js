window.PROJECTS = [
  {
    "id": "audio-visual-tfnet",
    "title": "Audio-Visual TFNet",
    "category": "research",
    "label": "多模态感知 / FEATURED",
    "art": "fusion",
    "kicker": "AUDIO × VISION",
    "caption": "CROSS-MODAL REPRESENTATION",
    "description": "融合四通道音频与图像信息，联合建模目标分类和三维位置。探索从时频表示到双曲空间的跨模态表达。",
    "tags": [
      "PyTorch",
      "Conformer",
      "Cross-attention"
    ],
    "flow": [
      "音频 + 图像",
      "时频 / 视觉编码",
      "交叉注意力",
      "分类 + 3D 定位"
    ],
    "highlights": [
      "四阶球谐投影与 STFT 特征融合，构成 9 通道音频输入。",
      "时间 Conformer 使用 ReLU 路由与低秩专家；视觉编码器与音频上下文交互。",
      "融合特征结合双曲空间相似度，分别输出类别与三维坐标。"
    ],
    "boundary": "简历将相关工作列为第一作者在投稿件（AAAI 2027）。公开仓库 README 记录合成数据验证，未记录论文完整真实数据训练；公开版本与论文实验可能不同。",
    "evidence": "README.md"
  },
  {
    "id": "SHT-CTNet",
    "title": "SHT-CTNet",
    "category": "research",
    "label": "射频感知 / RESEARCH",
    "art": "acoustic",
    "kicker": "SPHERICAL HARMONICS",
    "caption": "AUDIO → SPATIAL REPRESENTATION",
    "description": "基于虚拟阵列与球谐变换的无人机射频指纹分类，结合多通道去噪与 CNN-Transformer。相关成果发表于 ICASSP 2026。",
    "tags": [
      "PyTorch",
      "SHT",
      "RF / I-Q",
      "CNN-Transformer"
    ],
    "flow": [
      "阵列音频",
      "球谐空间表示",
      "网络建模",
      "跟踪与分类"
    ],
    "highlights": [
      "简历说明该项目处理 Hovering UAV RF 数据集中的 I/Q 样本，构造虚拟多天线阵列。",
      "通过球谐空间映射及时域、频域噪声增强，学习无人机射频特征。",
      "简历报告 0.06M 参数下平均准确率为 97.64%，相关论文发表于 ICASSP 2026。"
    ],
    "boundary": "任务定义与论文状态以本人提供的简历为准。公开 README 仍使用 audio-based 标题，与简历存在命名差异；论文实验版本和公开仓库不应直接等同。",
    "evidence": "README.md"
  },
  {
    "id": "agent",
    "title": "Agent Workspace",
    "category": "agent",
    "label": "智能体应用 / ENGINEERING",
    "art": "agent",
    "kicker": "PLAN · RETRIEVE · GENERATE",
    "caption": "KNOWLEDGE INTO WORKFLOWS",
    "description": "从论文检索与摘要到企业知识问答，将 LLM、工具调用和前后端交互组织为可扩展的应用工作流。",
    "tags": [
      "FastAPI",
      "Vue 3",
      "RAG",
      "LangGraph"
    ],
    "flow": [
      "用户任务",
      "检索 / 编排",
      "LLM 处理",
      "摘要 / 问答"
    ],
    "highlights": [
      "Paper Digest Assistant 提供论文订阅、候选筛选、摘要与邮件投递预览流程。",
      "Vue 3 前端展示处理结果，FastAPI 提供业务接口。",
      "RAG 子项目预留记忆、工具与文档处理模块，并提供 Milvus、Redis、PostgreSQL 接入结构。"
    ],
    "boundary": "论文助手与 RAG 位于同一个仓库，按一个项目计数。RAG README 将其定位为后端脚手架，不能等同于已上线的企业产品。",
    "evidence": "paper_email/README.md",
    "extraEvidence": "rag/README.md"
  },
  {
    "id": "S2-MoENet",
    "title": "S2-MoENet",
    "category": "research",
    "label": "混合专家 / RESEARCH",
    "art": "experts",
    "kicker": "MIXTURE OF EXPERTS",
    "caption": "SPECIALIZED PATHS · SHARED TASK",
    "description": "面向音频无人机分类与三维位置估计的混合专家网络，提供独立训练、评估和显式数据路径配置。",
    "tags": [
      "PyTorch",
      "MoE",
      "Audio"
    ],
    "flow": [
      "音频特征",
      "球谐 / 融合模块",
      "专家建模",
      "分类 + 定位"
    ],
    "highlights": [
      "模型目录包含 Conformer、ReLU 专家与球谐融合模块。",
      "训练与评估入口分离，可显式指定音频、标签和划分路径。",
      "发布版本排除数据集、检查点和实验中间产物。"
    ],
    "boundary": "相关论文按简历为第一作者在投 Information Fusion。仓库 README 使用 SS-MoeNet 名称；公开代码与简历中报告指标对应的完整实验版本可能存在差异。",
    "evidence": "README.md"
  },
  {
    "id": "sht_mamba",
    "title": "SHT-Mamba",
    "category": "research",
    "label": "状态空间模型 / RESEARCH",
    "art": "sequence",
    "kicker": "SELECTIVE STATE SPACE",
    "caption": "SPATIAL SIGNALS · SEQUENCE MODELING",
    "description": "将球谐空间表示与 Mamba 序列建模结合，探索音频无人机跟踪与分类，并保留多种结构变体。",
    "tags": [
      "Mamba",
      "PyTorch",
      "CUDA",
      "SHT"
    ],
    "flow": [
      "音频输入",
      "球谐表示",
      "Mamba 建模",
      "分类 / 跟踪"
    ],
    "highlights": [
      "README 提供 PyTorch、CUDA、mamba-ssm 与 causal-conv1d 的环境配置说明。",
      "SHTM-parallel 目录提供 train.py 与 evaluate.py 入口。",
      "仓库保留并行结构及多种研究变体，适合比较不同建模路径。"
    ],
    "boundary": "依赖 CUDA 与自定义算子环境；本作品集未执行训练或核验结果图，不将仓库中的实验素材转换为未经核实的性能宣传。",
    "evidence": "README.md"
  },
  {
    "id": "eeg",
    "title": "EEG Signal Lab",
    "category": "signal",
    "label": "脑电分析 / SIGNAL PROCESSING",
    "art": "eeg",
    "kicker": "READING NEURAL SIGNALS",
    "caption": "PREPROCESS → FEATURES → DECODE",
    "description": "围绕 P300 拼写器与 ERP 分析，研究空间滤波、特征标准化和线性分类，连接脑电信号与字符预测。",
    "tags": [
      "NumPy",
      "SciPy",
      "PyTorch",
      "P300"
    ],
    "flow": [
      "EEG 信号",
      "CAR / CSD",
      "特征标准化",
      "线性分类"
    ],
    "highlights": [
      "CAR_CSD.py 实现平均参考、球面样条 CSD 与 z-score 相关处理。",
      "分类模块包含逐步线性模型；部分脚本提供 PyTorch 线性回归实现。",
      "包含 P300 拼写器预测及 ERP 可视化脚本。"
    ],
    "boundary": "仓库没有顶层 README，分析来自公开脚本及目录。网页不展示被试级日志、原始数据、预测文本或本地路径，不作医疗效果声明。",
    "evidence": "CAR_CSD.py"
  },
  {
    "id": "fire-monitoring-system",
    "title": "Fire Monitoring",
    "category": "embedded",
    "label": "视觉 × 嵌入式 / ENGINEERING",
    "art": "fire",
    "kicker": "PERCEPTION MEETS HARDWARE",
    "caption": "VISION · SENSORS · INTERFACE",
    "description": "以火灾监测为场景，整理 YOLOv5 桌面检测、STM32 传感器固件与 uni-app 移动面板三个模块。",
    "tags": [
      "YOLOv5",
      "STM32",
      "C",
      "uni-app"
    ],
    "flow": [
      "视觉 / 传感器",
      "检测 / 固件",
      "设备属性",
      "界面展示"
    ],
    "highlights": [
      "PyQt5 界面支持图片、视频与摄像头检测。",
      "STM32F103 固件包含 DHT11、OLED、蜂鸣器和舵机控制。",
      "手机端读取 OneNET 设备属性，使用本地令牌配置并处理轮询生命周期。"
    ],
    "boundary": "简历描述完整项目曾实现 STM32 / ESP8266 / OneNET 联动；当前公开仓库只保留三个独立模块，未包含完整串口和云端桥接代码。公开代码不能直接当作完整闭环交付。",
    "evidence": "README.md"
  }
];
